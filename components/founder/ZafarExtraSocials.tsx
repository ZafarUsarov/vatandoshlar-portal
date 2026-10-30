import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function XIcon({ className, ...props }: IconProps) {
  return <svg {...props} aria-hidden="true" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-6.78 7.75L23.2 22h-6.25l-4.9-7.43L5.55 22H2.42l7.25-8.29L1.8 2h6.4l4.43 6.77L18.9 2Zm-1.1 18h1.73L7.25 3.9H5.4Z"/></svg>;
}

export function TikTokIcon({ className, ...props }: IconProps) {
  return <svg {...props} aria-hidden="true" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M16.8 2c.27 2.46 1.65 3.93 4.2 4.09v3.73a9.5 9.5 0 0 1-4.15-1.06v6.84c0 4.13-2.75 6.4-6.18 6.4A6.37 6.37 0 0 1 4.3 15.6a6.36 6.36 0 0 1 7.72-6.21v3.91a2.8 2.8 0 0 0-3.85 2.61 2.78 2.78 0 0 0 2.74 2.76c1.57 0 2.56-1.07 2.56-2.9V2h3.33Z"/></svg>;
}

export const zafarSocialLinks = [
  { platform: "x", href: "https://x.com/zafar02083080?s=11", label: "X", Icon: XIcon },
  { platform: "tiktok", href: "https://www.tiktok.com/@zafar_usarov?_r=1&_t=ZG-9Az2SJeuFdI", label: "TikTok", Icon: TikTokIcon },
] as const;
