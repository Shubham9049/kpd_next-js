"use client";
import { JSX, useEffect, useState } from "react";
import { FaBook, FaUserPlus, FaUser, FaBuilding } from "react-icons/fa";

const GRADIENTS = [
  "from-indigo-500 via-purple-500 to-pink-500",
  "from-sky-500 via-blue-500 to-indigo-600",
  "from-emerald-400 via-teal-500 to-cyan-600",
  "from-yellow-400 via-orange-500 to-red-500",
  "from-pink-400 via-rose-500 to-red-600",
  "from-lime-400 via-green-500 to-emerald-600",
  "from-violet-400 via-fuchsia-500 to-pink-600",
  "from-rose-400 via-fuchsia-500 to-indigo-600",
];

const Dashboard = () => {
  const [counts, setCounts] = useState({
    leads: 0,
    subscribers: 0,
    blogs: 0,
    properties: 0,
  });

  useEffect(() => {
    Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/lead/all`).then((r) =>
        r.json()
      ),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE}/subscribers`).then((r) =>
        r.json()
      ),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE}/blog/viewblog`).then((r) =>
        r.json()
      ),
      fetch(`${process.env.NEXT_PUBLIC_API_BASE}/property`).then((r) =>
        r.json()
      ),
    ])
      .then(([leads, subscribers, blogs, properties]) => {
        setCounts({
          leads: Array.isArray(leads) ? leads.length : 0,
          subscribers: Array.isArray(subscribers) ? subscribers.length : 0,
          blogs: Array.isArray(blogs) ? blogs.length : 0,
          properties: Array.isArray(properties) ? properties.length : 0,
        });
      })
      .catch((error) => {
        console.error("Error loading dashboard data:", error);
      });
  }, []);

  const cards = [
    { title: "Leads", icon: <FaUser />, count: counts.leads },
    { title: "Subscriber", icon: <FaUserPlus />, count: counts.subscribers },
    { title: "Blogs", icon: <FaBook />, count: counts.blogs },
    { title: "Properties", icon: <FaBuilding />, count: counts.properties },
  ];

  return (
    <section className="px-4 py-8 space-y-10">
      <h2 className="text-2xl font-bold text-center">Admin Dashboard</h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 justify-items-center">
        {cards.map((card, idx) => (
          <StatCard
            key={card.title}
            {...card}
            gradient={GRADIENTS[idx % GRADIENTS.length]}
          />
        ))}
      </div>
    </section>
  );
};

const StatCard = ({
  title,
  icon,
  count,
  gradient,
}: {
  title: string;
  icon: JSX.Element;
  count: number;
  gradient: string;
}) => (
  <div
    className={`w-full max-w-sm rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-white bg-gradient-to-br ${gradient}`}
  >
    <div className="text-4xl mb-3">{icon}</div>
    <h3 className="text-lg font-semibold mb-1 text-center">{title}</h3>
    <p className="text-3xl font-bold">{count}</p>
  </div>
);

export default Dashboard;
