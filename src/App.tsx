import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { WhyChoose } from './components/WhyChoose';
import { Packs } from './components/Packs';
import { Catalogue } from './components/Catalogue';
import { DeliveryTestimonials } from './components/DeliveryTestimonials';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main>
        <Hero />
        <About />
        <WhyChoose />
        <Packs />
        <Catalogue />
        <DeliveryTestimonials />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
