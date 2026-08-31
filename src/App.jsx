import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import ProductOverview from './components/ProductOverview';
import PainPoints from './components/PainPoints';
import HowItWorks from './components/HowItWorks';
import WhyUs from './components/WhyUs';
import ComparisonSection from './components/ComparisonSection';
import SecuritySection from './components/SecuritySection';
import IntegrationSection from './components/IntegrationSection';
import StatsSection from './components/StatsSection';
import RoadmapSection from './components/RoadmapSection';
import VideoSection from './components/VideoSection';
import Testimonials from './components/Testimonials';
import FreeTrialCTA from './components/FreeTrialCTA';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import VideoModal from './components/VideoModal';
import FreeTrialModal from './components/FreeTrialModal';
import FeatureDetailPopup from './components/FeatureDetailPopup';
import FeatureSlideshow from './components/FeatureSlideshow';
import TrialVerifyPage from './components/TrialVerifyPage';
import TrialDemoPage from './components/TrialDemoPage';
import { ModalProvider, useModal } from './context/ModalContext';

function isVerifyRoute() {
  if (typeof window === 'undefined') return false;
  return new URLSearchParams(window.location.search).get('verify') === '1';
}

function AppContent() {
  const { view } = useModal();
  const showTrial = view === 'trial-landing' || isVerifyRoute();

  if (view === 'trial-demo') {
    return <TrialDemoPage />;
  }

  if (showTrial) {
    return <TrialVerifyPage />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-navy-950 transition-colors duration-500">
      <AnnouncementBar />
      <Navbar />

      <main>
        <Hero />
        <TrustBar />
        <ProductOverview />
        <PainPoints />
        <HowItWorks />
        <VideoSection />
        <WhyUs />
        <ComparisonSection />
        <SecuritySection />
        <IntegrationSection />
        <StatsSection />
        <RoadmapSection />
        <Testimonials />
        <FreeTrialCTA />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
      <ScrollToTop />
      <VideoModal />
      <FreeTrialModal />
      <FeatureDetailPopup />
      <FeatureSlideshow />
    </div>
  );
}

export default function App() {
  return (
    <ModalProvider>
      <AppContent />
    </ModalProvider>
  );
}