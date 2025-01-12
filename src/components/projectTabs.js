import React from 'react';

const CourseTabs = () => {
  return (
    <div className="bg-gray-900 text-white px-8 py-2 flex space-x-6">
      <a href="#" className="border-b-2 border-white">Course</a>
      <a href="#" className="hover:border-b-2 border-white">Participants</a>
      <a href="#" className="hover:border-b-2 border-white">Grades</a>
      <a href="#" className="hover:border-b-2 border-white">Competencies</a>
    </div>
  );
};

export default CourseTabs;
