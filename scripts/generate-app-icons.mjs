import { execFileSync } from "node:child_process";
import {
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, resolve } from "node:path";

const root = process.cwd();

const source = resolve(
  root,
  "public/images/brand/favicon-vatandoshlar.png",
);

const brandDir = resolve(
  root,
  "public/images/brand",
);

const tempDir = resolve(
  root,
  ".tmp/app-icons",
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
    "apple-touch-icon-v2.png",
  ),
  pwa192: resolve(
    brandDir,
    "icon-192x192-v2.png",
  ),
  pwa512: resolve(
    brandDir,
    "icon-512x512-v2.png",
  ),
  maskable512: resolve(
    brandDir,
    "icon-maskable-512x512-v2.png",
  ),
  ico: resolve(
    root,
    "public/favicon.ico",
  ),
};

/**
 * Visual-balance targets:
 *
 * - favicon: intentionally denser for legibility at 16–48 px
 * - app: ~64% visual occupancy on a pure-white square canvas
 * - maskable: slightly safer (~61%) for platform masks
 *
 * The source logo itself is never distorted or redesigned.
 */
const canvasSizes = {
  favicon: 1450,
  app: 1690,
  maskable: 1760,
};

function runSips(args) {
  execFileSync("sips", args, {
    stdio: "inherit",
  });
}

function padSource(size, output) {
  runSips([
    "--padToHeightWidth",
    String(size),
    String(size),
    "--padColor",
    "FFFFFF",
    source,
    "--out",
    output,
  ]);
}

function resize(
  sourcePath,
  size,
  output,
) {
  runSips([
    "--resampleHeightWidth",
    String(size),
    String(size),
    sourcePath,
    "--out",
    output,
  ]);
}

function writeIco(
  pngPaths,
  destination,
) {
  const images = pngPaths.map(
    ({ path, size }) => ({
      data: readFileSync(path),
      size,
    }),
  );

  const headerSize = 6;
  const directoryEntrySize = 16;

  const dataOffset =
    headerSize +
    directoryEntrySize *
      images.length;

  const totalSize =
    dataOffset +
    images.reduce(
      (total, image) =>
        total + image.data.length,
      0,
    );

  const ico = Buffer.alloc(totalSize);

  ico.writeUInt16LE(0, 0);
  ico.writeUInt16LE(1, 2);
  ico.writeUInt16LE(
    images.length,
    4,
  );

  let imageOffset = dataOffset;

  images.forEach(
    (image, index) => {
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

mkdirSync(brandDir, {
  recursive: true,
});

mkdirSync(tempDir, {
  recursive: true,
});

const faviconCanvas = resolve(
  tempDir,
  "favicon-canvas.png",
);

const appCanvas = resolve(
  tempDir,
  "app-canvas.png",
);

const maskableCanvas = resolve(
  tempDir,
  "maskable-canvas.png",
);

// Pure-white canvases with optical breathing room.
// No border, gradient, shadow or extra rounded panel is added.
padSource(
  canvasSizes.favicon,
  faviconCanvas,
);

padSource(
  canvasSizes.app,
  appCanvas,
);

padSource(
  canvasSizes.maskable,
  maskableCanvas,
);

// Browser favicon family.
resize(
  faviconCanvas,
  16,
  outputs.favicon16,
);

resize(
  faviconCanvas,
  32,
  outputs.favicon32,
);

resize(
  faviconCanvas,
  48,
  outputs.favicon48,
);

// iOS Home Screen icon (~64% visual occupancy).
resize(
  appCanvas,
  180,
  outputs.apple180,
);

// Standard PWA/macOS installed-app icons.
// They intentionally share the same visual occupancy as iOS.
resize(
  appCanvas,
  192,
  outputs.pwa192,
);

resize(
  appCanvas,
  512,
  outputs.pwa512,
);

// Maskable icon gets a slightly larger safe area.
resize(
  maskableCanvas,
  512,
  outputs.maskable512,
);

// Multi-resolution favicon.ico.
writeIco(
  [
    {
      path: outputs.favicon16,
      size: 16,
    },
    {
      path: outputs.favicon32,
      size: 32,
    },
    {
      path: outputs.favicon48,
      size: 48,
    },
  ],
  outputs.ico,
);

rmSync(tempDir, {
  recursive: true,
  force: true,
});

console.log(
  "\nVatandoshlar.de app icons generated successfully:",
);

Object.values(outputs).forEach(
  (output) => {
    console.log(
      `- ${output.replace(
        `${root}/`,
        "",
      )}`,
    );
  },
);