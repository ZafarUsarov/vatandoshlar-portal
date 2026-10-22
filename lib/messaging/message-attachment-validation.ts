import sharp from "sharp";

export const MAX_IMAGE_BYTES = 15 * 1024 * 1024;
export const MAX_DOCUMENT_BYTES = 10 * 1024 * 1024;
export const MAX_ATTACHMENTS = 5;
export type ValidAttachment = { bytes: Uint8Array; mime: string; name: string; width: number | null; height: number | null };
const starts = (b: Uint8Array, sig: number[]) => sig.every((v, i) => b[i] === v);
const textFile = (b: Uint8Array) => !b.includes(0) && (() => { try { new TextDecoder("utf-8", { fatal: true }).decode(b); return true; } catch { return false; } })();
export async function validateAttachment(file: File): Promise<ValidAttachment | null> {
  const name = file.name.replace(/[\\/\x00-\x1f\x7f]/g, "_").slice(0, 180);
  if (!file.size || file.size > MAX_IMAGE_BYTES) return null;
  const bytes = new Uint8Array(await file.arrayBuffer());
  const ext = name.split(".").pop()?.toLowerCase();
  const imageTypes: Record<string, string> = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp", heic: "image/heic", heif: "image/heif" };
  if (ext && imageTypes[ext]) {
    const isJpeg = starts(bytes, [0xff, 0xd8, 0xff]);
    const isPng = starts(bytes, [137, 80, 78, 71, 13, 10, 26, 10]);
    const isWebp = String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" && String.fromCharCode(...bytes.slice(8, 12)) === "WEBP";
    const isHeif = String.fromCharCode(...bytes.slice(4, 8)) === "ftyp" && /^(heic|heix|hevc|hevx|mif1|msf1)$/.test(String.fromCharCode(...bytes.slice(8, 12)));
    if (!(ext === "jpg" || ext === "jpeg" ? isJpeg : ext === "png" ? isPng : ext === "webp" ? isWebp : isHeif)) return null;
    try {
      const meta = await sharp(bytes, { limitInputPixels: 40_000_000 }).metadata();
      if (!meta.width || !meta.height || (meta.pages && meta.pages > 1)) return null;
      return { bytes, mime: imageTypes[ext], name, width: meta.width, height: meta.height };
    } catch { return null; }
  }
  if (file.size > MAX_DOCUMENT_BYTES) return null;
  if (ext === "pdf" && starts(bytes, [37, 80, 68, 70, 45]) && new TextDecoder("latin1").decode(bytes.slice(-2048)).includes("%%EOF")) return { bytes, mime: "application/pdf", name, width: null, height: null };
  if (ext === "txt" && textFile(bytes)) return { bytes, mime: "text/plain; charset=utf-8", name, width: null, height: null };
  // OOXML and legacy Office require deeper content/malware validation before enabling.
  return null;
}
