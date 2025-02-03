import React from 'react';
import { FaTimes } from 'react-icons/fa';

const CreateTaskForm = ({
  newEvent,
  handleInputChange,
  handleFormSubmit,
  setIsFormVisible,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Add New Task</h2>
          <button
            onClick={() => setIsFormVisible(false)}
            className="text-gray-500 hover:text-gray-700"
            title="Close"
          >
            <FaTimes size={20} />
          </button>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="date"
              name="date"
              value={newEvent.date}
              onChange={handleInputChange}
              className="border rounded p-2 w-full"
              placeholder="Due Date"
              required
            />
            <input
              type="text"
              name="title"
              value={newEvent.title}
              onChange={handleInputChange}
              className="border rounded p-2 w-full"
              placeholder="Task Title"
              required
            />
            <textarea
              name="description"
              value={newEvent.description}
              onChange={handleInputChange}
              className="border rounded p-2 w-full"
              placeholder="Description"
              rows="3"
              required
            />
            <select
              name="group"
              value={newEvent.group}
              onChange={handleInputChange}
              className="border rounded p-2 w-full"
              required
            >
              <option value="" disabled>
                Select Task Group
              </option>
              <option value="Project Planning">Project Planning</option>
              <option value="Reporting">Reporting</option>
              <option value="Meetings">Meetings</option>
              <option value="Treasuries">Treasuries</option>
            </select>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskForm;
