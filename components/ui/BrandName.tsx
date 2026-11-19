type BrandNameProps = Readonly<{

  className?: string;

  withDot?: boolean;

}>;

export default function BrandName({

  className,

  withDot = false,

}: BrandNameProps) {

  return (

    <span

      className={`font-bold tracking-tight ${className ?? "text-text-primary"}`}

    >

      {withDot ? "UzDe." : "UzDe"}

    </span>

  );

}
