'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { FeaturesSection, HowItWorksSection, ContactSection } from "@/components/AnimatedSections";
import { Github, X } from "lucide-react";

// Dynamically import QRGenerator with no SSR
const QRGenerator = dynamic(
  () => import('@/components/qr-generator').then((mod) => mod.QRGenerator),
  { ssr: false }
);

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      closeMenu();
    }
  };
  return (
    <main className="relative pt-16">
      {/* Header with Logo */}
      <header className={`bg-white/90 backdrop-blur-sm fixed w-full top-0 left-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-sm border-b border-gray-100' : ''}`}>
        <div className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img 
              src="/qreat-logo.png" 
              alt="QREAT Logo" 
              className="h-9 w-auto object-contain" 
            />
          </div>
          <nav className="hidden sm:block">
            <ul className="flex items-center gap-4 md:gap-6">
              <li><a href="#" onClick={(e) => scrollToSection(e, 'hero')} className="text-sm md:text-base font-medium text-gray-900 hover:text-[#00cdb6] transition-colors">Home</a></li>
              <li><a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="text-sm md:text-base font-medium text-gray-900 hover:text-[#00cdb6] transition-colors">Features</a></li>
              <li><a href="#how-it-works" onClick={(e) => scrollToSection(e, 'how-it-works')} className="text-sm md:text-base font-medium text-gray-900 hover:text-[#00cdb6] transition-colors">How It Works</a></li>
              <li><a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="text-sm md:text-base font-medium text-gray-900 hover:text-[#00cdb6] transition-colors">Contact</a></li>
            </ul>
          </nav>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:hidden text-gray-700 hover:text-[#00cdb6] transition-colors"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
          
          {/* Mobile Menu */}
          <div 
            className={`fixed inset-0 bg-gradient-to-b from-gray-900 to-gray-800 z-40 transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} sm:hidden`}
          >
            <div className="flex flex-col h-full pt-24 px-6 space-y-8">
              {/* Header */}
              <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center border-b border-gray-700">
                <img 
                  src="/qreat-logo.png" 
                  alt="QREAT Logo" 
                  className="h-8 w-auto object-contain" 
                />
                <button 
                  onClick={closeMenu}
                  className="text-gray-300 hover:text-white p-2"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Menu Items */}
              <div className="absolute top-14 left-0 right-0 p-4 flex flex-col justify-between bg-gradient-to-b from-gray-800 to-gray-900">
                <a 
                  href="#" 
                  onClick={(e) => {
                    scrollToSection(e, 'hero');
                    closeMenu();
                  }} 
                  className="text-xl font-medium text-white hover:text-[#00cdb6] transition-colors py-3 px-4 rounded-lg hover:bg-gray-700"
                >
                  Home
                </a>
                <a 
                  href="#features" 
                  onClick={(e) => {
                    scrollToSection(e, 'features');
                    closeMenu();
                  }} 
                  className="text-xl font-medium text-white hover:text-[#00cdb6] transition-colors py-3 px-4 rounded-lg hover:bg-gray-700"
                >
                  Features
                </a>
                <a 
                  href="#how-it-works" 
                  onClick={(e) => {
                    scrollToSection(e, 'how-it-works');
                    closeMenu();
                  }} 
                  className="text-xl font-medium text-white hover:text-[#00cdb6] transition-colors py-3 px-4 rounded-lg hover:bg-gray-700"
                >
                  How It Works
                </a>
                <a 
                  href="#contact" 
                  onClick={(e) => {
                    scrollToSection(e, 'contact');
                    closeMenu();
                  }} 
                  className="text-xl font-medium text-white hover:text-[#00cdb6] transition-colors py-3 px-4 rounded-lg hover:bg-gray-700"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div id="hero">
        <QRGenerator />
      </div>

      <div id="features">
        <FeaturesSection />
      </div>
      <div id="how-it-works">
        <HowItWorksSection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>

      <footer className="bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img 
                  src="/favicon.png" 
                  alt="QREAT Logo" 
                  className="h-10 w-auto" 
                />
              </div>
              <p className="text-sm leading-relaxed">
                Modern QR Code generator platform with cutting-edge technology to comprehensively customize your QR
                codes with advanced features.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <Github className="h-4 w-4" />
                <span>Open Source Project</span>
              </div>
            </div>

            {/* Features Section */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Features</h4>
              <ul className="space-y-2 text-sm">
                <li>QR Code Generator</li>
                <li>Custom Designs</li>
                <li>Bulk Generation</li>
                <li>API Access</li>
              </ul>
            </div>

            {/* Support Section */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>Documentation</li>
                <li>FAQ</li>
                <li>Contact</li>
                <li>Report a Bug</li>
              </ul>
            </div>

            {/* Developer Section */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Developer</h4>
              <div className="space-y-3">
                <a
                  href="https://github.com/racoonhq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-teal-400 transition-colors"
                >
                  <div className="p-1 bg-teal-500 rounded">
                    <Github className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-white">RacoonHQ</div>
                    <div className="text-xs text-gray-400">Lead Developer</div>
                  </div>
                </a>
                <p className="text-xs leading-relaxed">
                  Developed with passion to provide the best experience in generating and customizing QR codes.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-800 mt-8 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
              <div className="text-gray-400">© 2024 RacoonHQ. All rights reserved.</div>
              <div className="flex items-center gap-6">
                <span className="text-gray-400">Built with Next.js & TailwindCSS</span>
                <div className="flex gap-4">
                  <span className="hover:text-teal-400 cursor-pointer">Privacy Policy</span>
                  <span className="hover:text-teal-400 cursor-pointer">Terms of Service</span>
                </div>
                <span className="text-gray-500">⚡ Powered by modern web tech</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
