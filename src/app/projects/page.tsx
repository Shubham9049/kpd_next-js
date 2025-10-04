"use client";
import { useState } from "react";
import ContactSidebar from "../../../components/ContactSidebar";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Nav";
import PopupForm from "../../../components/PopUpForm";
import img1 from "../../../assets/IMG-20211025-WA0004 (1).jpg";
import img2 from "../../../assets/IMG-20211025-WA0005.jpg";
import img3 from "../../../assets/IMG-20211025-WA0006 (1).jpg";
import img4 from "../../../assets/J-3-10_Elevation_View_2nd_Option (1).jpg";
import Image from "next/image";

const projects = [
  {
    img: img1,
    title: "3, Sanjay Nagar, Gulabi Bagh",
  },
  {
    img: img2,
    title: "4, Sanjay Nagar, Gulabi Bagh",
  },
  {
    img: img3,
    title: "P-3/15, DLF-II",
  },
  {
    img: img4,
    title: "J-3/10, DLF-II",
  },
];

function Projects() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  return (
    <div>
      <Navbar />

      {/* Page Header */}
      <section className=" py-12 mt-28 text-center text-black">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--primary-color)] mb-6 font-amatic border-l-4 border-[var(--primary-color)] pl-3">
          Our Projects
        </h1>
        <p className="mt-2 text-lg">Explore our exclusive developments</p>
      </section>

      {/* Projects Grid */}
      <section className="w-11/12 md:w-5/6 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className=" overflow-hidden">
                <Image
                  src={project.img}
                  alt={project.title}
                  className="w-full h-[380px] object-fill hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="text-md ">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="bg-[var(--primary-color)] text-white text-center py-10 px-4 mt-12">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Start Your Dream Project?
        </h2>
        <p className="max-w-2xl mx-auto mb-6 text-lg">
          Let’s bring your vision to life with our expert team. Get in touch
          today and take the first step toward your future.
        </p>
        <button
          onClick={() => setIsPopupOpen(true)}
          className="bg-white text-[var(--primary-color)] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Get Started
        </button>
      </div>
      {isPopupOpen && <PopupForm onClose={() => setIsPopupOpen(false)} />}
      <ContactSidebar />
      <Footer />
    </div>
  );
}

export default Projects;
