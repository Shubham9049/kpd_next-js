"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    name: "PULKIT",
    message:
      "I recently worked with KPD to buy my new home, and their team made the entire process smooth and hassle-free.",
  },
  {
    name: "KIRTI BEDI",
    message:
      "KPD helped me sell my property quickly and at the best price. Their expertise is unmatched.",
  },
  {
    name: "SAURAV SHARMA",
    message:
      "I am extremely satisfied with KPD’s services. They guided me professionally through every step of buying my dream home.",
  },
  {
    name: "ANITA DESAI",
    message:
      "Buying my first property with KPD was a stress-free experience. Highly recommended!",
  },
  {
    name: "RAHUL VERMA",
    message:
      "The team at KPD is professional and trustworthy. They made selling my property easy and efficient.",
  },
  {
    name: "PRIYA KAPOOR",
    message:
      "KPD’s attention to detail and commitment to clients is outstanding. I couldn’t ask for a better experience.",
  },
  {
    name: "RAJ SINGH",
    message:
      "Thanks to KPD, my property sale was fast and smooth. Truly reliable real estate experts.",
  },
  {
    name: "NEHA GUPTA",
    message:
      "KPD helped me find the perfect home within my budget. Excellent service and guidance throughout!",
  },
];

const Testimonials: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 3,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1024, // Tablet
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 768, // Mobile
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
    appendDots: (dots: React.ReactNode) => (
      <div className="mt-2">
        <ul className="flex justify-center m-0">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-2.5 h-2.5 rounded-full bg-[var(--primary-color)]" />
    ),
  };

  return (
    <section className="py-12 bg-gray-50">
      {/* Header */}
      <div className="w-11/12 max-w-6xl mx-auto mb-8 px-4">
        <p className="uppercase tracking-widest text-gray-500 text-sm mb-1">
          Testimonial
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--primary-color)] border-l-4 border-[var(--primary-color)] pl-3 font-amatic">
          WHAT PEOPLE SAY
        </h2>
      </div>

      {/* Slider */}
      <div className="w-11/12 max-w-6xl mx-auto">
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="px-3">
              <div className="bg-white border border-gray-200 rounded-xl p-6 min-h-[250px] flex flex-col justify-between shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg">
                <div>
                  <span className="text-5xl text-[var(--primary-color)] leading-none font-serif">
                    “
                  </span>
                  <p className="mt-3 text-gray-700  md:text-md leading-relaxed font-annie">
                    {testimonial.message}
                  </p>
                </div>
                <p className="mt-6 text-sm font-semibold text-[var(--primary-color)]">
                  — {testimonial.name}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;
