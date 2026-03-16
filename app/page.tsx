import SmoothScroll from "@/components/ui/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import ThermostatHero from "@/components/sections/ThermostatHero";
import ThermalServices from "@/components/sections/ThermalServices";
import ExplodedHVAC from "@/components/sections/ExplodedHVAC";
import AirPath from "@/components/sections/AirPath";
import PerformanceCaseStudies from "@/components/sections/PerformanceCaseStudies";
import About from "@/components/sections/About";
import Stats from "@/components/sections/Stats";
import Testimonial from "@/components/sections/Testimonial";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <ThermostatHero />
        <AirPath variant="wave" />
        <ThermalServices />
        <AirPath variant="step" color="#EA580C" />
        <ExplodedHVAC />
        <AirPath variant="diagonal" />
        <PerformanceCaseStudies />
        <AirPath variant="straight" color="#EA580C" opacity={0.1} />
        <About />
        <Stats />
        <Testimonial />
        <CTA />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
