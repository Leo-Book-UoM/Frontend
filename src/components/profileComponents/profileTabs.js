import Link from 'next/link';
import React, { useMemo } from 'react';

const ProfileTabs = ({ activeTab, setActiveTab }) => {
  const tabs = useMemo(() => ({
    profileDetails: "Profile Details",
    gmAttendance: "General Meeting Attendance",
    projectAttendance: "Project Attendance",
  }), []);

  return (
    <div className="bg-gray-900 text-white px-8 py-2 flex space-x-6 sticky top- -inset-6 z-50">
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

export default React.memo(ProfileTabs);
