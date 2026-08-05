import type { GuideCategory } from "../../types/guide";
import GuideCategoryCard from "./GuideCategoryCard";

type GuideCategoryGridProps = Readonly<{
  categories: ReadonlyArray<GuideCategory>;
  comingSoonLabel: string;
  articlesLabel: string;
  openLabel: string;
}>;

export default function GuideCategoryGrid({
  categories,
  comingSoonLabel,
  articlesLabel,
  openLabel,
}: GuideCategoryGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {categories.map((category) => (
        <GuideCategoryCard
          key={category.id}
          category={category}
          comingSoonLabel={comingSoonLabel}
          articlesLabel={articlesLabel}
          openLabel={openLabel}
        />
      ))}
    </div>
  );
}
