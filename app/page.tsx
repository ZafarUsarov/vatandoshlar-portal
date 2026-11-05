import RebrandingHomeFrame from "../components/home/RebrandingHomeFrame";
import MarketHomeEntry from "../components/home/MarketHomeEntry";
import HomeShareCTA from "../components/home/HomeShareCTA";
import GuidePreviewSection from "../components/home/GuidePreviewSection";
import PopularCategoriesSection from "../components/home/PopularCategoriesSection";
import Reveal from "../components/Reveal";
import SearchSection from "../components/SearchSection";
import {
  HeroSection,
  HomeFooter,
} from "../components/home";

export default function HomePage() {
  return (
    <>
      <RebrandingHomeFrame>
      <main className="min-h-screen bg-white pt-[calc(6rem+var(--rebranding-height))] text-slate-950 transition-[background-color,color,padding] lg:pt-[calc(7rem+var(--rebranding-height))] dark:bg-slate-950 dark:text-white">
        <HeroSection />

        <MarketHomeEntry />


        <Reveal>
          <SearchSection />
        </Reveal>

        <GuidePreviewSection />

        <Reveal>
          <PopularCategoriesSection />
        </Reveal>

        <HomeShareCTA />
      </main>

      <HomeFooter />
      </RebrandingHomeFrame>
    </>
  );
}
