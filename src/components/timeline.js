import React, { useState, useEffect } from 'react';
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
import TaskCalendar from './taskCalender';

const EventTimeline = ({ projectId }) => {
  const [expandedEvents, setExpandedEvents] = useState([]);
  const [timelineEvents, setTimelineEvents] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newEvent, setNewEvent] = useState({
    date: '',
    title: '',
    description: '',
    group: '',
    isDone: false,
  });

  const toggleEvent = (id) => {
    setExpandedEvents((prev) =>
      prev.includes(id) ? prev.filter((eventId) => eventId !== id) : [...prev, id]
    );
  };

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
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTask),
        });

        if (response.ok) {
          const result = await response.json();
          const iconMap = {
            'Project Planning': <FaTasks />,
            Reporting: <FaChartBar />,
            Meetings: <FaUsers />,
            Treasuries: <FaPiggyBank />,
          };

          const addedTask = {
            id: result.task.taskId,
            date: result.task.taskDate,
            title: result.task.taskName,
            description: result.task.taskDescription,
            group: result.task.taskCatagory,
            isDone: result.task.markAsDone,
            icon: iconMap[result.task.taskCatagory] || <FaCalendarAlt />,
          };

          // Add new task and update the timeline
          const updatedTimeline = [...timelineEvents, addedTask];
          setTimelineEvents(updatedTimeline);

          // Recalculate current task
          const today = new Date();
          const current = updatedTimeline
            .filter((task) => !task.isDone && new Date(task.date) >= today)
            .sort((a, b) => new Date(a.date) - new Date(b.date))[0];
          setCurrentTask(current);

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
    const updatedTasks = timelineEvents.map((event) =>
      event.id === id ? { ...event, isDone: !event.isDone } : event
    );
    setTimelineEvents(updatedTasks);

    // Recalculate current task
    const today = new Date();
    const current = updatedTasks
      .filter((task) => !task.isDone && new Date(task.date) >= today)
      .sort((a, b) => new Date(a.date) - new Date(b.date))[0];
    setCurrentTask(current);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/gettasks/${projectId}`);
        if (response.ok) {
          const data = await response.json();

          // Ensure all tasks have a unique key and handle null categories
          const sanitizedTasks = data.tasks.map((task, index) => ({
            id: task.taskId || `${task.taskName}-${index}`,
            date: task.taskDate,
            title: task.taskName,
            description: task.taskDescription,
            group: task.taskCatagory || 'Ungrouped',
            isDone: task.markAsDone === '1',
          }));

          setTimelineEvents(sanitizedTasks);

          // Determine the current task
          const today = new Date();
          const current = sanitizedTasks
            .filter((task) => !task.isDone && new Date(task.date) >= today)
            .sort((a, b) => new Date(a.date) - new Date(b.date))[0];
          setCurrentTask(current);
        } else {
          //console.error('Failed to fetch tasks:', await response.json());
        }
      } catch (err) {
        console.error('Error fetching tasks:', err);
      }
    };
    fetchTasks();
  }, [projectId]);

  const groupedEvents = timelineEvents.reduce((acc, event) => {
    const groupName = event.group || 'Ungrouped'; // Fallback for undefined groups
    if (!acc[groupName]) {
      acc[groupName] = [];
    }
    acc[groupName].push(event);
  
    // Sort the tasks within the group by their date (ascending)
    acc[groupName].sort((a, b) => new Date(a.date) - new Date(b.date));
  
    return acc;
  }, {});

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl text-blue-600 font-bold text-center mb-8">Project Timeline</h1>

      {currentTask && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
          <h2 className="font-bold">Current Task:</h2>
          <p>
            <strong>{currentTask.title}</strong> - {currentTask.date}
          </p>
          <p>{currentTask.description}</p>
        </div>
      )}

      <div className="space-y-8">
          {Object.entries(groupedEvents).map(([group, events], index) => (
            <div key={`group-${group}-${index}`} className="bg-gray-800 rounded-lg p-6 shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-blue-500">{group}</h2>
              <div className="space-y-4">
                {events.map((event, eventIndex) => (
                  <div
                    key={`event-${event.id || `${eventIndex}-${event.date}-${event.title}`}`}
                    className={`bg-gray-100 rounded-lg p-4 shadow ${
                      event.isDone ? 'opacity-50' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className={event.isDone ? 'line-through' : ''}>{event.title}</h3>
                        <p>{event.date}</p>
                      </div>
                      <button
                        onClick={() => toggleTaskDone(event.id)}
                        className="text-green-500 hover:text-green-600"
                      >
                        <FaCheckCircle size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <TaskCalendar tasks={timelineEvents} />

      {/* Add Task Button */}
      <div className="fixed bottom-10 right-10">
        <button
          onClick={() => setIsFormVisible(true)}
          className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600"
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
      )}
    </div>
  );
};

export default EventTimeline;
