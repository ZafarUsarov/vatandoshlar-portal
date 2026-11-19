import EditorialNewsHome from "../components/home/EditorialNewsHome";
import EditorialServicesSection from "../components/home/EditorialServicesSection";
import EditorialPartnersSection from "../components/home/EditorialPartnersSection";
import EditorialSupportSection from "../components/home/EditorialSupportSection";
import RebrandingHomeFrame from "../components/home/RebrandingHomeFrame";
import MarketHomeEntry from "../components/home/MarketHomeEntry";
import HomeShareCTA from "../components/home/HomeShareCTA";
import GuidePreviewSection from "../components/home/GuidePreviewSection";
import PopularCategoriesSection from "../components/home/PopularCategoriesSection";
import Reveal from "../components/Reveal";
import SearchSection from "../components/SearchSection";
import {
  HomeFooter,
} from "../components/home";

export default function HomePage() {
  return (
    <>
      <RebrandingHomeFrame>
      <main className="min-h-screen bg-[var(--uzde-page-bg)] pt-[calc(66px+var(--rebranding-height)-4px)] text-slate-950 transition-[background-color,color,padding] lg:pt-[calc(5rem+var(--rebranding-height))] dark:text-white">
        <div className="mx-auto w-full max-w-[1600px]">
        <EditorialNewsHome />

        <MarketHomeEntry />

        <Reveal>
          <SearchSection />
        </Reveal>

        <GuidePreviewSection />

        <Reveal>
          <PopularCategoriesSection />
        </Reveal>

        <EditorialServicesSection />

        <EditorialPartnersSection />

        <EditorialSupportSection />

        <HomeShareCTA />
        </div>
      </main>

      <HomeFooter />
      </RebrandingHomeFrame>
    </>
  );
}
