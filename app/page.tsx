import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Treatments from "@/components/Treatments";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import ExploreHospital from "@/components/ExploreHospital";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Treatments />
      <Services />
      <Gallery />
      <ExploreHospital />
      <WhyUs />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
      {/* Global overlays */}
      <ContactModal />
      <WhatsAppButton />
    </main>
  );
}
