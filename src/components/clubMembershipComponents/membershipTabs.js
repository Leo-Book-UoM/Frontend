import Link from 'next/link';
import React, { useMemo } from 'react';

const CourseTabs = ({ activeTab, setActiveTab }) => {
  const tabs = useMemo(() => ({
    projectContent: "Current Membership",
    projectDocuments: "Membership History",
    projectTreasure: "View Membership",
    projectITEditorial: "Graphical Representation",
  }), []);

  return (
    <div className="bg-gray-900 text-white px-8 py-5 flex space-x-6 sticky top-0 z-50">
      {Object.entries(tabs).map(([tab, label]) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`border-b-2 px-4 py-2 ${
            activeTab === tab ? "border-white" : "border-transparent hover:border-white"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default React.memo(CourseTabs);
