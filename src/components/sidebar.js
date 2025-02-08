import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { FaArrowLeft, FaHeart, FaLightbulb } from "react-icons/fa";
import { BsFillBoxFill } from "react-icons/bs";
import { SiFiles } from "react-icons/si";
import { GiFamilyTree } from "react-icons/gi";
import { IoSettings } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";
import Link from "next/link";

const SideBar = React.memo(({ isOpen, setIsOpen }) => {
  const [showText, setShowText] = useState(false);
  const resizeListener = useRef(null);

  // Auto-collapse sidebar on small screens
  useEffect(() => {
    resizeListener.current = () => {
      if (window.innerWidth <= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", resizeListener.current);
    resizeListener.current();
    return () => window.removeEventListener("resize", resizeListener.current);
  }, [setIsOpen]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setShowText(true), 300);
      return () => clearTimeout(timer);
    } else {
      setShowText(false);
    }
  }, [isOpen]);

  //console.log("Sidebar Rendered");

  const renderNavItem = useCallback(
    (Icon, label, href) => (
      <li key={label} className="hover:text-blue-500">
        <Link href={href} className="flex items-center p-2 space-x-3 rounded-md">
          <Icon className="w-5 h-5" />
          {isOpen && (
            <span
              className={`transition-all duration-500 ${
                showText ? "opacity-100 ml-0" : "opacity-0 ml-[-50px]"
              }`}
            >
              {label}
            </span>
          )}
        </Link>
      </li>
    ),
    [isOpen, showText]
  );

  const navItems = useMemo(
    () => [
      { icon: BsFillBoxFill, label: "Dashboard", href: "/prospectDashboard" },
      { icon: SiFiles, label: "My Projects", href: "/my-projects" },
      { icon: FaHeart, label: "Create New Project", href: "/modules/project/createProject" },
      { icon: FaLightbulb, label: "Open Forum", href: "/forum" },
      { icon: GiFamilyTree, label: "Leo Family", href: "/leo-family" },
    ],
    []
  );

  const settingsItems = useMemo(
    () => [
      { icon: IoSettings, label: "Settings", href: "/settings" },
      { icon: RiLogoutCircleLine, label: "Logout", href: "/logout" },
    ],
    []
  );

  return (
    <div className="flex">
      <div
        className={`fixed top-0 left-0 h-screen p-3 space-y-2 bg-gray-900 text-white border-r-2 border-blue-900 transition-all duration-700 ease-in-out ${
          isOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Scrollable Content */}
        <div className="overflow-y-auto h-full">
          {/* Profile Section */}
          <div className="flex items-center p-2 space-x-4">
          <img
  src={
    "https://my-portfolio-neon-zeta.vercel.app/static/media/profileImage.fd73f573600c742a5709.jpg" ||
    "/default-profile.png"
  }
  alt="profile"
  onError={(e) => (e.target.src = "/default-profile.png")}
  className={`${
    isOpen ? "w-12 h-12 mb-0" : "w-10 h-10 mb-8"
  } transition-transform duration-500 rounded-full border-2 border-blue-500`}
/>

            {isOpen && (
              <div
                className={`transition-all duration-700 ${
                  showText ? "opacity-100 ml-0" : "opacity-0 ml-[-50px]"
                }`}
              >
                <h2 className="text-lg font-semibold text-blue-500">
                  Prabhash Liyanage
                </h2>
                <a href="#" className="text-xs hover:underline">
                  View profile
                </a>
              </div>
            )}
          </div>

          {/* Collapse Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute top-24 -right-2.5 text-blue-900 bg-white rounded-full focus:outline-none"
          >
            <FaArrowLeft
              className={`transform ${isOpen ? "" : "rotate-180"} transition-transform`}
            />
          </button>

          {/* Navigation Items */}
          <div className="divide-y divide-gray-300">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              {navItems.map(({ icon, label, href }) =>
                renderNavItem(icon, label, href)
              )}
            </ul>
            <ul className="pt-4 pb-2 space-y-1 text-sm">
              {settingsItems.map(({ icon, label, href }) =>
                renderNavItem(icon, label, href)
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});

export default SideBar;
