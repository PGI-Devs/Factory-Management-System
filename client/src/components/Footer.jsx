// components/Footer.jsx
import React from 'react';

// Importing social media icons from react-icons library
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
// Importing arrow icon for button
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

// Functional Footer component
const Footer = () => {
  // List of static quick links shown in the footer
  const quickLinks = [
    { name: "About Powerline CSR" },
    { name: "Employee Recognition" },
    { name: "Life @ Powerline" },
    { name: "Manufacturing Process" },
    { name: "Waste Management" },
    { name: "Clients" }
  ];

  // List of Kirloskar Care-related helpful links
  const kirloskarCare = [
    { name: "Sales Dealer Network" },
    { name: "Service Dealer Network" },
    { name: "Complaint Register" },
    { name: "Installation Guidelines" },
    { name: "Genset Electrical" },
    { name: "Backup Power Solutions" }
  ];

  // Social media icons with custom hover color styles
  const socialIcons = [
    { icon: <FaFacebook className="text-lg" />, color: "hover:text-blue-600" },
    { icon: <FaTwitter className="text-lg" />, color: "hover:text-sky-500" },
    { icon: <FaLinkedin className="text-lg" />, color: "hover:text-blue-700" },
    { icon: <FaInstagram className="text-lg" />, color: "hover:text-pink-600" }
  ];

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      
      {/* Layered animated gradient background for aesthetic appeal */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 via-gray-900 to-emerald-900/20 opacity-80"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-teal-600 rounded-full filter blur-3xl opacity-10 animate-pulse-slow"></div>
      
      {/* Main content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 sm:py-16 lg:py-20">

        {/* 4-column responsive grid layout for footer sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          
          {/* About Us section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6 text-teal-400">About Us</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Powerline Group of Industries (PGI) is a trusted name in the field of power generation providing Alternate/Standby Power Solutions to North-East India for over 25 years by supplying Diesel and Gas Generators.
            </p>
            <button className="flex items-center text-teal-400 font-medium group">
              VIEW PROFILE
              {/* Animated arrow icon */}
              <HiOutlineArrowNarrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Quick Links list */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-teal-400 transition-colors duration-300 flex items-center group"
                  >
                    {/* Dot indicator on hover */}
                    <span className="w-2 h-2 bg-teal-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kirloskar Care links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white uppercase tracking-wider">Kirloskar Care</h3>
            <ul className="space-y-3">
              {kirloskarCare.map((link, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-teal-400 transition-colors duration-300 flex items-center group"
                  >
                    {/* Dot indicator on hover */}
                    <span className="w-2 h-2 bg-teal-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section with address, contact and social icons */}
        <div className="mt-16 pt-10 border-t border-gray-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Company Address */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">ADDRESS</h4>
            <p className="text-gray-300">Powerline Opp. Dairy Gate, Near Namghar, Khanapara, Guwahati</p>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">CONTACT</h4>
            <p className="text-gray-300">0361 2363881, 2363882</p>
            <p className="text-gray-300">sales@powerlinegenset.com</p>
          </div>

          {/* Social Media Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">SOCIAL</h4>
            <div className="flex space-x-4">
              {socialIcons.map((social, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className={`text-gray-300 ${social.color} transition-colors duration-300 transform hover:-translate-y-1`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright and Attribution */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Powerline Group of Industries. All Rights Reserved.
          </p>
          <p className="text-gray-400 text-sm">
            Designed and Developed by <span className="text-teal-400"></span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
