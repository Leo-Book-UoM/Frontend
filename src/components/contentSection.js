"use client";

import React, { useState } from 'react';

const ContentSection = ({ title, children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="bg-white shadow rounded-lg mb-6">
      <div 
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <h2 className="text-lg font-bold">{title}</h2>
        <button className="text-blue-600">{isCollapsed ? 'Expand' : 'Collapse all'}</button>
      </div>
      {!isCollapsed && <div className="p-4">{children}</div>}
    </div>
  );
};

export default ContentSection;
