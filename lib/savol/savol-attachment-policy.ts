export const MAX_ATTACHMENTS = 3;
export const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;
export const ATTACHMENT_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'] as const;
export type AttachmentType = typeof ATTACHMENT_TYPES[number];
export function validAttachment(type: string, size: number): type is AttachmentType {
 return (ATTACHMENT_TYPES as readonly string[]).includes(type) && Number.isSafeInteger(size) && size > 0 && size <= MAX_ATTACHMENT_BYTES;
}
export function matchesSignature(bytes: Uint8Array, type: string): boolean {
 if(type === 'application/pdf') return bytes.length >= 5 && String.fromCharCode(...bytes.subarray(0,5)) === '%PDF-';
 if(type === 'image/jpeg') return bytes.length >= 3 && bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
 if(type === 'image/png') return bytes.length >= 8 && [137,80,78,71,13,10,26,10].every((b,i) => bytes[i] === b);
 if(type === 'image/webp') return bytes.length >= 12 && String.fromCharCode(...bytes.subarray(0,4)) === 'RIFF' && String.fromCharCode(...bytes.subarray(8,12)) === 'WEBP';
 return false;
}
