type BrandNameProps = Readonly<{
  className?: string;
}>;

export default function BrandName({
  className,
}: BrandNameProps) {
  return (
    <span className={className}>
      <span className="text-text-primary">
        Vatandoshlar
      </span>
      <span className="text-emerald-600 dark:text-emerald-400">
        .de
      </span>
    </span>
  );
}
