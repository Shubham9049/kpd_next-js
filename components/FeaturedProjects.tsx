"use client";
import React from "react";
import Slider, { CustomArrowProps } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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

// Custom Arrow component
const Arrow: React.FC<CustomArrowProps & { direction: "left" | "right" }> = ({
  onClick,
  direction,
}) => (
  <button
    onClick={onClick}
    className={`absolute top-1/2 -translate-y-1/2 z-10 text-[var(--primary-color)] text-3xl md:text-5xl ${
      direction === "left" ? "-left-5" : "-right-5"
    } hover:text-gray-700 transition-colors`}
  >
    {direction === "left" ? "←" : "→"}
  </button>
);

const FeaturedProjects: React.FC = () => {
  const NextArrow = (props: CustomArrowProps) => (
    <Arrow {...props} direction="right" />
  );
  const PrevArrow = (props: CustomArrowProps) => (
    <Arrow {...props} direction="left" />
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="py-10">
      <div className="w-11/12 md:w-5/6 mx-auto">
        {/* Title */}
        <div className="mb-8">
          <p className="uppercase tracking-widest text-gray-500 text-md">
            Projects
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-[var(--primary-color)] mb-6 font-amatic border-l-4 border-[var(--primary-color)] pl-3">
            DELIVERED PROJECTS
          </h2>
        </div>

        {/* Slider aligned with title */}
        <div className="pl-3">
          <Slider {...settings} className="-mx-3">
            {projects.map((project, idx) => (
              <div key={idx} className="px-3">
                <div className="aspect-[4/5] overflow-hidden rounded-md group">
                  <img
                    src={project.img.src}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="mt-4 text-md font-semibold text-center">
                  {project.title}
                </h3>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
