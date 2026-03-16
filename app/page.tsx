import SmoothScroll from "@/components/ui/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
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
        <Hero />
        <Services />
        <AirPath />
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
