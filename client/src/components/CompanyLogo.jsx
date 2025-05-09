import React from 'react';

// Import client logos from assets folder
import airtel from "../assets/airtel.jpg";
import reliance from "../assets/reliance.jpg";
import sbi from "../assets/sbi.png";
import ongc from "../assets/ongc.png";
import vodaphone from "../assets/vodaphone.jpg";
import aai from "../assets/aai.jpg";
import aseb from "../assets/aseb.jpg";

// Functional component to display animated marquee of client logos
const CompanyLogo = () => {
  // Array of imported logo images
  const logos = [airtel, reliance, sbi, ongc, vodaphone, aai, aseb];

  return (
    // Full-width container with white background and vertical padding
    <div className='w-full bg-white py-12 md:py-16 overflow-hidden'>
      {/* Responsive layout container with padding */}
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>

        {/* Heading section */}
        <div className='mb-10 md:mb-14 text-center'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-800 mb-4'>
            <span className='text-green-800'>Our</span>{' '}
            <span className='text-green-600'>Clients</span>
          </h2>
          <p className='text-gray-800 text-lg md:text-xl max-w-xl mx-auto'>
            Trusted by industry leaders across multiple sectors
          </p>
        </div>

        {/* Marquee section for scrolling logos */}
        <div className='relative'>
          {/* Outer wrapper for marquee effect (overflow hidden) */}
          <div className='marquee-wrapper'>
            {/* Animated track containing two sets of logos for smooth looping */}
            <div className='marquee-track'>
              {/* Render two copies of the logos array for infinite scroll illusion */}
              {logos.concat(logos).map((logo, index) => (
                <div key={index} className='logo-item'>
                  {/* Company logo image with hover effect */}
                  <img
                    src={logo}
                    alt="company logo" // Accessibility
                    className='h-10 md:h-12 w-auto max-w-[120px] md:max-w-[160px] object-contain opacity-70 hover:opacity-100 transition-all duration-300'
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CompanyLogo;
