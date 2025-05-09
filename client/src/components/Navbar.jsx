import React, { useState } from 'react';
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('#home');

    const navLinks = [
        { href: '#home', label: "Home" },
        { href: '#about', label: "About" },
        { href: '#services', label: "Services" },
        { to: '/dashboard', label: "Dashboard" } // Changed to router link
    ];

    return (
        <nav className='fixed top-0 left-0 right-0 bg-green-50/80 backdrop-blur-sm z-50 border-b border-green-100 shadow-sm'>
            <div className='w-full container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 md:h-20'>
                
                {/* Logo section */}
                <div className='flex items-center gap-2 cursor-pointer opacity-75 hover:opacity-100 transition-opacity duration-300'>
                    <img src="/logo.jpg" alt="Powerline Logo" className="h-10 w-auto" />
                    <span className='text-lg font-semibold text-green-700'>POWERLINE</span>
                </div>

                {/* Mobile menu button */}
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)} 
                    className='md:hidden p-2'
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <HiX className='size-6' /> : <HiMenu className='size-6' />}
                </button>

                {/* Desktop navigation */}
                <div className='hidden md:flex items-center gap-10'>
                    {navLinks.map((link, index) => (
                        link.href ? (
                            <a
                                key={index}
                                href={link.href}
                                onClick={() => setActiveLink(link.href)}
                                className={`text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-green-600 after:transition-all ${
                                    activeLink === link.href ? "text-green-600 after:w-full" : "text-gray-600 hover:text-gray-900"
                                }`}
                            >
                                {link.label}
                            </a>
                        ) : (
                            <Link
                                key={index}
                                to={link.to}
                                onClick={() => setActiveLink(link.to)}
                                className={`text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-green-600 after:transition-all ${
                                    activeLink === link.to ? "text-green-600 after:w-full" : "text-gray-600 hover:text-gray-900"
                                }`}
                            >
                                {link.label}
                            </Link>
                        )
                    ))}
                </div>

                {/* Login button */}
                <button className='hidden md:block bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 text-sm font-medium transition-all hover:shadow-lg hover:shadow-green-100'>
                    <Link to="/login">Login</Link>
                </button>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className='md:hidden bg-white border-t border-gray-100 py-4'>
                    <div className='container mx-auto px-4 space-y-4'>
                        {navLinks.map((link, index) => (
                            link.href ? (
                                <a 
                                    key={index}
                                    href={link.href}
                                    onClick={() => {
                                        setActiveLink(link.href);
                                        setIsMenuOpen(false);
                                    }}
                                    className={`block text-sm font-medium py-2 ${
                                        activeLink === link.href ? "text-green-600" : "text-gray-600 hover:text-gray-900"
                                    }`}
                                >
                                    {link.label}
                                </a>
                            ) : (
                                <Link
                                    key={index}
                                    to={link.to}
                                    onClick={() => {
                                        setActiveLink(link.to);
                                        setIsMenuOpen(false);
                                    }}
                                    className={`block text-sm font-medium py-2 ${
                                        activeLink === link.to ? "text-green-600" : "text-gray-600 hover:text-gray-900"
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            )
                        ))}
                        {/* Mobile Login button */}
                        <button className='w-full bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 text-sm font-medium transition-all hover:shadow-lg hover:shadow-green-100'>
                            <Link to="/login" className="block w-full">Login</Link>
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;