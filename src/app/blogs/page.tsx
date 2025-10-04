"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";
import Fuse from "fuse.js";
import PopupForm from "../../../components/PopUpForm";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  coverImage: string;
  author: string;
  datePublished: string;
}

const Blogs = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const blogsPerPage = 9;
  const router = useRouter();

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get<BlogPost[]>(
        `${process.env.NEXT_PUBLIC_API_BASE}/viewblog`
      );
      setBlogs(res.data);
      setFilteredBlogs(res.data);
      setCurrentPage(1);
    } catch (err) {
      console.error("Failed to fetch blogs", err);
      setBlogs([]);
      setFilteredBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredBlogs(blogs);
    } else {
      const fuse = new Fuse(blogs, {
        keys: ["title", "author"],
        threshold: 0.4,
      });
      const results = fuse.search(searchTerm).map((res) => res.item);
      setFilteredBlogs(results);
      setCurrentPage(1);
    }
  }, [searchTerm, blogs]);

  const indexOfLast = currentPage * blogsPerPage;
  const indexOfFirst = indexOfLast - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  return (
    <div className="min-h-screen bg-white text-black">
      <Nav />

      <div className="w-11/12 md:w-5/6 mx-auto flex flex-col md:flex-row gap-6 pt-[80px] md:pt-[128px]">
        {/* Blogs Section */}
        <div className="flex-1 h-[calc(100vh-120px)] overflow-y-auto no-scrollbar pr-4">
          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title or author"
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            />
          </div>

          {/* Blogs Grid */}
          {loading ? (
            <div className="flex flex-col justify-center items-center min-h-[50vh]">
              <div
                className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-2"
                role="status"
                aria-label="Loading"
              />
              <p className="text-gray-600 text-lg">Loading blogs...</p>
            </div>
          ) : currentBlogs.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">No blogs found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentBlogs.map((blog) => (
                <div
                  key={blog._id}
                  onClick={() => router.push(`/blogs/${blog.slug}`)}
                  className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
                >
                  <Image
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-48 md:h-56 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-lg md:text-xl font-semibold mb-1">
                      {blog.title}
                    </h2>
                    <p className="text-sm text-gray-500 mb-1">
                      {new Date(blog.datePublished).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-700">
                      By <strong>{blog.author}</strong>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 space-x-2 flex-wrap gap-2">
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${
                    currentPage === idx + 1
                      ? "bg-[var(--primary-color)] text-white border-[var(--primary-color)]"
                      : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Call-to-Action */}
      <div className="bg-[var(--primary-color)] text-white text-center py-12 px-4 mt-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Start Your Dream Project?
        </h2>
        <p className="max-w-2xl mx-auto mb-6 text-lg md:text-xl">
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
};

export default Blogs;
