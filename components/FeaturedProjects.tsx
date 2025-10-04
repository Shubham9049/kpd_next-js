"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import img1 from "../assets/IMG-20211025-WA0004 (1).jpg";
import img2 from "../assets/IMG-20211025-WA0005.jpg";
import img3 from "../assets/IMG-20211025-WA0006 (1).jpg";
import img4 from "../assets/J-3-10_Elevation_View_2nd_Option (1).jpg";
import { StaticImageData } from "next/image";

interface Project {
  img: StaticImageData;
  title: string;
}

const projects: Project[] = [
  { img: img1, title: "3, Sanjay Nagar, Gulabi Bagh" },
  { img: img2, title: "4, Sanjay Nagar, Gulabi Bagh" },
  { img: img3, title: "P-3/15, DLF-II" },
  { img: img4, title: "J-3/10, DLF-II" },
];

const FeaturedProjects: React.FC = () => {
  return (
    <section className="py-10 relative">
      <div className="w-11/12 md:w-5/6 mx-auto relative">
        {/* Title */}
        <div className="mb-8">
          <p className="uppercase tracking-widest text-gray-500 text-md">
            Projects
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-[var(--primary-color)] mb-6 font-amatic border-l-4 border-[var(--primary-color)] pl-3">
            DELIVERED PROJECTS
          </h2>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={16} // gap between cards
          slidesPerView={4} // default for desktop
          breakpoints={{
            1024: { slidesPerView: 4 }, // desktop
            768: { slidesPerView: 2 }, // tablet
            0: { slidesPerView: 1 }, // mobile
          }}
        >
          {projects.map((project, idx) => (
            <SwiperSlide key={idx}>
              <div className="px-2">
                <div className="h-48 md:h-[250px] overflow-hidden rounded-md group">
                  <img
                    src={project.img.src}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="mt-2 text-md font-semibold text-center">
                  {project.title}
                </h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default FeaturedProjects;
