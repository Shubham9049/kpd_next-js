"use client";
import React, { useEffect, useRef, useState } from "react";

interface CountUpProps {
  end: number;
  duration?: number;
  startCounting: boolean;
}

const CountUp: React.FC<CountUpProps> = ({
  end,
  duration = 2000,
  startCounting,
}) => {
  const [count, setCount] = useState(0);
  const startTimestamp = useRef<number | null>(null);

  useEffect(() => {
    if (!startCounting) {
      setCount(0);
      startTimestamp.current = null;
      return;
    }

    const step = (timestamp: number) => {
      if (!startTimestamp.current) startTimestamp.current = timestamp;
      const progress = timestamp - startTimestamp.current;
      const progressRatio = Math.min(progress / duration, 1);
      setCount(Math.floor(progressRatio * end));
      if (progress < duration) {
        requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(step);

    return () => {
      startTimestamp.current = null;
    };
  }, [startCounting, end, duration]);

  return <>{count.toLocaleString()}</>;
};

const About: React.FC = () => {
  const metricsRef = useRef<HTMLDivElement | null>(null);
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    if (!metricsRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStartCount(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(metricsRef.current);
    return () => observer.disconnect();
  }, []);

  const metrics = [
    { label: "Properties Sold", value: 100 },
    { label: "Khalsa Team Members", value: 20 },
    { label: "Happy Customers", value: 2000 },
    { label: "Projects Completed", value: 65 },
  ];

  return (
    <section className="relative py-16 bg-gradient-to-r from-gray-50 via-white to-gray-100">
      <div className="w-11/12 md:w-5/6 mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <h2 className="uppercase tracking-widest text-gray-500 text-sm mb-2">
            About Us
          </h2>
          <h2 className="uppercase text-2xl md:text-3xl font-semibold text-[var(--primary-color)] mb-6 font-amatic border-l-4 border-[var(--primary-color)] pl-3">
            Khalsa Property Dealers
          </h2>

          <p className="text-md leading-relaxed mb-6 text-gray-700  text-justify">
            <strong>Khalsa Property Dealers</strong> is among the most trusted
            real estate firms in North Delhi. Operational in{" "}
            <strong> Gulabi Bagh, Sanjay Nagar </strong>
            since 2007. With 18+ years of experience and 3+ offices across Delhi
            NCR, we have built a legacy of delivering dream homes on time.
            <br />
            <br />
            We believe a home is more than just four walls. With over 65
            successful projects across India and a portfolio of 2,000+ valued
            clients, our footprint now extends to{" "}
            <strong> Goa, Gurugram and Dubai. </strong> We specialize in
            creating high-value investment opportunities designed to maximize
            returns in minimal time.
          </p>

          <a
            href="/about"
            className="inline-block bg-[var(--primary-color)] text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:scale-105 transition"
          >
            Learn More
          </a>
        </div>

        {/* Right Metrics */}
        <div ref={metricsRef} className="grid grid-cols-2 gap-6">
          {metrics.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md p-8 text-center transition"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-[var(--primary-color)] mb-2">
                <CountUp end={item.value} startCounting={startCount} />
                {item.value > 1000 ? "+" : "+"}
              </h3>
              <p className="text-base md:text-lg font-semibold text-gray-600 font-annie">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
