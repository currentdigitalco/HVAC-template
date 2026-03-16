import SmoothScroll from "@/components/ui/SmoothScroll";
import AtmosphericHaze from "@/components/ui/AtmosphericHaze";
import Navbar from "@/components/layout/Navbar";
import ThermostatHero from "@/components/sections/ThermostatHero";
import ThermalServices from "@/components/sections/ThermalServices";
import ExplodedHVAC from "@/components/sections/ExplodedHVAC";
import PerformanceCaseStudies from "@/components/sections/PerformanceCaseStudies";
import About from "@/components/sections/About";
import Stats from "@/components/sections/Stats";
import Testimonial from "@/components/sections/Testimonial";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <AtmosphericHaze />
      <Navbar />
      <main>
        {/* Hero renders as fixed overlay + 200vh scroll spacer.
            It covers the viewport, then curtains split to reveal
            the next section scrolling up behind. */}
        <ThermostatHero />

        {/* Every section below emerges over the previous one.
            Increasing z-index + opaque bg + gradient ::before
            creates the Jesko Jets scroll-over-scroll effect. */}
        <div className="section-emerge" style={{ zIndex: 2 }}>
          <ThermalServices />
        </div>
        <div className="section-emerge" style={{ zIndex: 3 }}>
          <ExplodedHVAC />
        </div>
        <div className="section-emerge-warm" style={{ zIndex: 4 }}>
          <PerformanceCaseStudies />
        </div>
        <div className="section-emerge" style={{ zIndex: 5 }}>
          <About />
        </div>
        <div className="section-emerge" style={{ zIndex: 6 }}>
          <Stats />
        </div>
        <div className="section-emerge" style={{ zIndex: 7 }}>
          <Testimonial />
        </div>
        <div className="section-emerge" style={{ zIndex: 8 }}>
          <CTA />
        </div>
        <div className="section-emerge" style={{ zIndex: 9 }}>
          <Footer />
        </div>
      </main>
    </SmoothScroll>
  );
}
