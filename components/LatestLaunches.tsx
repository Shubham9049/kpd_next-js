"use client";
import img1 from "../assets/akashha.jpeg";
import React, { useState } from "react";
import PopupForm from "./PopUpForm";
import img2 from "../assets/IMG-20211025-WA0004 (1).jpg";
import Image from "next/image";

const LatestLaunches: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <section className="py-12">
      {/* Title */}
      <div className="w-11/12 md:w-5/6 mx-auto text-center mb-10">
        <p className="uppercase tracking-widest text-gray-500 text-sm mb-2">
          Properties
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold text-[var(--primary-color)] font-amatic">
          LATEST LAUNCHES
        </h2>
      </div>

      {/* Layout: Image | Content | Image */}
      <div className="w-11/12 md:w-5/6 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        {/* Left Image */}
        <div className="text-center">
          <Image
            src={img1}
            alt="Akashha"
            className="w-full h-[340px] object-contain "
          />
          <p className="mt-3 text-md font-medium uppercase">AKASHHA</p>
          <p className="text-xs text-gray-500">
            Surana & Ambition, Gulabi Bagh
          </p>
        </div>

        {/* Center Content */}
        <div className="text-center px-4">
          <p className="text-md leading-relaxed mb-6 text-gray-700">
            Each of our properties reflects unique design aesthetics, offering
            an aspirational lifestyle within a thriving community. All projects
            are exclusively developed and sold by KPD team, ensuring complete
            ownership and commitment from start to finish.
          </p>
          <button
            onClick={() => setIsPopupOpen(true)}
            className="px-6 py-2 bg-[var(--primary-color)] text-white rounded hover:opacity-85 transition-colors"
          >
            Contact Us
          </button>
        </div>

        {/* Right Image */}
        <div className="text-center">
          <Image
            src={img2}
            alt="Millenium Binghati"
            className="w-full h-[340px] object-contain"
          />
          <p className="mt-3 text-md font-medium uppercase">3, Sanjay Nagar</p>
          <p className="text-xs text-gray-500">Gulabi bagh</p>
        </div>
      </div>

      {/* Popup */}
      {isPopupOpen && <PopupForm onClose={() => setIsPopupOpen(false)} />}
    </section>
  );
};

export default LatestLaunches;
