'use client'
import React, { useState, useEffect, useCallback } from "react";
import SideBar from "../components/sidebar";

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("sidebarState");
      if (savedState !== null) {
        setSidebarOpen(JSON.parse(savedState));
      }
    }
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => {
      const newState = !prev;
      localStorage.setItem("sidebarState", JSON.stringify(newState));
      return newState;
    });
  }, []);

  console.log("MainLayout re-rendered");

  return (
    <div className="flex h-screen">
      <SideBar isOpen={isSidebarOpen} setIsOpen={toggleSidebar} />
      <div
        className={`flex flex-col transition-all duration-700 bg-gray-900 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        } flex-1`}
      >
        <main className="flex-1 overflow-y-auto hide-scrollbar w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default React.memo(MainLayout);
