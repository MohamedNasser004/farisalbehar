import About from "./components/About";
import ContactForm from "./components/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/Hero2";
import Location from "./components/Locations";
import PreviousSuccess from "./components/PreviousSuccess";
import OurServices from "./components/Services";

export default function AboutPage() {
  return (
    <>
    <Header />
    <HeroSection />
    <About />
    <OurServices />
    <PreviousSuccess />
    <ContactForm />
    <Location />
    <Footer />
    </>
  );
}
