// App.jsx
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CompanyLogo from './components/CompanyLogo';
import PurposeSection from './components/PurposeSection';
import ProductsSection from './components/ProductsSection';
import NewsLetter from './components/NewsLetter';
import Footer from './components/Footer';
import Login from './components/Login';
import DashboardLayout from './components/DashboardLayout'; // Import the new DashboardLayout

function HomePage() {
  return (
    <>
      <Hero />
      <PurposeSection />
      <ProductsSection />
      <CompanyLogo />
      <NewsLetter />
      <Footer />
    </>
  );
}

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/dashboard']; // Add dashboard route to hide navbar

  return (
    <div className="relative min-h-screen bg-white overflow-x-hidden">
      {/* Gradient Blobs - Only show on non-dashboard routes */}
      {!location.pathname.startsWith('/dashboard') && (
        <>
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-tr from-teal-600 via-teal-500 to-teal-400 opacity-30 blur-[100px] rounded-full pointer-events-none z-0" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-emerald-600 to-emerald-400 opacity-20 blur-[100px] rounded-full pointer-events-none z-0" />
        </>
      )}

      {/* Content Layer */}
      <div className="relative z-10">
        {!hideNavbarRoutes.includes(location.pathname) && !location.pathname.startsWith('/dashboard') && <Navbar />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          {/* Add dashboard route */}
          <Route path="/dashboard/*" element={<DashboardLayout />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;