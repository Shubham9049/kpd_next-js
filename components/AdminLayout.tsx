"use client";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import logo from "../assets/logo.png";
import {
  Building,
  Gauge,
  Handshake,
  NotebookPen,
  UserPlus,
  Users,
} from "lucide-react";
import Image from "next/image";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { icon: <Gauge />, label: "Dashboard", to: "/admin" },
    // { icon: <NotebookPen />, label: "Blogs", to: "/admin/blogs" },
    { icon: <UserPlus />, label: "Subscribers", to: "/admin/subscribers" },
    { icon: <Users />, label: "Leads", to: "/admin/leads" },
    { icon: <NotebookPen />, label: "Blogs", to: "/admin/blogs" },
    { icon: <Building />, label: "Properties", to: "/admin/properties" },
    { icon: <Handshake />, label: "Sell Requests", to: "/admin/sell-requests" },
  ];

  return (
    <div className="h-screen flex flex-col lg:flex-row overflow-hidden bg-black text-white font-raleway relative">
      {/* Mobile Top Nav */}
      <div className="lg:hidden bg-[#111] flex items-center justify-between px-4 py-3 shadow-md">
        <a href="/admin">
          <Image src={logo} alt="logo" className="h-10 w-auto" />
        </a>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-white text-xl"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Slide-out Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-0 left-0 w-full h-full bg-[#111] z-50 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <Image src={logo} alt="logo" className="h-12" />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-white text-2xl"
            >
              <FaTimes />
            </button>
          </div>
          <nav className="flex flex-col gap-4 text-base">
            {navItems.map(({ icon, label, to }) => (
              <Link
                key={to}
                href={to}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded ${
                  location.pathname === to
                    ? "bg-[var(--primary-color)] text-black font-semibold"
                    : "hover:bg-[var(--primary-color)] hover:text-black"
                }`}
              >
                {icon} {label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-[#111] shadow-md p-4 space-y-4 fixed h-full">
        <a href="/admin">
          <Image src={logo} alt="logo" className="h-20 w-auto mx-auto mb-2" />
        </a>
        <nav className="flex flex-col gap-2 text-sm overflow-y-auto">
          {navItems.map(({ icon, label, to }) => (
            <NavItem
              key={to}
              icon={icon}
              label={label}
              to={to}
              active={pathname === to}
            />
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 overflow-y-auto p-4 sm:p-6 pb-20 lg:pb-6 h-full">
        {children}
      </main>
    </div>
  );
}

const NavItem = ({
  icon,
  label,
  to,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
}) => (
  <Link
    href={to}
    className={`flex items-center gap-2 px-3 py-2 rounded whitespace-nowrap ${
      active
        ? "bg-[var(--primary-color)] text-black font-semibold"
        : "hover:bg-[var(--primary-color)] hover:text-black"
    }`}
  >
    {icon} {label}
  </Link>
);
