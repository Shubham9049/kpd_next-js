"use client";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import About from "../../components/About";
import FeaturedProjects from "../../components/FeaturedProjects";
import Footer from "../../components/Footer";
import Hero from "../../components/Hero";
import LatestLaunches from "../../components/LatestLaunches";
import Nav from "../../components/Nav";
import Testimonials from "../../components/Testimonial";
import ContactSidebar from "../../components/ContactSidebar";
import PopupForm from "../../components/PopUpForm";
import { useEffect, useState } from "react";

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPopupOpen(true);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer); // Cleanup
  }, []);
  return (
    <div>
      <Nav />
      <Hero />

      <About />
      <LatestLaunches />
      <Testimonials />
      <FeaturedProjects />
      <Footer />
      {isPopupOpen && <PopupForm onClose={() => setIsPopupOpen(false)} />}
      <div className="fixed bottom-0 left-0 w-full flex md:hidden z-[9999]">
        <div className="w-1/2 bg-[var(--primary-color)] text-white text-center py-3">
          <a
            href="tel:+971521110795"
            className="w-full flex items-center justify-center gap-2"
          >
            <FaPhoneAlt size={18} />
            Call Us
          </a>
        </div>
        <div className="w-1/2 bg-white text-green-500 text-center py-3 border-l border-white">
          <a
            href="https://wa.me/+971521110795"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2"
          >
            <FaWhatsapp size={18} />
            WhatsApp
          </a>
        </div>
      </div>

      <div className="hidden md:block">
        <ContactSidebar />
      </div>
    </div>
  );
}
