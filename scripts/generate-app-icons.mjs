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
    "apple-touch-icon.png",
  ),
  pwa192: resolve(
    brandDir,
    "icon-192x192.png",
  ),
  pwa512: resolve(
    brandDir,
    "icon-512x512.png",
  ),
  maskable512: resolve(
    brandDir,
    "icon-maskable-512x512.png",
  ),
  ico: resolve(
    root,
    "public/favicon.ico",
  ),
};

const cropSizes = {
  // Favicon uchun tighter crop.
  // 16–48 px o‘lchamlarda geometrik belgi
  // imkon qadar aniq ko‘rinadi.
  favicon: 880,

  // iOS Home Screen va oddiy PWA iconlari.
  // Original assetdagi ortiqcha whitespace kamayadi.
  app: 920,

  // Maskable icon uchun konservativroq crop.
  // Platforma maskasi qo‘llanganda belgi
  // safe-zone ichida qoladi.
  maskable: 1080,
};

function runSips(args) {
  execFileSync(
    "sips",
    args,
    {
      stdio: "inherit",
    },
  );
}

function cropSource(size, output) {
  runSips([
    "--cropToHeightWidth",
    String(size),
    String(size),
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
    directoryEntrySize * images.length;

  const totalSize =
    dataOffset +
    images.reduce(
      (total, image) =>
        total + image.data.length,
      0,
    );

  const ico = Buffer.alloc(totalSize);

  // ICONDIR header
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
        index * directoryEntrySize;

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

mkdirSync(
  tempDir,
  {
    recursive: true,
  },
);

const faviconCrop = resolve(
  tempDir,
  "favicon-crop.png",
);

const appCrop = resolve(
  tempDir,
  "app-crop.png",
);

const maskableCrop = resolve(
  tempDir,
  "maskable-crop.png",
);

// Source logodan uch xil optik crop.
cropSource(
  cropSizes.favicon,
  faviconCrop,
);

cropSource(
  cropSizes.app,
  appCrop,
);

cropSource(
  cropSizes.maskable,
  maskableCrop,
);

// Browser favicons.
resize(
  faviconCrop,
  16,
  outputs.favicon16,
);

resize(
  faviconCrop,
  32,
  outputs.favicon32,
);

resize(
  faviconCrop,
  48,
  outputs.favicon48,
);

// Apple Touch Icon.
resize(
  appCrop,
  180,
  outputs.apple180,
);

// PWA icons.
resize(
  appCrop,
  192,
  outputs.pwa192,
);

resize(
  appCrop,
  512,
  outputs.pwa512,
);

// Maskable PWA icon.
resize(
  maskableCrop,
  512,
  outputs.maskable512,
);

// Multi-size favicon.ico.
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

// Temporary crop fayllarini tozalash.
rmSync(
  tempDir,
  {
    recursive: true,
    force: true,
  },
);

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