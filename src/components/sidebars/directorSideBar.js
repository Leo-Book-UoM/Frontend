"use client";
import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
  FaArrowLeft, FaHeart, FaLightbulb, FaFolderOpen, FaHandsHelping,
} from "react-icons/fa";
import { BsFillBoxFill } from "react-icons/bs";
import { GiFamilyTree } from "react-icons/gi";
import { IoPersonAdd , IoFootsteps} from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";
import { MdCoPresent, MdGroups2 } from "react-icons/md";
import { LuBookMarked } from "react-icons/lu";
import Link from "next/link";
import AuthWrapper from "../authWrapper";
import { usePathname } from "next/navigation";

const SideBar = React.memo(({ isOpen, setIsOpen }) => {
  const [showText, setShowText] = useState(false);
  const resizeListener = useRef(null);
  const pathname = usePathname();

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

  const renderNavItem = useCallback(
    (Icon, label, href) => {
      const isActive = pathname.startsWith(href);
      return (
        <li key={label} className={`hover:text-blue-500 ${isActive ? "bg-blue-700 text-white rounded-md" : ""}`}>
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
      );
    },
    [isOpen, showText, pathname]
  );
  const userImage = sessionStorage.getItem("image");
  console.log("userImage from session:", userImage);

  return (
    <AuthWrapper>
      {(userName, userRole) => {
        const navItems = [
          { icon: BsFillBoxFill, label: "Dashboard", href: `/${userRole?.toLowerCase()}Dashboard` },
          { icon: FaFolderOpen, label: "My Projects", href: `/myProjects` },
          { icon: MdGroups2, label: "Meetings", href: "/meetings" },
          { icon: IoFootsteps, label: "Project Planing", href: "/projectPlaning" },
          { icon: FaHandsHelping, label: "Requests", href: "/requests" },
          { icon: IoPersonAdd, label: "Add Member", href: "/add-member" },
          { icon: FaLightbulb, label: "Project Ideas", href: "/project-ideas" },
          { icon: GiFamilyTree, label: "Leo Family", href: "/leo-family" },
        ];

        const settingsItems = [
          { icon: RiLogoutCircleLine, label: "Logout", href: "/logout" },
        ];
        return (
          <div className="flex">
            <div
              className={`fixed top-0 left-0 h-screen p-3 space-y-2 bg-gray-900 text-white border-r-2 border-blue-900 transition-all duration-700 ease-in-out ${
                isOpen ? "w-64" : "w-20"
              }`}
            >
              <div className="overflow-y-auto h-full">
                {/* Profile Section */}
                <div className="flex items-center p-2 space-x-4">
                <img
                  src={
                    userImage
                      ? userImage
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvpeEqDZn3rbSqRRIhJs35bhFu-HQt5U0T74L_Xhzdaq6VKLkZlNHSvnxxBLDuhLvSPVM&usqp=CAU"
                  }
                  alt="profile"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvpeEqDZn3rbSqRRIhJs35bhFu-HQt5U0T74L_Xhzdaq6VKLkZlNHSvnxxBLDuhLvSPVM&usqp=CAU";
                  }}
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
                      <h2 className="text-lg font-semibold text-blue-500">{userName}</h2>
                      <p className="text-sm text-blue-500">{userRole}</p>
                      <a href="/profile" className="text-xs hover:underline">
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
                  <FaArrowLeft className={`transform ${isOpen ? "" : "rotate-180"} transition-transform`} />
                </button>

                {/* Navigation Items */}
                <div className="divide-y divide-gray-300">
                  <ul className="pt-2 pb-4 space-y-1 text-sm">
                    {navItems.map(({ icon, label, href }) => renderNavItem(icon, label, href))}
                  </ul>
                  <ul className="pt-4 pb-2 space-y-1 text-sm">
                    {settingsItems.map(({ icon, label, href }) => renderNavItem(icon, label, href))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </AuthWrapper>
  );
});

export default SideBar;
