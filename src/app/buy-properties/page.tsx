"use client";
import { useRef, useState, useEffect } from "react";
import { MapPin, Home } from "lucide-react";
import banner from "../../../assets/4ee2091d-c684-402b-86ec-0b82632e1d50.jpeg";
import Navbar from "../../../components/Nav";
import Footer from "../../../components/Footer";
import { motion } from "framer-motion";
import PopupForm from "../../../components/PopUpForm";
import Image from "next/image";

interface Property {
  _id: string;
  title: string;
  slug: string;
  type?: string;
  location?: string;
  price?: number | null;
  images: string[];
  purpose?: string;
}

export default function BuyPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const buyRef = useRef<HTMLDivElement | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 9;

  // Fetch properties from backend
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/property`)
      .then((res) => res.json())
      .then((data) => {
        const buyProperties = data.filter(
          (p: Property) => p.purpose?.toLowerCase() === "buy"
        );
        setProperties(buyProperties);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Apply filter (all buy properties)
  const filtered = properties;

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / propertiesPerPage);
  const startIdx = (currentPage - 1) * propertiesPerPage;
  const paginatedProperties = filtered.slice(
    startIdx,
    startIdx + propertiesPerPage
  );

  const scrollToNext = () => {
    if (buyRef.current) {
      const yOffset = -50;
      const y =
        buyRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Generate page numbers (with ellipsis)
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 3; // show 3 around current

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > maxVisible + 1) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - maxVisible) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="mt-20">
        <Navbar />
      </div>

      {/* Hero Section */}
      <div className="relative h-[70vh] bg-black text-white flex items-center justify-center px-3">
        <Image
          src={banner}
          alt="Buy Property"
          className="absolute inset-0 w-full h-full object-cover opacity-70 blur-sm"
          width={200}
          height={100}
        />
        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-widest">
            Buy Your Dream Property
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
            Explore premium homes, apartments, and investment opportunities.
            Find the perfect place to call your own today.
          </p>
          <button
            onClick={scrollToNext}
            className="mt-10 animate-bounce border rounded-full w-fit px-1 py-2 mx-auto cursor-pointer"
          >
            <span className="text-3xl">↓</span>
          </button>
        </motion.div>
      </div>

      {/* Property List */}
      <div ref={buyRef} className="py-12">
        {loading ? (
          <p className="text-center py-20 text-gray-500">
            Loading properties...
          </p>
        ) : paginatedProperties.length === 0 ? (
          <div className="text-center py-20 text-gray-500 col-span-full tracking-widest">
            <h2 className="text-2xl font-semibold mb-2">
              No properties available
            </h2>
          </div>
        ) : (
          <>
            <motion.div
              className="w-11/12 md:w-5/6 mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 tracking-widest"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.2 },
                },
              }}
            >
              {paginatedProperties.map((p) => (
                <motion.div
                  key={p._id}
                  className="overflow-hidden shadow-md hover:shadow-xl transition bg-white"
                  variants={{
                    hidden: { opacity: 0, scale: 0.9, y: 30 },
                    visible: { opacity: 1, scale: 1, y: 0 },
                  }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Image */}
                  <a href={`/buy/${p.slug}`}>
                    <div className="relative h-64 w-full">
                      {p.images?.[0] ? (
                        <Image
                          src={p.images[0]}
                          alt={p.title}
                          className="object-cover w-full h-full"
                          width={200}
                          height={100}
                        />
                      ) : (
                        <div className="h-64 flex items-center justify-center bg-gray-100 text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>
                  </a>

                  {/* Info */}
                  <div className="p-4 bg-[var(--bg-color)]">
                    <h3 className="font-bold text-[var(--title)] text-lg line-clamp-1">
                      {p.title}
                    </h3>
                    {p.location && (
                      <p className="flex items-center text-[var(--primary-color)] text-sm mt-1">
                        <MapPin size={16} className="mr-1" /> {p.location}
                      </p>
                    )}
                    {p.price !== null && (
                      <p className="mt-1 font-semibold text-gray-800">
                        ₹ {p.price?.toLocaleString()}
                      </p>
                    )}
                    {p.type && (
                      <p className="mt-1 text-sm text-gray-600 flex items-center">
                        <Home size={16} className="mr-1" /> {p.type}
                      </p>
                    )}

                    <a
                      href={`/buy-properties/${p.slug}`}
                      className="inline-block bg-[var(--primary-color)] text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:scale-105 transition w-full text-center mt-5"
                    >
                      View Details
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && getPageNumbers().length > 0 && (
              <div className="flex justify-center items-center gap-2 mt-10">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="px-3 py-2 rounded border bg-white hover:bg-gray-100 disabled:opacity-50"
                >
                  Prev
                </button>

                {getPageNumbers().map((num, idx) =>
                  num === "..." ? (
                    <span key={idx} className="px-3 py-2">
                      ...
                    </span>
                  ) : (
                    <button
                      key={idx}
                      onClick={() => setCurrentPage(num as number)}
                      className={`px-3 py-2 rounded border ${
                        currentPage === num
                          ? "bg-[#E50E0B] text-white"
                          : "bg-white hover:bg-gray-100"
                      }`}
                    >
                      {num}
                    </button>
                  )
                )}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="px-3 py-2 rounded border bg-white hover:bg-gray-100 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

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
      <Footer />
    </div>
  );
}
