"use client";
import React, { useEffect, useState } from "react";

const keywords = [
  "Residential & Commercial Property Sales",
  "Project Marketing & Promotions",
  "Property Investment Consultation",
  "Legal & Documentation Assistance",
  "Builder Floor & Plot Listings",
];

const Hero: React.FC = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [waitBeforeDelete, setWaitBeforeDelete] = useState(false);

  useEffect(() => {
    const currentWord = keywords[currentWordIndex];

    if (waitBeforeDelete) {
      const delayTimeout = setTimeout(() => {
        setWaitBeforeDelete(false);
        setIsDeleting(true);
      }, 1000);
      return () => clearTimeout(delayTimeout);
    }

    const timeout = setTimeout(
      () => {
        setDisplayText((prev) => {
          if (!isDeleting) {
            const nextText = currentWord.substring(0, prev.length + 1);
            if (nextText === currentWord) setWaitBeforeDelete(true);
            return nextText;
          } else {
            const nextText = prev.substring(0, prev.length - 1);
            if (nextText === "") {
              setIsDeleting(false);
              setCurrentWordIndex(
                (prevIndex) => (prevIndex + 1) % keywords.length
              );
            }
            return nextText;
          }
        });
      },
      isDeleting ? 20 : 60
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, waitBeforeDelete]);

  return (
    <div className="relative w-full h-[240px] sm:h-[400px] md:h-[80vh] overflow-hidden mt-20">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover z-2"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-0" />

      {/* Text Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 md:px-20">
        <h1 className=" text-2xl md:text-4xl mb-3 max-w-4xl font-semibold leading-relaxed">
          Find your perfect space with Delhi’s most trusted property dealer.{" "}
        </h1>
        <h2 className="text-sm md:text-lg italic mb-6">
          <span className="text-white text-base md:text-3xl font-bold">
            {displayText}
            <span className="border-r-2 border-blue-300 animate-pulse ml-1"></span>
          </span>
        </h2>
      </div>
    </div>
  );
};

export default Hero;
