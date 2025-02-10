import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const CreateTaskForm = ({
  newEvent,
  setIsFormVisible,
  setNewEvent,
  isEditMode,
  projectId,
  editTaskId,
  setTimelineEvents,
  setIsEditMode,
  setEditTaskId,
  timelineEvents,
  setCurrentTask,
}) => {
  const [loading, setLoading] = useState(false);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding leading zero
    const day = date.getDate().toString().padStart(2, '0'); // Adding leading zero
  
    return `${year}-${month}-${day}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    if (!newEvent.date || !newEvent.title || !newEvent.description || !newEvent.group) {
      alert('Please fill in all required fields.');
      return;
    }
  
    setLoading(true);
    try {
      if (isEditMode) {
        const response = await fetch(
          `http://localhost:5000/api/editTask/${projectId}/${editTaskId}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              taskName: newEvent.title,
              taskDescription: newEvent.description,
              taskDate: newEvent.date,
              markAsDone: newEvent.isDone ? 1 : 0,
              taskCatagory: newEvent.group,
            }),
          }
        );
  
        if (!response.ok) throw new Error('Failed to update task');
        const updatedTask = await response.json();
  
        setIsEditMode(false);
        setEditTaskId(null);
  
        // Update the timeline and current task
        const updatedTasks = timelineEvents.map((task) =>
          task.id === editTaskId
            ? { ...task, title: updatedTask.task.taskName, 
              description: updatedTask.task.taskDescription, 
              date: formatDateupdatedTask.task.taskDate, 
              group: updatedTask.task.taskCatagory }
            : task
        );
  
        setTimelineEvents(updatedTasks);
  
        const today = new Date();
        const current = updatedTasks
          .filter((task) => !task.isDone && new Date(task.date) >= today)
          .sort((a, b) => new Date(a.date) - new Date(b.date))[0];
  
        setCurrentTask(current);
  
      } else {
        const response = await fetch('http://localhost:5000/api/addtask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            projectId,
            taskName: newEvent.title,
            taskDescription: newEvent.description,
            taskDate: newEvent.date,
            markAsDone: 0,
            taskCatagory: newEvent.group,
          }),
        });

        if (!response.ok) throw new Error('Failed to create task');
        const result = await response.json();

        const addedTask = {
          id: result.task.taskId,
          projectId: result.task.projectId,
          date: result.task.taskDate,
          title: result.task.taskName,
          description: result.task.taskDescription,
          group: result.task.taskCatagory,
          isDone: 0,
        };

        setTimelineEvents((prev) => [...prev, addedTask]);

        if (setCurrentTask) {
          const today = new Date();
          const current = [...timelineEvents, addedTask]
            .filter((task) => !task.isDone && new Date(task.date) >= today)
            .sort((a, b) => new Date(a.date) - new Date(b.date))[0];
          setCurrentTask(current);
        }
      }

      setNewEvent({ date: '', title: '', description: '', group: '' });
      setIsFormVisible(false);
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">{isEditMode ? 'Edit Task' : 'Add New Task'}</h2>
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
              value={ newEvent.taskDate }
              onChange={handleInputChange}
              className="border rounded p-2 w-full"
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
              <option value="" disabled>Select Task Group</option>
              <option value="Project Planning">Project Planning</option>
              <option value="Reporting">Reporting</option>
              <option value="Meetings">Meetings</option>
              <option value="Treasuries">Treasuries</option>
            </select>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
              disabled={loading}
            >
              {loading ? 'Saving...' : isEditMode ? 'Update Task' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskForm;
