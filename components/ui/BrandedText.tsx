import { Fragment } from "react";

import BrandName from "@/components/ui/BrandName";

type BrandedTextProps = Readonly<{
  text: string;
}>;

export default function BrandedText({
  text,
}: BrandedTextProps) {
  const parts = text.split("Vatandoshlar.de");

  if (parts.length === 1) {
    return text;
  }

  return (
    <>
      {parts.map((part, index) => (
        <Fragment key={`${part}-${index}`}>
          {index > 0 && <BrandName />}
          {part}
        </Fragment>
      ))}
    </>
  );
}
