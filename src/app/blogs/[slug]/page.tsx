"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../../../components/Nav";
import Footer from "../../../../components/Footer";
import PopupForm from "../../../../components/PopUpForm";

interface BlogType {
  title: string;
  excerpt: string;
  coverImage: string;
  author: string;
  datePublished: string;
  content: string;
  slug: string;
  category?: string;
  schemaMarkup?: string[];
}

interface BlogDetailsProps {
  params: { slug: string };
}

const BlogDetails: React.FC<BlogDetailsProps> = ({ params }) => {
  const { slug } = params;
  const router = useRouter();
  const [blog, setBlog] = useState<BlogType | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchBlog = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await axios.get<BlogType[]>(
          `${process.env.NEXT_PUBLIC_API_BASE}/viewblog`
        );
        const blogList = res.data;

        const found = blogList.find((b) => b.slug === slug);
        if (!found) {
          setError("Blog not found");
          setBlog(null);
        } else {
          setBlog(found);

          // Related blogs: same category, exclude current
          const related = blogList
            .filter(
              (b) =>
                b.slug !== slug &&
                b.category?.toLowerCase() === found.category?.toLowerCase()
            )
            .slice(0, 4);
          setRelatedBlogs(related);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch blog content");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-white">
        <div
          className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"
          role="status"
        />
        <p className="text-gray-600 text-lg">Loading blog content...</p>
      </div>
    );

  if (error)
    return (
      <div className="pt-40 text-center text-red-600 text-lg font-semibold">
        {error}
      </div>
    );

  if (!blog) return null;

  return (
    <div className="bg-white text-black min-h-screen">
      {/* JSON-LD schema */}
      {Array.isArray(blog.schemaMarkup) &&
        blog.schemaMarkup.map((markup, idx) => (
          <script
            key={idx}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: markup }}
          />
        ))}

      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-8 pt-[80px] md:pt-[128px]">
        {/* Blog Content */}
        <div className="w-full lg:w-3/4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>
          <p className="text-gray-600 mb-2 text-sm md:text-base">
            By <strong>{blog.author}</strong> -{" "}
            {new Date(blog.datePublished).toLocaleDateString()}
          </p>

          <img
            src={blog.coverImage}
            alt={`Cover for ${blog.title}`}
            className="mb-6 w-full rounded object-cover"
          />

          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>

        {/* Related Blogs */}
        {relatedBlogs.length > 0 && (
          <div className="w-full lg:w-1/4">
            <h2 className="text-2xl font-semibold mb-4">Related Blogs</h2>
            <div className="grid grid-cols-1 gap-4">
              {relatedBlogs.map((relBlog) => (
                <div
                  key={relBlog.slug}
                  className="border rounded-lg overflow-hidden shadow hover:shadow-lg cursor-pointer transition"
                  onClick={() => router.push(`/blogs/${relBlog.slug}`)}
                >
                  <img
                    src={relBlog.coverImage}
                    alt={relBlog.title}
                    className="w-full h-36 object-cover"
                  />
                  <div className="p-3">
                    <h3 className="text-lg font-semibold">{relBlog.title}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(relBlog.datePublished).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
};

export default BlogDetails;
