"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaQuoteLeft } from "react-icons/fa";

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

export default function Testimonials() {
  return (
    <section className="w-full py-16 font-raleway bg-gray-50 text-black relative">
      <div className="w-11/12 md:w-5/6 mx-auto">
        {/* Section Label */}
        <p className="text-gray-500 text-xs tracking-widest uppercase font-semibold text-start">
          Testimonials
        </p>

        {/* Heading */}
        <h2 className="text-2xl md:text-4xl font-semibold text-[var(--primary-color)] mt-2 text-start mb-8 border-l-4 border-[var(--primary-color)] pl-3 font-amatic">
          WHAT PEOPLE SAY
        </h2>

        {/* Swiper Slider */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={3}
          loop
          centeredSlides
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-md h-72 flex flex-col justify-between hover:shadow-lg transition duration-300 relative">
                {/* Quote Icon */}
                <FaQuoteLeft className="text-[var(--primary-color)] text-3xl opacity-30 mb-3" />

                {/* Message */}
                <p className="text-base leading-relaxed text-gray-700 font-annie line-clamp-5">
                  {testimonial.message}
                </p>

                {/* Footer */}
                <div className="mt-6 flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-[var(--primary-color)]">
                    — {testimonial.name}
                  </h3>

                  {/* Initials Avatar */}
                  <div className="w-10 h-10 rounded-full bg-[var(--primary-color)] text-white flex items-center justify-center text-sm font-bold uppercase">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
