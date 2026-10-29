"use client";

import { useState } from "react";
import Image from "next/image";
import { UserRound } from "lucide-react";

type FounderAvatarProps = {
  src: string | null;
  alt: string;
};

export default function FounderAvatar({ src, alt }: FounderAvatarProps) {
  const [failed, setFailed] = useState(false);

  return (
    <span className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
      {src && !failed ? (
        <Image
          src={src}
          alt={alt}
          width={48}
          height={48}
          sizes="48px"
          className="size-full object-cover object-center"
          onError={() => setFailed(true)}
        />
      ) : (
        <UserRound aria-hidden="true" size={21} strokeWidth={1.8} />
      )}
    </span>
  );
}
