type BrandNameProps = Readonly<{
  className?: string;
}>;

export default function BrandName({
  className,
}: BrandNameProps) {
  return (
    <span
      className={`font-bold tracking-tight ${className ?? "text-text-primary"}`}
    >
      UzDe
    </span>
  );
}
