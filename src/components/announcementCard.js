import React from 'react';

const AnnouncementCard = ({ title, description, color }) => {
  return (
    <div className={`flex items-center bg-white shadow rounded-lg p-4 mb-4 border-l-4 ${color}`}>
      <div className="w-10 h-10 mr-4 flex items-center justify-center bg-gray-200 rounded-full">
        <i className="fas fa-comment text-xl"></i>
      </div>
      <div>
        <h3 className="text-lg font-bold">{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default AnnouncementCard;