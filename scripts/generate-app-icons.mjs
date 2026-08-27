import {
  existsSync,
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
    "favicon-16x16.png",
  ),
  favicon32: resolve(
    brandDir,
    "favicon-32x32.png",
  ),
  favicon48: resolve(
    brandDir,
    "favicon-48x48.png",
  ),
  apple180: resolve(
    brandDir,
    "apple-touch-icon-v3.png",
  ),
  pwa192: resolve(
    brandDir,
    "icon-192x192-v3.png",
  ),
  pwa512: resolve(
    brandDir,
    "icon-512x512-v3.png",
  ),
  maskable512: resolve(
    brandDir,
    "icon-maskable-512x512-v3.png",
  ),
  ico: resolve(
    root,
    "public/favicon.ico",
  ),
};

const previousDesktopIcon = resolve(
  brandDir,
  "icon-512x512-v2.png",
);

/**
 * Browser favicon target:
 *
 * Transparent canvas + only the original Vatandoshlar
 * geometric mark.
 *
 * ~86% visible occupancy keeps the symbol large enough
 * for browser tabs while preserving ~7% safe padding
 * on each side.
 *
 * iPhone/PWA values remain independent.
 */
const TARGETS = {
  favicon: 0.86,
  iphone: 0.64,
  desktopFallback: 0.545,
  maskable: 0.58,
};

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

function crc32(buffer) {
  let crc = 0xffffffff;

  for (const byte of buffer) {
    crc ^= byte;

    for (
      let bit = 0;
      bit < 8;
      bit += 1
    ) {
      const mask = -(crc & 1);

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
  const typeBuffer = Buffer.from(
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

function decodePng(
  filePath,
) {
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
      idatChunks.push(data);
    } else if (
      type === "IEND"
    ) {
      break;
    }

    offset =
      dataEnd + 4;
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
      "Interlaced PNG is not supported by the icon generator.",
    );
  }

  const channels =
    colorType === 6
      ? 4
      : 3;

  const bytesPerPixel =
    channels;

  const rowLength =
    width * channels;

  const inflated =
    inflateSync(
      Buffer.concat(
        idatChunks,
      ),
    );

  const raw =
    Buffer.alloc(
      height * rowLength,
    );

  let inputOffset = 0;

  for (
    let y = 0;
    y < height;
    y += 1
  ) {
    const filter =
      inflated[inputOffset];

    inputOffset += 1;

    const rowOffset =
      y * rowLength;

    const previousRowOffset =
      (y - 1) * rowLength;

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
        x >= bytesPerPixel
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
        x >= bytesPerPixel
          ? raw[
              previousRowOffset +
                x -
                bytesPerPixel
            ]
          : 0;

      let decoded =
        value;

      if (
        filter === 1
      ) {
        decoded =
          (value + left) &
          0xff;
      } else if (
        filter === 2
      ) {
        decoded =
          (value + up) &
          0xff;
      } else if (
        filter === 3
      ) {
        decoded =
          (
            value +
            Math.floor(
              (left + up) / 2,
            )
          ) &
          0xff;
      } else if (
        filter === 4
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

        const paeth =
          distanceLeft <=
            distanceUp &&
          distanceLeft <=
            distanceUpperLeft
            ? left
            : distanceUp <=
                distanceUpperLeft
              ? up
              : upperLeft;

        decoded =
          (value + paeth) &
          0xff;
      } else if (
        filter !== 0
      ) {
        throw new Error(
          `Unsupported PNG filter type ${filter}.`,
        );
      }

      raw[
        rowOffset + x
      ] = decoded;
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
    width * height;
    pixel += 1
  ) {
    const sourceOffset =
      pixel * channels;

    const targetOffset =
      pixel * 4;

    rgba[targetOffset] =
      raw[sourceOffset];

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
        y * rowLength,
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
    dirname(filePath),
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
            (green - blue) /
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
          (blue - red) /
            delta +
          2
        );
    } else {
      hue =
        60 *
        (
          (red - green) /
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
        : delta / max,
    value: max,
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
  } = rgbToHsv(
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

  /**
   * The source PNG can contain pale/off-white
   * background pixels.
   *
   * Only the saturated Vatandoshlar teal mark
   * should survive extraction.
   */
  const saturationStrength =
    Math.max(
      0,
      Math.min(
        1,
        (
          saturation -
          0.055
        ) /
          0.16,
      ),
    );

  return (
    saturationStrength *
    (alpha / 255)
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
      width * height,
    );

  let minX = width;
  let minY = height;
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
        y * width + x;

      const offset =
        pixel * 4;

      const strength =
        logoStrength(
          rgba[offset],
          rgba[offset + 1],
          rgba[offset + 2],
          rgba[offset + 3],
        );

      strengths[pixel] =
        strength;

      if (
        strength >= 0.08
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

      crop[targetOffset] =
        rgba[sourceOffset];

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
          255 * strength,
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
    Math.max(
      0,
      Math.min(
        image.width - 1,
        Math.floor(x),
      ),
    );

  const y0 =
    Math.max(
      0,
      Math.min(
        image.height - 1,
        Math.floor(y),
      ),
    );

  const x1 =
    Math.min(
      image.width - 1,
      x0 + 1,
    );

  const y1 =
    Math.min(
      image.height - 1,
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
      (b - a) * tx;

    const bottom =
      c +
      (d - c) * tx;

    result[channel] =
      top +
      (bottom - top) *
        ty;
  }

  return result;
}

/**
 * Browser favicon renderer.
 *
 * IMPORTANT:
 * - Transparent canvas.
 * - No white square.
 * - No border.
 * - No shadow.
 * - No extra background panel.
 * - Only the original Vatandoshlar mark.
 */
function renderTransparentIcon(
  logo,
  size,
  occupancy,
) {
  const targetMaxDimension =
    size * occupancy;

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
        logo.width * scale,
      ),
    );

  const renderedHeight =
    Math.max(
      1,
      Math.round(
        logo.height * scale,
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

  /**
   * Uint8Array starts with all zeroes:
   *
   * RGBA(0, 0, 0, 0)
   *
   * = completely transparent canvas.
   */
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
      const sourceX =
        (
          (x + 0.5) /
          renderedWidth
        ) *
          logo.width -
        0.5;

      const sourceY =
        (
          (y + 0.5) /
          renderedHeight
        ) *
          logo.height -
        0.5;

      const [
        r,
        g,
        b,
        a,
      ] =
        sampleBilinear(
          logo,
          sourceX,
          sourceY,
        );

      if (
        a <= 0.5
      ) {
        continue;
      }

      const targetX =
        offsetX + x;

      const targetY =
        offsetY + y;

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
        Math.round(r);

      rgba[
        targetOffset + 1
      ] =
        Math.round(g);

      rgba[
        targetOffset + 2
      ] =
        Math.round(b);

      rgba[
        targetOffset + 3
      ] =
        Math.round(a);
    }
  }

  return {
    width: size,
    height: size,
    rgba,
  };
}

/**
 * App/PWA renderer.
 *
 * This intentionally keeps the existing
 * pure-white app-icon design.
 */
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
          image.rgba[offset],
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
        strength >= 0.08
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

function getDesktopOccupancy() {
  if (
    !existsSync(
      previousDesktopIcon,
    )
  ) {
    return TARGETS.desktopFallback;
  }

  try {
    const measurement =
      measureVisibleOccupancy(
        decodePng(
          previousDesktopIcon,
        ),
      );

    if (
      !measurement
    ) {
      return TARGETS.desktopFallback;
    }

    return Math.max(
      0.48,
      Math.min(
        0.72,
        measurement.occupancy,
      ),
    );
  } catch {
    return TARGETS.desktopFallback;
  }
}

function assertWhiteBackground(
  image,
  label,
) {
  const points = [
    [0, 0],
    [
      image.width - 1,
      0,
    ],
    [
      0,
      image.height - 1,
    ],
    [
      image.width - 1,
      image.height - 1,
    ],
    [
      Math.floor(
        image.width / 2,
      ),
      0,
    ],
    [
      Math.floor(
        image.width / 2,
      ),
      image.height - 1,
    ],
    [
      0,
      Math.floor(
        image.height / 2,
      ),
    ],
    [
      image.width - 1,
      Math.floor(
        image.height / 2,
      ),
    ],
  ];

  for (
    const [
      x,
      y,
    ] of points
  ) {
    const offset =
      (
        y *
          image.width +
        x
      ) *
      4;

    const pixel =
      Array.from(
        image.rgba.subarray(
          offset,
          offset + 4,
        ),
      );

    if (
      pixel[0] !== 255 ||
      pixel[1] !== 255 ||
      pixel[2] !== 255 ||
      pixel[3] !== 255
    ) {
      throw new Error(
        `${label} white background validation failed at (${x}, ${y}): ${pixel.join(",")}`,
      );
    }
  }
}

function assertTransparentBackground(
  image,
  label,
) {
  const points = [
    [0, 0],
    [
      image.width - 1,
      0,
    ],
    [
      0,
      image.height - 1,
    ],
    [
      image.width - 1,
      image.height - 1,
    ],
    [
      Math.floor(
        image.width / 2,
      ),
      0,
    ],
    [
      Math.floor(
        image.width / 2,
      ),
      image.height - 1,
    ],
    [
      0,
      Math.floor(
        image.height / 2,
      ),
    ],
    [
      image.width - 1,
      Math.floor(
        image.height / 2,
      ),
    ],
  ];

  for (
    const [
      x,
      y,
    ] of points
  ) {
    const offset =
      (
        y *
          image.width +
        x
      ) *
      4;

    const alpha =
      image.rgba[
        offset + 3
      ];

    if (
      alpha !== 0
    ) {
      throw new Error(
        `${label} transparent background validation failed at (${x}, ${y}). Alpha=${alpha}`,
      );
    }
  }
}

function validateIcon(
  image,
  expectedOccupancy,
  label,
  background,
) {
  if (
    background ===
    "transparent"
  ) {
    assertTransparentBackground(
      image,
      label,
    );
  } else {
    assertWhiteBackground(
      image,
      label,
    );
  }

  const measurement =
    measureVisibleOccupancy(
      image,
    );

  if (
    !measurement
  ) {
    throw new Error(
      `${label}: no visible Vatandoshlar logo detected.`,
    );
  }

  const delta =
    Math.abs(
      measurement.occupancy -
        expectedOccupancy,
    );

  const tolerance =
    Math.max(
      0.025,
      2 /
        Math.max(
          image.width,
          image.height,
        ),
    );

  if (
    delta > tolerance
  ) {
    throw new Error(
      `${label}: expected ~${(
        expectedOccupancy * 100
      ).toFixed(
        1,
      )}% visible occupancy, got ${(
        measurement.occupancy * 100
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
      image.width - 1
    ) /
    2;

  const expectedCenterY =
    (
      image.height - 1
    ) /
    2;

  if (
    Math.abs(
      centerX -
        expectedCenterX,
    ) > 1.5 ||
    Math.abs(
      centerY -
        expectedCenterY,
    ) > 1.5
  ) {
    throw new Error(
      `${label}: logo is not centered within tolerance.`,
    );
  }

  console.log(
    `${label}: ${(
      measurement.occupancy * 100
    ).toFixed(
      1,
    )}% visible occupancy, ${background} background, centered.`,
  );
}

function writeIco(
  pngPaths,
  destination,
) {
  const images =
    pngPaths.map(
      ({
        path,
        size,
      }) => ({
        data:
          readFileSync(path),
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
        image.size >= 256
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
    dirname(destination),
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

const desktopOccupancy =
  getDesktopOccupancy();

console.log(
  `Detected source logo bounds: ${logo.width}x${logo.height} inside ${source.width}x${source.height}.`,
);

console.log(
  `Desktop/PWA occupancy preserved from current v2 asset: ${(
    desktopOccupancy * 100
  ).toFixed(
    1,
  )}%.`,
);

/**
 * IMPORTANT:
 *
 * Browser favicon files are generated with
 * TRANSPARENT background.
 *
 * iPhone/PWA files retain PURE WHITE background.
 */
const generated = [
  {
    path:
      outputs.favicon16,

    image:
      renderTransparentIcon(
        logo,
        16,
        TARGETS.favicon,
      ),

    occupancy:
      TARGETS.favicon,

    label:
      "favicon-16x16",

    background:
      "transparent",
  },

  {
    path:
      outputs.favicon32,

    image:
      renderTransparentIcon(
        logo,
        32,
        TARGETS.favicon,
      ),

    occupancy:
      TARGETS.favicon,

    label:
      "favicon-32x32",

    background:
      "transparent",
  },

  {
    path:
      outputs.favicon48,

    image:
      renderTransparentIcon(
        logo,
        48,
        TARGETS.favicon,
      ),

    occupancy:
      TARGETS.favicon,

    label:
      "favicon-48x48",

    background:
      "transparent",
  },
];

for (
  const item of generated
) {
  encodePng(
    item.image,
    item.path,
  );

  validateIcon(
    item.image,
    item.occupancy,
    item.label,
    item.background,
  );
}

/**
 * favicon.ico is assembled ONLY from the
 * transparent 16/32/48 PNG variants.
 */
writeIco(
  [
    {
      path:
        outputs.favicon16,
      size: 16,
    },

    {
      path:
        outputs.favicon32,
      size: 32,
    },

    {
      path:
        outputs.favicon48,
      size: 48,
    },
  ],
  outputs.ico,
);

console.log(
  "\nBrowser favicon assets generated successfully:",
);

console.log(
  "- public/images/brand/favicon-16x16.png",
);

console.log(
  "- public/images/brand/favicon-32x32.png",
);

console.log(
  "- public/images/brand/favicon-48x48.png",
);

console.log(
  "- public/favicon.ico",
);

console.log(
  "\nBrowser favicon: transparent background, ~86% visible logo occupancy.",
);

console.log(
  "Apple/PWA icons were NOT modified.",
);