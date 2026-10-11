import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ExperienceSection from "@/components/ExperienceSection";
import TeamSection from "@/components/TeamSection";
import BookingSection from "@/components/BookingSection";
import BlogSection from "@/components/BlogSection";
import SiteFooter from "@/components/SiteFooter";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <ServicesSection />
        <ExperienceSection />
        <TeamSection />
        <BookingSection />
        <BlogSection />
      </main>
      <SiteFooter />
    </>
  );
}
