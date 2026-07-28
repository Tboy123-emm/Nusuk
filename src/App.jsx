import { useState } from 'react';
import Navigation from './components/Navigation';
import CinematicHero from './components/CinematicHero';
import About from './components/About';
import PlanCriteria from './components/PlanCriteria';
import FeaturedPackages from './components/FeaturedPackages';
import Gallery from './components/Gallery';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import ConsultationModal from './components/ConsultationModal';
import AdminPage from './components/AdminPage';

function App() {
  const [isConsultOpen, setIsConsultOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState(null);

  // Check if admin route
  const isAdminPath = window.location.pathname === '/admin';

  if (isAdminPath) {
    return <AdminPage />;
  }

  const handleOpenConsultation = () => {
    setSelectedPkg(null);
    setIsConsultOpen(true);
  };

  const handleCloseConsultation = () => {
    setIsConsultOpen(false);
  };

  const handleBookPackage = (pkg, plan) => {
    setSelectedPkg({ ...pkg, selectedPlan: plan });
    setIsConsultOpen(true);
  };

  return (
    <>
      {/* Floating Elegant Header */}
      <Navigation onOpenConsultation={handleOpenConsultation} />

      {/* Spacious Cinematic Parallax Hero */}
      <CinematicHero onOpenConsultation={handleOpenConsultation} />

      {/* Modern Split-Layout About Section */}
      <About />

      {/* Plan Criteria & Benefits Section */}
      <PlanCriteria />

      {/* Featured Curated Experience Cards */}
      <FeaturedPackages
        onBookPackage={handleBookPackage}
      />

      {/* Editorial Destinations Masonry Grid */}
      <Gallery />

      {/* Premium Service Trust Highlights */}
      <WhyChooseUs />

      {/* Luxury Consulting Form Section */}
      <ContactForm />

      {/* Sleek Minimalist Footer */}
      <Footer />

      {/* Floating Scheduler Consultation Modal */}
      <ConsultationModal 
        isOpen={isConsultOpen} 
        onClose={handleCloseConsultation} 
        prefilledPackage={selectedPkg}
      />
    </>
  );
}

export default App;
