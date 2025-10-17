import { LanguageProvider } from './context/LanguageProvider';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { WhyUs } from './sections/WhyUs';
import { Services } from './sections/Services';
import { ReservationForm } from './sections/ReservationForm';
import { Pricing } from './sections/Pricing';
import { FAQ } from './sections/FAQ';
import { Contact } from './sections/Contact';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 text-slate-800 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(520px_circle_at_20%_20%,rgba(14,165,233,0.12),transparent)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(460px_circle_at_80%_10%,rgba(129,140,248,0.12),transparent)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(680px_circle_at_50%_85%,rgba(22,163,74,0.08),transparent)]" />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Hero />
            <WhyUs />
            <Services />
            <ReservationForm />
            <Pricing />
            <FAQ />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </LanguageProvider>
  );
}

export default App;
