import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaHeart, FaLightbulb } from "react-icons/fa";
import { BsFillBoxFill } from "react-icons/bs";
import { SiFiles } from "react-icons/si";
import { GiFamilyTree } from "react-icons/gi";
import { IoSettings } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";
import Link from 'next/link';

const SideBar = ({ isOpen, setIsOpen }) => {
    const [showText, setShowText] = useState(false);

    // Auto-collapse sidebar on small screens
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setIsOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, [setIsOpen]);

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => setShowText(true), 300);
            return () => clearTimeout(timer);
        } else {
            setShowText(false);
        }
    }, [isOpen]);

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
                            src="https://my-portfolio-neon-zeta.vercel.app/static/media/profileImage.fd73f573600c742a5709.jpg"
                            alt="profile"
                            className={`${
                                isOpen ? "w-12 h-12 mb-0" : "w-10 h-10 mb-8"
                            } transition-transform duration-500 rounded-full border-2 border-blue-500`}
                        />
                        {isOpen && (
                            <div
                                className={`transition-all duration-700 delay-500 ${
                                    showText
                                        ? "opacity-100 ml-0"
                                        : "opacity-0 ml-[-50px]"
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
                            className={`transform ${
                                isOpen ? "" : "rotate-180"
                            } transition-transform`}
                        />
                    </button>

                    {/* Navigation Items */}
                    <div className="divide-y divide-gray-300">
                        <ul className="pt-2 pb-4 space-y-1 text-sm">
                            {renderNavItem(BsFillBoxFill, "Dashboard", "/prospectDashboard", isOpen, showText)}
                            {renderNavItem(SiFiles, "My Projects", "/my-projects", isOpen, showText)}
                            {renderNavItem(FaHeart, "Create New Project", "/modules/project/createProject", isOpen, showText)}
                            {renderNavItem(FaLightbulb, "Open Forum", "/forum", isOpen, showText)}
                            {renderNavItem(GiFamilyTree, "Leo Family", "/leo-family", isOpen, showText)}
                        </ul>
                        <ul className="pt-4 pb-2 space-y-1 text-sm">
                            {renderNavItem(IoSettings, "Settings", "/settings", isOpen, showText)}
                            {renderNavItem(RiLogoutCircleLine, "Logout", "/logout", isOpen, showText)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper function to render navigation items
const renderNavItem = (Icon, label, href, isOpen, showText) => (
    <li className="hover:text-blue-500">
        <Link href={href} className="flex items-center p-2 space-x-3 rounded-md">
            <Icon className="w-5 h-5" />
            {isOpen && (
                <span
                    className={`transition-all duration-500 delay-0 ${
                        showText ? "opacity-100 ml-0" : "opacity-0 ml-[-50px]"
                    }`}
                >
                    {label}
                </span>
            )}
        </Link>
    </li>
);


export default SideBar;
