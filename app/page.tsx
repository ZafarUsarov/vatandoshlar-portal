import EventsSection from "../components/EventsSection";
import Features from "../components/Features";
import Header from "../components/Header";
import JobsSection from "../components/JobsSection";
import NewsSection from "../components/NewsSection";
import Reveal from "../components/Reveal";
import SearchSection from "../components/SearchSection";
import ServicesSection from "../components/ServicesSection";
import {
  FeaturedSpecialistsSection,
  FinalCtaSection,
  HeroSection,
  HomeFooter,
  PopularCategoriesSection,
  StatisticsSection,
} from "../components/home";

export default function HomePage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-white pt-24 text-slate-950 transition-colors lg:pt-28 dark:bg-slate-950 dark:text-white">
        <HeroSection />

        <StatisticsSection />

        <Reveal>
          <SearchSection />
        </Reveal>

        <Reveal>
          <PopularCategoriesSection />
        </Reveal>

        <Reveal>
          <FeaturedSpecialistsSection />
        </Reveal>

        <Reveal>
          <Features />
        </Reveal>

        <Reveal>
          <NewsSection />
        </Reveal>

        <Reveal>
          <ServicesSection />
        </Reveal>

        <Reveal>
          <JobsSection />
        </Reveal>

        <Reveal>
          <EventsSection />
        </Reveal>

        <FinalCtaSection />
      </main>

      <HomeFooter />
    </>
  );
}