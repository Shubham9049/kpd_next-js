"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../../../components/Nav";
import Footer from "../../../../components/Footer";
import PopupForm from "../../../../components/PopUpForm";
import Image from "next/image";

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
          `${process.env.NEXT_PUBLIC_API_BASE}/blog/viewblog`
        );
        const blogList = res.data;
        const found = blogList.find((b) => b.slug === slug);

        if (!found) {
          setError("Blog not found");
          setBlog(null);
        } else {
          setBlog(found);

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
        <div className="w-12 h-12 border-4 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin mb-4" />
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
      {/* SEO Schema */}
      {Array.isArray(blog.schemaMarkup) &&
        blog.schemaMarkup.map((markup, idx) => (
          <script
            key={idx}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: markup }}
          />
        ))}

      <Navbar />

      {/* Blog Header Section */}
      <div className="w-11/12 md:w-5/6 mx-auto pt-[100px] md:pt-[140px] text-left">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-3">
          {blog.title}
        </h1>
        <p className="text-gray-500 text-sm md:text-base mb-6">
          By <span className="font-semibold text-gray-800">{blog.author}</span>{" "}
          • {new Date(blog.datePublished).toLocaleDateString()}
        </p>
      </div>

      {/* Full-width Feature Image */}
      <div className="relative w-11/12 md:w-5/6 mx-auto h-[300px] md:h-[500px] overflow-hidden rounded-xl">
        <Image
          src={blog.coverImage}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Blog Content Section */}
      <div className="w-11/12 md:w-5/6 mx-auto">
        {/* Blog Main Content */}

        <div
          className=" blog-content"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Related Blogs */}
        {relatedBlogs.length > 0 && (
          <aside className="lg:col-span-1 bg-gray-50 p-5 rounded-2xl shadow-sm h-fit">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 border-b border-gray-200 pb-2">
              Related Blogs
            </h2>
            <div className="space-y-5">
              {relatedBlogs.map((relBlog) => (
                <div
                  key={relBlog.slug}
                  onClick={() => router.push(`/blogs/${relBlog.slug}`)}
                  className="cursor-pointer group"
                >
                  <div className="overflow-hidden rounded-lg shadow-sm mb-2">
                    <img
                      src={relBlog.coverImage}
                      alt={relBlog.title}
                      className="w-full h-32 object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-base font-semibold text-gray-800 group-hover:text-[var(--primary-color)] transition-colors leading-snug line-clamp-2">
                    {relBlog.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(relBlog.datePublished).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </aside>
        )}
      </div>

      {/* CTA Section */}
      <section className="bg-[var(--primary-color)] text-white text-center py-16 px-6 mt-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Start Your Dream Project?
        </h2>
        <p className="max-w-2xl mx-auto mb-8 text-lg md:text-xl">
          Let’s bring your vision to life with our expert team. Get in touch
          today and take the first step toward your future.
        </p>
        <button
          onClick={() => setIsPopupOpen(true)}
          className="bg-white text-[var(--primary-color)] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Get Started
        </button>
      </section>

      {isPopupOpen && <PopupForm onClose={() => setIsPopupOpen(false)} />}
      <Footer />
    </div>
  );
};

export default BlogDetails;
