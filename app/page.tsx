import SmoothScroll from "@/components/ui/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import ThermostatHero from "@/components/sections/ThermostatHero";
import ThermalServices from "@/components/sections/ThermalServices";
import ExplodedHVAC from "@/components/sections/ExplodedHVAC";
import AirPath from "@/components/sections/AirPath";
import BeforeAfter from "@/components/sections/BeforeAfter";
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
        <ThermalServices />
        <AirPath />
        <ExplodedHVAC />
        <BeforeAfter />
        <About />
        <Stats />
        <Testimonial />
        <CTA />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
