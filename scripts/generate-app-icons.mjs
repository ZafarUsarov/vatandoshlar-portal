import {
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { dirname, resolve } from "node:path";
import {
  deflateSync,
  inflateSync,
} from "node:zlib";

const root = process.cwd();

const sourcePath = resolve(
  root,
  "public/images/brand/favicon-vatandoshlar.png",
);

const brandDir = resolve(
  root,
  "public/images/brand",
);

const outputs = {
  favicon16: resolve(
    brandDir,
    "favicon-16x16-v2.png",
  ),
  favicon32: resolve(
    brandDir,
    "favicon-32x32-v2.png",
  ),
  favicon48: resolve(
    brandDir,
    "favicon-48x48-v2.png",
  ),
  ico: resolve(
    root,
    "public/favicon-v2.ico",
  ),
  fallbackIco: resolve(
    root,
    "public/favicon.ico",
  ),
};

/**
 * Browser favicon configuration only.
 *
 * No Apple Touch / PWA assets are generated here.
 *
 * Important:
 * - occupancy stays unchanged
 * - no dilation
 * - no stroke expansion
 * - no gap bridging
 *
 * Fine-line readability is improved through proper
 * subpixel area sampling during rasterization.
 */
const FAVICON_CONFIGS = [
  {
    size: 16,
    path: outputs.favicon16,
    occupancy: 0.875,
    samplesPerAxis: 8,
    alphaGamma: 0.84,
    alphaBlend: 0.42,
    centerHoleMinArea: 7,
  },
  {
    size: 32,
    path: outputs.favicon32,
    occupancy: 0.91,
    samplesPerAxis: 5,
    alphaGamma: 0.93,
    alphaBlend: 0.22,
    centerHoleMinArea: 24,
  },
  {
    size: 48,
    path: outputs.favicon48,
    occupancy: 0.90,
    samplesPerAxis: 3,
    alphaGamma: 0.98,
    alphaBlend: 0.08,
    centerHoleMinArea: 50,
  },
];

const PNG_SIGNATURE = Buffer.from([
  0x89,
  0x50,
  0x4e,
  0x47,
  0x0d,
  0x0a,
  0x1a,
  0x0a,
]);

function clamp(
  value,
  min,
  max,
) {
  return Math.max(
    min,
    Math.min(
      max,
      value,
    ),
  );
}

function crc32(buffer) {
  let crc = 0xffffffff;

  for (const byte of buffer) {
    crc ^= byte;

    for (
      let bit = 0;
      bit < 8;
      bit += 1
    ) {
      const mask =
        -(crc & 1);

      crc =
        (crc >>> 1) ^
        (0xedb88320 & mask);
    }
  }

  return (
    (crc ^ 0xffffffff) >>>
    0
  );
}

function createChunk(
  type,
  data,
) {
  const typeBuffer =
    Buffer.from(
      type,
      "ascii",
    );

  const length =
    Buffer.alloc(4);

  const checksum =
    Buffer.alloc(4);

  const payload =
    Buffer.concat([
      typeBuffer,
      data,
    ]);

  length.writeUInt32BE(
    data.length,
    0,
  );

  checksum.writeUInt32BE(
    crc32(payload),
    0,
  );

  return Buffer.concat([
    length,
    typeBuffer,
    data,
    checksum,
  ]);
}

function paethPredictor(
  left,
  up,
  upperLeft,
) {
  const prediction =
    left +
    up -
    upperLeft;

  const distanceLeft =
    Math.abs(
      prediction - left,
    );

  const distanceUp =
    Math.abs(
      prediction - up,
    );

  const distanceUpperLeft =
    Math.abs(
      prediction -
        upperLeft,
    );

  if (
    distanceLeft <=
      distanceUp &&
    distanceLeft <=
      distanceUpperLeft
  ) {
    return left;
  }

  if (
    distanceUp <=
    distanceUpperLeft
  ) {
    return up;
  }

  return upperLeft;
}

function decodePng(filePath) {
  const file =
    readFileSync(filePath);

  if (
    !file
      .subarray(0, 8)
      .equals(PNG_SIGNATURE)
  ) {
    throw new Error(
      `Not a PNG file: ${filePath}`,
    );
  }

  let offset = 8;
  let width = 0;
  let height = 0;
  let bitDepth = 0;
  let colorType = 0;
  let interlace = 0;

  const idatChunks = [];

  while (
    offset < file.length
  ) {
    const length =
      file.readUInt32BE(offset);

    const type =
      file.toString(
        "ascii",
        offset + 4,
        offset + 8,
      );

    const dataStart =
      offset + 8;

    const dataEnd =
      dataStart + length;

    const data =
      file.subarray(
        dataStart,
        dataEnd,
      );

    if (
      type === "IHDR"
    ) {
      width =
        data.readUInt32BE(0);

      height =
        data.readUInt32BE(4);

      bitDepth =
        data.readUInt8(8);

      colorType =
        data.readUInt8(9);

      interlace =
        data.readUInt8(12);
    } else if (
      type === "IDAT"
    ) {
      idatChunks.push(
        data,
      );
    } else if (
      type === "IEND"
    ) {
      break;
    }

    offset =
      dataEnd + 4;
  }

  if (
    width <= 0 ||
    height <= 0
  ) {
    throw new Error(
      `Invalid PNG dimensions: ${filePath}`,
    );
  }

  if (
    bitDepth !== 8
  ) {
    throw new Error(
      `Unsupported PNG bit depth ${bitDepth}. Expected 8-bit PNG.`,
    );
  }

  if (
    ![2, 6].includes(
      colorType,
    )
  ) {
    throw new Error(
      `Unsupported PNG color type ${colorType}. Expected RGB or RGBA PNG.`,
    );
  }

  if (
    interlace !== 0
  ) {
    throw new Error(
      "Interlaced PNG is not supported by the favicon generator.",
    );
  }

  const channels =
    colorType === 6
      ? 4
      : 3;

  const bytesPerPixel =
    channels;

  const rowLength =
    width *
    channels;

  const inflated =
    inflateSync(
      Buffer.concat(
        idatChunks,
      ),
    );

  const expectedLength =
    height *
    (rowLength + 1);

  if (
    inflated.length <
    expectedLength
  ) {
    throw new Error(
      `PNG data is incomplete: ${filePath}`,
    );
  }

  const raw =
    Buffer.alloc(
      height *
      rowLength,
    );

  let inputOffset = 0;

  for (
    let y = 0;
    y < height;
    y += 1
  ) {
    const filter =
      inflated[
        inputOffset
      ];

    inputOffset += 1;

    const rowOffset =
      y *
      rowLength;

    const previousRowOffset =
      (y - 1) *
      rowLength;

    for (
      let x = 0;
      x < rowLength;
      x += 1
    ) {
      const value =
        inflated[
          inputOffset + x
        ];

      const left =
        x >=
        bytesPerPixel
          ? raw[
              rowOffset +
                x -
                bytesPerPixel
            ]
          : 0;

      const up =
        y > 0
          ? raw[
              previousRowOffset +
                x
            ]
          : 0;

      const upperLeft =
        y > 0 &&
        x >=
          bytesPerPixel
          ? raw[
              previousRowOffset +
                x -
                bytesPerPixel
            ]
          : 0;

      let decoded;

      switch (filter) {
        case 0:
          decoded =
            value;
          break;

        case 1:
          decoded =
            (
              value +
              left
            ) &
            0xff;
          break;

        case 2:
          decoded =
            (
              value +
              up
            ) &
            0xff;
          break;

        case 3:
          decoded =
            (
              value +
              Math.floor(
                (
                  left +
                  up
                ) /
                  2,
              )
            ) &
            0xff;
          break;

        case 4:
          decoded =
            (
              value +
              paethPredictor(
                left,
                up,
                upperLeft,
              )
            ) &
            0xff;
          break;

        default:
          throw new Error(
            `Unsupported PNG filter type ${filter}.`,
          );
      }

      raw[
        rowOffset + x
      ] =
        decoded;
    }

    inputOffset +=
      rowLength;
  }

  const rgba =
    new Uint8Array(
      width *
        height *
        4,
    );

  for (
    let pixel = 0;
    pixel <
      width *
        height;
    pixel += 1
  ) {
    const sourceOffset =
      pixel *
      channels;

    const targetOffset =
      pixel * 4;

    rgba[
      targetOffset
    ] =
      raw[
        sourceOffset
      ];

    rgba[
      targetOffset + 1
    ] =
      raw[
        sourceOffset + 1
      ];

    rgba[
      targetOffset + 2
    ] =
      raw[
        sourceOffset + 2
      ];

    rgba[
      targetOffset + 3
    ] =
      colorType === 6
        ? raw[
            sourceOffset + 3
          ]
        : 255;
  }

  return {
    width,
    height,
    rgba,
  };
}

function encodePng(
  {
    width,
    height,
    rgba,
  },
  filePath,
) {
  const rowLength =
    width * 4;

  const scanlines =
    Buffer.alloc(
      height *
        (rowLength + 1),
    );

  for (
    let y = 0;
    y < height;
    y += 1
  ) {
    const rowStart =
      y *
      (rowLength + 1);

    scanlines[
      rowStart
    ] = 0;

    Buffer.from(
      rgba.buffer,
      rgba.byteOffset +
        y *
          rowLength,
      rowLength,
    ).copy(
      scanlines,
      rowStart + 1,
    );
  }

  const ihdr =
    Buffer.alloc(13);

  ihdr.writeUInt32BE(
    width,
    0,
  );

  ihdr.writeUInt32BE(
    height,
    4,
  );

  ihdr.writeUInt8(
    8,
    8,
  );

  ihdr.writeUInt8(
    6,
    9,
  );

  ihdr.writeUInt8(
    0,
    10,
  );

  ihdr.writeUInt8(
    0,
    11,
  );

  ihdr.writeUInt8(
    0,
    12,
  );

  const png =
    Buffer.concat([
      PNG_SIGNATURE,

      createChunk(
        "IHDR",
        ihdr,
      ),

      createChunk(
        "IDAT",
        deflateSync(
          scanlines,
          {
            level: 9,
          },
        ),
      ),

      createChunk(
        "IEND",
        Buffer.alloc(0),
      ),
    ]);

  mkdirSync(
    dirname(
      filePath,
    ),
    {
      recursive: true,
    },
  );

  writeFileSync(
    filePath,
    png,
  );
}

function rgbToHsv(
  r,
  g,
  b,
) {
  const red =
    r / 255;

  const green =
    g / 255;

  const blue =
    b / 255;

  const max =
    Math.max(
      red,
      green,
      blue,
    );

  const min =
    Math.min(
      red,
      green,
      blue,
    );

  const delta =
    max - min;

  let hue = 0;

  if (
    delta !== 0
  ) {
    if (
      max === red
    ) {
      hue =
        60 *
        (
          (
            (
              green -
              blue
            ) /
            delta
          ) %
          6
        );
    } else if (
      max === green
    ) {
      hue =
        60 *
        (
          (
            blue -
            red
          ) /
            delta +
          2
        );
    } else {
      hue =
        60 *
        (
          (
            red -
            green
          ) /
            delta +
          4
        );
    }
  }

  if (
    hue < 0
  ) {
    hue += 360;
  }

  return {
    hue,

    saturation:
      max === 0
        ? 0
        : delta /
          max,

    value:
      max,
  };
}

function logoStrength(
  r,
  g,
  b,
  alpha,
) {
  if (
    alpha <= 4
  ) {
    return 0;
  }

  const {
    hue,
    saturation,
    value,
  } =
    rgbToHsv(
      r,
      g,
      b,
    );

  const isTealHue =
    hue >= 135 &&
    hue <= 205;

  if (
    !isTealHue ||
    value < 0.2
  ) {
    return 0;
  }

  const saturationStrength =
    clamp(
      (
        saturation -
        0.055
      ) /
        0.16,
      0,
      1,
    );

  return (
    saturationStrength *
    (
      alpha /
      255
    )
  );
}

function extractLogo(
  image,
) {
  const {
    width,
    height,
    rgba,
  } = image;

  const strengths =
    new Float32Array(
      width *
        height,
    );

  let minX =
    width;

  let minY =
    height;

  let maxX = -1;
  let maxY = -1;

  for (
    let y = 0;
    y < height;
    y += 1
  ) {
    for (
      let x = 0;
      x < width;
      x += 1
    ) {
      const pixel =
        y *
          width +
        x;

      const offset =
        pixel * 4;

      const strength =
        logoStrength(
          rgba[
            offset
          ],
          rgba[
            offset + 1
          ],
          rgba[
            offset + 2
          ],
          rgba[
            offset + 3
          ],
        );

      strengths[
        pixel
      ] =
        strength;

      if (
        strength >=
        0.08
      ) {
        minX =
          Math.min(
            minX,
            x,
          );

        minY =
          Math.min(
            minY,
            y,
          );

        maxX =
          Math.max(
            maxX,
            x,
          );

        maxY =
          Math.max(
            maxY,
            y,
          );
      }
    }
  }

  if (
    maxX < minX ||
    maxY < minY
  ) {
    throw new Error(
      "Could not detect the Vatandoshlar teal geometric mark in the source PNG.",
    );
  }

  const cropWidth =
    maxX -
    minX +
    1;

  const cropHeight =
    maxY -
    minY +
    1;

  const crop =
    new Uint8Array(
      cropWidth *
        cropHeight *
        4,
    );

  for (
    let y = 0;
    y < cropHeight;
    y += 1
  ) {
    for (
      let x = 0;
      x < cropWidth;
      x += 1
    ) {
      const sourceX =
        minX + x;

      const sourceY =
        minY + y;

      const sourcePixel =
        sourceY *
          width +
        sourceX;

      const sourceOffset =
        sourcePixel * 4;

      const targetOffset =
        (
          y *
            cropWidth +
          x
        ) *
        4;

      const strength =
        strengths[
          sourcePixel
        ];

      crop[
        targetOffset
      ] =
        rgba[
          sourceOffset
        ];

      crop[
        targetOffset + 1
      ] =
        rgba[
          sourceOffset + 1
        ];

      crop[
        targetOffset + 2
      ] =
        rgba[
          sourceOffset + 2
        ];

      crop[
        targetOffset + 3
      ] =
        Math.round(
          255 *
          strength,
        );
    }
  }

  return {
    width:
      cropWidth,

    height:
      cropHeight,

    rgba:
      crop,

    sourceBounds: {
      minX,
      minY,
      maxX,
      maxY,
    },
  };
}

function sampleBilinear(
  image,
  x,
  y,
) {
  const x0 =
    clamp(
      Math.floor(
        x,
      ),
      0,
      image.width -
        1,
    );

  const y0 =
    clamp(
      Math.floor(
        y,
      ),
      0,
      image.height -
        1,
    );

  const x1 =
    Math.min(
      image.width -
        1,
      x0 + 1,
    );

  const y1 =
    Math.min(
      image.height -
        1,
      y0 + 1,
    );

  const tx =
    x - x0;

  const ty =
    y - y0;

  const result = [
    0,
    0,
    0,
    0,
  ];

  for (
    let channel = 0;
    channel < 4;
    channel += 1
  ) {
    const a =
      image.rgba[
        (
          y0 *
            image.width +
          x0
        ) *
          4 +
        channel
      ];

    const b =
      image.rgba[
        (
          y0 *
            image.width +
          x1
        ) *
          4 +
        channel
      ];

    const c =
      image.rgba[
        (
          y1 *
            image.width +
          x0
        ) *
          4 +
        channel
      ];

    const d =
      image.rgba[
        (
          y1 *
            image.width +
          x1
        ) *
          4 +
        channel
      ];

    const top =
      a +
      (
        b - a
      ) *
        tx;

    const bottom =
      c +
      (
        d - c
      ) *
        tx;

    result[
      channel
    ] =
      top +
      (
        bottom -
        top
      ) *
        ty;
  }

  return result;
}

/**
 * Compute one destination favicon pixel through
 * supersampled area coverage.
 *
 * This differs fundamentally from the old renderer:
 *
 * OLD:
 * one sample at destination pixel centre
 *
 * NEW:
 * NxN subpixel samples covering the whole destination
 * pixel footprint
 *
 * Thin diagonal source strokes therefore contribute to
 * a favicon pixel even when they do not pass exactly
 * through its mathematical centre.
 */
function sampleAreaCoverage(
  image,
  destinationX,
  destinationY,
  renderedWidth,
  renderedHeight,
  samplesPerAxis,
) {
  let alphaSum = 0;

  let premultipliedRed =
    0;

  let premultipliedGreen =
    0;

  let premultipliedBlue =
    0;

  const totalSamples =
    samplesPerAxis *
    samplesPerAxis;

  for (
    let sampleY = 0;
    sampleY <
      samplesPerAxis;
    sampleY += 1
  ) {
    for (
      let sampleX = 0;
      sampleX <
        samplesPerAxis;
      sampleX += 1
    ) {
      const fractionX =
        (
          sampleX +
          0.5
        ) /
        samplesPerAxis;

      const fractionY =
        (
          sampleY +
          0.5
        ) /
        samplesPerAxis;

      const sourceX =
        (
          (
            destinationX +
            fractionX
          ) /
          renderedWidth
        ) *
          image.width -
        0.5;

      const sourceY =
        (
          (
            destinationY +
            fractionY
          ) /
          renderedHeight
        ) *
          image.height -
        0.5;

      const [
        r,
        g,
        b,
        a,
      ] =
        sampleBilinear(
          image,
          sourceX,
          sourceY,
        );

      const normalizedAlpha =
        a / 255;

      alphaSum +=
        normalizedAlpha;

      premultipliedRed +=
        r *
        normalizedAlpha;

      premultipliedGreen +=
        g *
        normalizedAlpha;

      premultipliedBlue +=
        b *
        normalizedAlpha;
    }
  }

  const averageAlpha =
    alphaSum /
    totalSamples;

  if (
    averageAlpha <=
    0.0001
  ) {
    return [
      0,
      0,
      0,
      0,
    ];
  }

  const r =
    premultipliedRed /
    alphaSum;

  const g =
    premultipliedGreen /
    alphaSum;

  const b =
    premultipliedBlue /
    alphaSum;

  return [
    clamp(
      Math.round(
        r,
      ),
      0,
      255,
    ),

    clamp(
      Math.round(
        g,
      ),
      0,
      255,
    ),

    clamp(
      Math.round(
        b,
      ),
      0,
      255,
    ),

    clamp(
      Math.round(
        averageAlpha *
        255,
      ),
      0,
      255,
    ),
  ];
}

function renderSupersampledIcon(
  logo,
  size,
  occupancy,
  samplesPerAxis,
) {
  const targetMaxDimension =
    size *
    occupancy;

  const logoMaxDimension =
    Math.max(
      logo.width,
      logo.height,
    );

  const scale =
    targetMaxDimension /
    logoMaxDimension;

  const renderedWidth =
    Math.max(
      1,
      Math.round(
        logo.width *
        scale,
      ),
    );

  const renderedHeight =
    Math.max(
      1,
      Math.round(
        logo.height *
        scale,
      ),
    );

  const offsetX =
    Math.round(
      (
        size -
        renderedWidth
      ) /
        2,
    );

  const offsetY =
    Math.round(
      (
        size -
        renderedHeight
      ) /
        2,
    );

  const rgba =
    new Uint8Array(
      size *
        size *
        4,
    );

  for (
    let y = 0;
    y < renderedHeight;
    y += 1
  ) {
    for (
      let x = 0;
      x < renderedWidth;
      x += 1
    ) {
      const [
        r,
        g,
        b,
        a,
      ] =
        sampleAreaCoverage(
          logo,
          x,
          y,
          renderedWidth,
          renderedHeight,
          samplesPerAxis,
        );

      if (
        a <= 0
      ) {
        continue;
      }

      const targetX =
        offsetX + x;

      const targetY =
        offsetY + y;

      if (
        targetX < 0 ||
        targetX >=
          size ||
        targetY < 0 ||
        targetY >=
          size
      ) {
        continue;
      }

      const targetOffset =
        (
          targetY *
            size +
          targetX
        ) *
        4;

      rgba[
        targetOffset
      ] =
        r;

      rgba[
        targetOffset + 1
      ] =
        g;

      rgba[
        targetOffset + 2
      ] =
        b;

      rgba[
        targetOffset + 3
      ] =
        a;
    }
  }

  return {
    width:
      size,

    height:
      size,

    rgba,
  };
}

/**
 * Very small alpha adjustment after accurate coverage
 * calculation.
 *
 * Critical:
 * alpha === 0 remains alpha === 0.
 *
 * Therefore this step can never grow the geometry into
 * an entirely empty destination pixel.
 */
function reinforceExistingCoverage(
  image,
  gamma,
  blend,
) {
  const output =
    new Uint8Array(
      image.rgba,
    );

  for (
    let pixel = 0;
    pixel <
      image.width *
        image.height;
    pixel += 1
  ) {
    const offset =
      pixel * 4;

    const alpha =
      image.rgba[
        offset + 3
      ];

    if (
      alpha === 0 ||
      alpha === 255
    ) {
      continue;
    }

    const normalized =
      alpha /
      255;

    const target =
      Math.pow(
        normalized,
        gamma,
      ) *
      255;

    const corrected =
      alpha +
      (
        target -
        alpha
      ) *
        blend;

    output[
      offset + 3
    ] =
      clamp(
        Math.round(
          corrected,
        ),
        alpha,
        255,
      );
  }

  return {
    width:
      image.width,

    height:
      image.height,

    rgba:
      output,
  };
}

function getAlpha(
  image,
  x,
  y,
) {
  if (
    x < 0 ||
    x >= image.width ||
    y < 0 ||
    y >= image.height
  ) {
    return 0;
  }

  return image.rgba[
    (
      y *
        image.width +
      x
    ) *
      4 +
    3
  ];
}

function assertTransparentOuterRing(
  image,
  label,
) {
  for (
    let x = 0;
    x < image.width;
    x += 1
  ) {
    const top =
      getAlpha(
        image,
        x,
        0,
      );

    const bottom =
      getAlpha(
        image,
        x,
        image.height -
          1,
      );

    if (
      top !== 0 ||
      bottom !== 0
    ) {
      throw new Error(
        `${label}: top/bottom safe-area ring is not transparent.`,
      );
    }
  }

  for (
    let y = 0;
    y < image.height;
    y += 1
  ) {
    const left =
      getAlpha(
        image,
        0,
        y,
      );

    const right =
      getAlpha(
        image,
        image.width -
          1,
        y,
      );

    if (
      left !== 0 ||
      right !== 0
    ) {
      throw new Error(
        `${label}: left/right safe-area ring is not transparent.`,
      );
    }
  }
}

function measureVisibleOccupancy(
  image,
) {
  let minX =
    image.width;

  let minY =
    image.height;

  let maxX = -1;
  let maxY = -1;

  for (
    let y = 0;
    y < image.height;
    y += 1
  ) {
    for (
      let x = 0;
      x < image.width;
      x += 1
    ) {
      const offset =
        (
          y *
            image.width +
          x
        ) *
        4;

      const strength =
        logoStrength(
          image.rgba[
            offset
          ],
          image.rgba[
            offset + 1
          ],
          image.rgba[
            offset + 2
          ],
          image.rgba[
            offset + 3
          ],
        );

      if (
        strength >=
        0.08
      ) {
        minX =
          Math.min(
            minX,
            x,
          );

        minY =
          Math.min(
            minY,
            y,
          );

        maxX =
          Math.max(
            maxX,
            x,
          );

        maxY =
          Math.max(
            maxY,
            y,
          );
      }
    }
  }

  if (
    maxX < minX ||
    maxY < minY
  ) {
    return null;
  }

  const visibleWidth =
    maxX -
    minX +
    1;

  const visibleHeight =
    maxY -
    minY +
    1;

  return {
    occupancy:
      Math.max(
        visibleWidth,
        visibleHeight,
      ) /
      Math.max(
        image.width,
        image.height,
      ),

    bounds: {
      minX,
      minY,
      maxX,
      maxY,
    },

    visibleWidth,
    visibleHeight,
  };
}

function countVisiblePixels(
  image,
  threshold = 8,
) {
  let count = 0;

  for (
    let pixel = 0;
    pixel <
      image.width *
        image.height;
    pixel += 1
  ) {
    if (
      image.rgba[
        pixel *
          4 +
        3
      ] >
      threshold
    ) {
      count += 1;
    }
  }

  return count;
}

/**
 * Find the most transparent seed close to the
 * mathematical centre of the favicon.
 *
 * This makes the central-hole validation robust even
 * when an even-sized icon has its exact centre between
 * four pixels.
 */
function findCenterHoleSeed(
  image,
) {
  const centerX =
    (
      image.width -
      1
    ) /
    2;

  const centerY =
    (
      image.height -
      1
    ) /
    2;

  const candidates = [];

  const minX =
    Math.max(
      0,
      Math.floor(
        centerX,
      ) -
        2,
    );

  const maxX =
    Math.min(
      image.width -
        1,
      Math.ceil(
        centerX,
      ) +
        2,
    );

  const minY =
    Math.max(
      0,
      Math.floor(
        centerY,
      ) -
        2,
    );

  const maxY =
    Math.min(
      image.height -
        1,
      Math.ceil(
        centerY,
      ) +
        2,
    );

  for (
    let y = minY;
    y <= maxY;
    y += 1
  ) {
    for (
      let x = minX;
      x <= maxX;
      x += 1
    ) {
      const alpha =
        getAlpha(
          image,
          x,
          y,
        );

      const distance =
        Math.hypot(
          x -
            centerX,
          y -
            centerY,
        );

      candidates.push({
        x,
        y,
        alpha,
        distance,
      });
    }
  }

  candidates.sort(
    (
      first,
      second,
    ) => {
      if (
        first.alpha !==
        second.alpha
      ) {
        return (
          first.alpha -
          second.alpha
        );
      }

      return (
        first.distance -
        second.distance
      );
    },
  );

  return candidates[0];
}

function measureCenterHole(
  image,
  threshold = 36,
) {
  const seed =
    findCenterHoleSeed(
      image,
    );

  if (
    !seed ||
    seed.alpha >
      threshold
  ) {
    return {
      area: 0,
      touchesOuterEdge: false,
      seed,
    };
  }

  const visited =
    new Uint8Array(
      image.width *
        image.height,
    );

  const queue = [
    [
      seed.x,
      seed.y,
    ],
  ];

  visited[
    seed.y *
      image.width +
    seed.x
  ] = 1;

  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  let area = 0;

  let touchesOuterEdge =
    false;

  for (
    let index = 0;
    index <
      queue.length;
    index += 1
  ) {
    const [
      currentX,
      currentY,
    ] =
      queue[
        index
      ];

    area += 1;

    if (
      currentX === 0 ||
      currentX ===
        image.width -
          1 ||
      currentY === 0 ||
      currentY ===
        image.height -
          1
    ) {
      touchesOuterEdge =
        true;
    }

    for (
      const [
        dx,
        dy,
      ] of directions
    ) {
      const nextX =
        currentX +
        dx;

      const nextY =
        currentY +
        dy;

      if (
        nextX < 0 ||
        nextX >=
          image.width ||
        nextY < 0 ||
        nextY >=
          image.height
      ) {
        continue;
      }

      const nextIndex =
        nextY *
          image.width +
        nextX;

      if (
        visited[
          nextIndex
        ] === 1
      ) {
        continue;
      }

      const alpha =
        getAlpha(
          image,
          nextX,
          nextY,
        );

      if (
        alpha >
        threshold
      ) {
        continue;
      }

      visited[
        nextIndex
      ] = 1;

      queue.push([
        nextX,
        nextY,
      ]);
    }
  }

  return {
    area,
    touchesOuterEdge,
    seed,
  };
}

function validateIcon(
  image,
  config,
) {
  const label =
    `favicon-${config.size}x${config.size}`;

  assertTransparentOuterRing(
    image,
    label,
  );

  const measurement =
    measureVisibleOccupancy(
      image,
    );

  if (
    !measurement
  ) {
    throw new Error(
      `${label}: no visible Vatandoshlar mark detected.`,
    );
  }

  const occupancyDelta =
    Math.abs(
      measurement.occupancy -
        config.occupancy,
    );

  const occupancyTolerance =
    Math.max(
      0.025,
      2 /
        config.size,
    );

  if (
    occupancyDelta >
    occupancyTolerance
  ) {
    throw new Error(
      `${label}: expected ~${(
        config.occupancy *
        100
      ).toFixed(
        1,
      )}% occupancy, got ${(
        measurement.occupancy *
        100
      ).toFixed(
        1,
      )}%.`,
    );
  }

  const centerX =
    (
      measurement.bounds.minX +
      measurement.bounds.maxX
    ) /
    2;

  const centerY =
    (
      measurement.bounds.minY +
      measurement.bounds.maxY
    ) /
    2;

  const expectedCenterX =
    (
      image.width -
      1
    ) /
    2;

  const expectedCenterY =
    (
      image.height -
      1
    ) /
    2;

  if (
    Math.abs(
      centerX -
        expectedCenterX,
    ) >
      1.5 ||
    Math.abs(
      centerY -
        expectedCenterY,
    ) >
      1.5
  ) {
    throw new Error(
      `${label}: mark is not centered within tolerance.`,
    );
  }

  const centerHole =
    measureCenterHole(
      image,
    );

  if (
    centerHole.area <
    config.centerHoleMinArea
  ) {
    throw new Error(
      `${label}: central negative space is too small (${centerHole.area}px; expected at least ${config.centerHoleMinArea}px).`,
    );
  }

  if (
    centerHole.touchesOuterEdge
  ) {
    throw new Error(
      `${label}: central negative space incorrectly connects to the outer transparent canvas.`,
    );
  }

  return {
    measurement,
    centerHole,
    visiblePixels:
      countVisiblePixels(
        image,
      ),
  };
}

function writeIco(
  entries,
  destination,
) {
  const images =
    entries.map(
      ({
        path,
        size,
      }) => ({
        data:
          readFileSync(
            path,
          ),

        size,
      }),
    );

  const headerSize = 6;

  const directoryEntrySize =
    16;

  const dataOffset =
    headerSize +
    directoryEntrySize *
      images.length;

  const totalSize =
    dataOffset +
    images.reduce(
      (
        total,
        image,
      ) =>
        total +
        image.data.length,
      0,
    );

  const ico =
    Buffer.alloc(
      totalSize,
    );

  ico.writeUInt16LE(
    0,
    0,
  );

  ico.writeUInt16LE(
    1,
    2,
  );

  ico.writeUInt16LE(
    images.length,
    4,
  );

  let imageOffset =
    dataOffset;

  images.forEach(
    (
      image,
      index,
    ) => {
      const entryOffset =
        headerSize +
        index *
          directoryEntrySize;

      const dimension =
        image.size >=
        256
          ? 0
          : image.size;

      ico.writeUInt8(
        dimension,
        entryOffset,
      );

      ico.writeUInt8(
        dimension,
        entryOffset + 1,
      );

      ico.writeUInt8(
        0,
        entryOffset + 2,
      );

      ico.writeUInt8(
        0,
        entryOffset + 3,
      );

      ico.writeUInt16LE(
        1,
        entryOffset + 4,
      );

      ico.writeUInt16LE(
        32,
        entryOffset + 6,
      );

      ico.writeUInt32LE(
        image.data.length,
        entryOffset + 8,
      );

      ico.writeUInt32LE(
        imageOffset,
        entryOffset + 12,
      );

      image.data.copy(
        ico,
        imageOffset,
      );

      imageOffset +=
        image.data.length;
    },
  );

  mkdirSync(
    dirname(
      destination,
    ),
    {
      recursive: true,
    },
  );

  writeFileSync(
    destination,
    ico,
  );
}

mkdirSync(
  brandDir,
  {
    recursive: true,
  },
);

const source =
  decodePng(
    sourcePath,
  );

const logo =
  extractLogo(
    source,
  );

console.log(
  `Detected source logo bounds: ${logo.width}x${logo.height} inside ${source.width}x${source.height}.`,
);

console.log(
  "\nGenerating browser-only favicons with supersampled area rasterization...",
);

const generated = [];

for (
  const config of
    FAVICON_CONFIGS
) {
  const baseImage =
    renderSupersampledIcon(
      logo,
      config.size,
      config.occupancy,
      config.samplesPerAxis,
    );

  const finalImage =
    reinforceExistingCoverage(
      baseImage,
      config.alphaGamma,
      config.alphaBlend,
    );

  const validation =
    validateIcon(
      finalImage,
      config,
    );

  encodePng(
    finalImage,
    config.path,
  );

  generated.push({
    path:
      config.path,

    size:
      config.size,
  });

  console.log(
    `favicon-${config.size}x${config.size}: ${(validation.measurement.occupancy * 100).toFixed(1)}% visible occupancy, transparent background, centered.`,
  );

  console.log(
    `  rasterization: ${config.samplesPerAxis}x${config.samplesPerAxis} subpixel samples per destination pixel.`,
  );

  console.log(
    `  visible pixels: ${validation.visiblePixels}.`,
  );

  console.log(
    `  central negative-space area: ${validation.centerHole.area}px.`,
  );

  console.log(
    `  alpha correction: gamma=${config.alphaGamma}, blend=${config.alphaBlend}.`,
  );
}

writeIco(
  generated,
  outputs.ico,
);

writeIco(
  generated,
  outputs.fallbackIco,
);

console.log(
  "\nBrowser favicon assets generated successfully:",
);

console.log(
  "- public/images/brand/favicon-16x16-v2.png",
);

console.log(
  "- public/images/brand/favicon-32x32-v2.png",
);

console.log(
  "- public/images/brand/favicon-48x48-v2.png",
);

console.log(
  "- public/favicon-v2.ico",
);

console.log(
  "- public/favicon.ico (fallback)",
);

console.log(
  "\nRaster strategy:",
);

console.log(
  "- 16x16: 8x8 supersampled area coverage + moderate existing-alpha reinforcement",
);

console.log(
  "- 32x32: 5x5 supersampled area coverage + light existing-alpha reinforcement",
);

console.log(
  "- 48x48: 3x3 supersampled area coverage + near-original existing-alpha reinforcement",
);

console.log(
  "- no dilation",
);

console.log(
  "- no gap bridging",
);

console.log(
  "- no new pixels are added after rasterization",
);

console.log(
  "- central negative space is explicitly validated",
);

console.log(
  "- outer 1px favicon ring must remain fully transparent",
);

console.log(
  "- Apple/PWA icons are NOT modified",
);