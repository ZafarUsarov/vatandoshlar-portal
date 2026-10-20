import Header from "../components/Header";
import MarketHomeEntry from "../components/home/MarketHomeEntry";
import GuidePreviewSection from "../components/home/GuidePreviewSection";
import JobsSection from "../components/JobsSection";
import PopularCategoriesSection from "../components/home/PopularCategoriesSection";
import Reveal from "../components/Reveal";
import SearchSection from "../components/SearchSection";
import ServicesSection from "../components/ServicesSection";
import {
  HeroSection,
  HomeFooter,
} from "../components/home";

export default function HomePage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-white pt-24 text-slate-950 transition-colors lg:pt-28 dark:bg-slate-950 dark:text-white">
        <HeroSection />

        <MarketHomeEntry />

        <Reveal>
          <SearchSection />
        </Reveal>

        <GuidePreviewSection />

        <Reveal>
          <PopularCategoriesSection />
        </Reveal>

        <Reveal>
          <ServicesSection />
        </Reveal>

        <Reveal>
          <JobsSection />
        </Reveal>
      </main>

      <HomeFooter />
    </>
  );
}
