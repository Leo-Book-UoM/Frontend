import React from "react";
import DirectorSideBar from "../sidebars/directorSideBar";
import { useState } from "react";

const DirectorLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return(
    <div className="flex h-screen">
      <DirectorSideBar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />

      <div className={`flex flex-col flex-1 transition-all  duration-700  bg-gray-900 ${
        isSidebarOpen ? 'ml-64' : "ml-20"} flex-1`}>
        
        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DirectorLayout;