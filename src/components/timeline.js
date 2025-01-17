import React, { useState } from 'react';
import {
  FaChevronDown,
  FaChevronUp,
  FaCalendarAlt,
  FaTasks,
  FaChartBar,
  FaUsers,
  FaPiggyBank,
  FaPlus,
  FaTimes,
  FaCheckCircle,
} from 'react-icons/fa';

const EventTimeline = ({ projectId }) => {
  const [expandedEvents, setExpandedEvents] = useState([]);
  const [timelineEvents, setTimelineEvents] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newEvent, setNewEvent] = useState({
    date: '',
    title: '',
    description: '',
    group: '',
    isDone: false, // Added a property to track task completion
  });
  

  const toggleEvent = (id) => {
    setExpandedEvents((prev) =>
      prev.includes(id) ? prev.filter((eventId) => eventId !== id) : [...prev, id]
    );
  };

  const groupedEvents = timelineEvents.reduce((acc, event) => {
    if (!acc[event.group]) {
      acc[event.group] = [];
    }
    acc[event.group].push(event);
    return acc;
  }, {});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (newEvent.date && newEvent.title && newEvent.description && newEvent.group) {
      const newTask = {
        projectid: projectId,
        taskId: timelineEvents.length + 1,
        taskName: newEvent.title,
        taskDescription: newEvent.description,
        taskDate: newEvent.date,
        markAsDone: 0,
        taskCatagory: newEvent.group,
      };

      try {
        const response = await fetch('http://localhost:5000/api/addtask', {
          method: 'POST',
          headers: {
            'content-Type' : 'application/json',
          },
            body: JSON.stringify(newTask),
        });
        if (response.ok) {
          const result = await response.json();
          console.log('Task created:', result);
  
          // Update the frontend with the new task
          const iconMap = {
            'Project Planning': <FaTasks />,
            'Reporting': <FaChartBar />,
            'Meetings': <FaUsers />,
            'Treasuries': <FaPiggyBank />,
          };
  
          setTimelineEvents([
            ...timelineEvents,
            {
              id: result.task.taskId,
              date: result.task.taskDate,
              title: result.task.taskName,
              description: result.task.taskDescription,
              group: result.task.taskCatagory,
              isDone: result.task.markAsDone,
              icon: iconMap[result.task.taskCatagory] || <FaCalendarAlt />,
            },
          ]);
          setNewEvent({ date: '', title: '', description: '', group: '' });
          setIsFormVisible(false);
        } else {
          console.error('Failed to create task:', await response.json());
          alert('Error creating task. Please try again.');
        }
      } catch (err) {
        console.error('Error connecting to backend:', err);
        alert('Unable to connect to the server.');
      }
    }
  };

      

  const toggleTaskDone = (id) => {
    setTimelineEvents((prev) =>
      prev.map((event) =>
        event.id === id ? { ...event, isDone: !event.isDone } : event
      )
    );
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl text-blue-600 font-bold text-center mb-8">Project Timeline</h1>

      <div className="space-y-8">
        {Object.entries(groupedEvents).map(([group, events]) => (
          <div key={group} className="bg-gray-800 rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-blue-500">{group}</h2>
            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className={`bg-gray-100 rounded-lg p-4 shadow transition-all duration-300 hover:shadow-lg ${
                    event.isDone ? 'opacity-50' : ''
                  }`}
                >
                  <div className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className="text-blue-500 text-xl">{event.icon}</div>
                      <div>
                        <h3
                          className={`font-medium ${
                            event.isDone ? 'line-through text-gray-500' : ''
                          }`}
                        >
                          {event.title}
                        </h3>
                        <p
                          className={`text-sm ${
                            event.isDone ? 'line-through text-gray-400' : 'text-gray-500'
                          }`}
                        >
                          {event.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleTaskDone(event.id)}
                        className="text-green-500 hover:text-green-600 focus:outline-none"
                        title={event.isDone ? 'Mark as Undone' : 'Mark as Done'}
                      >
                        <FaCheckCircle size={20} />
                      </button>
                      <button
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        onClick={() => toggleEvent(event.id)}
                        aria-expanded={expandedEvents.includes(event.id)}
                        aria-label={
                          expandedEvents.includes(event.id)
                            ? 'Collapse event details'
                            : 'Expand event details'
                        }
                      >
                        {expandedEvents.includes(event.id) ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </button>
                    </div>
                  </div>
                  {expandedEvents.includes(event.id) && (
                    <div className="mt-4 text-gray-700 animate-fadeIn">
                      <p>{event.description}</p>
                      <a href="#" className="text-blue-500 hover:underline mt-2 inline-block">
                        Learn more
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Task Button */}
      <div className="fixed bottom-10 right-10">
        <button
          onClick={() => setIsFormVisible(true)}
          className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
          title="Add Task"
        >
          <FaPlus size={24} />
        </button>
      </div>

      {/* Modal */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Add New Task</h2>
              <button
                onClick={() => setIsFormVisible(false)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
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
      )}
    </div>
  );
};

export default EventTimeline;
