
import React from 'react';
import { FaPlus } from 'react-icons/fa';

const AddTaskButton = ({ onClick }) => {
  return (
    <div className="fixed bottom-10 right-10">
      <button
        onClick={onClick}
        className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600"
        title="Add Task"
      >
        <FaPlus size={24} />
      </button>
    </div>
  );
};

export default AddTaskButton;
