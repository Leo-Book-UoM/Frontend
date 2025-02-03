import React, { useState, useEffect } from 'react';
import {
  FaCalendarAlt,
  FaTasks,
  FaChartBar,
  FaUsers,
  FaPiggyBank,
  FaPlus,
  FaCheckCircle,
  FaTimes,
  FaEdit,
  FaChevronUp,
  FaChevronDown
} from 'react-icons/fa';
import TaskCalendar from './taskCalender';
import CreateTaskForm from './taskCreationForm';
import AddItemButton from './addItemButton';

const EventTimeline = ({ projectId }) => {
  const [expandedEvents, setExpandedEvents] = useState([]);
  const [timelineEvents, setTimelineEvents] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
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
      if(isEditMode) {
        try{
          const response = await fetch (
            `http://localhost:5000/api/editTask/${projectId}/${editTaskId}`,
            {
              method: 'PUT',
              headers: {'content-Type' : 'application/json'},
              body: JSON.stringify({
                taskName: newEvent.title,
                taskDescription: newEvent.description,
                taskDate: newEvent.date,
                markAsDone: newEvent.isDone ? 1 : 0,
                taskCatagory: newEvent.group,
              })
            }
          );
          if(response.ok) {
            setTimelineEvents((prev) => 
              prev.map((task) => 
                task.id === editTaskId
            ? {...task, ...newEvent, id: editTaskId, isDone: task.isDone } : task
              )
            );
            setIsEditMode(false);
            setEditTaskId(null);
            setNewEvent({ date: '', title: '', description: '', group: '' });
            setIsFormVisible(false);
          }else{
            console.error('Failed to update task:', await response.json());
          }
        }catch(err) {
          console.error('Error updating task:', err);
        }
      } else{
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
          const addedTask = {
            id: result.task.taskId,
            date: result.task.taskDate,
            title: result.task.taskName,
            description: result.task.taskDescription,
            group: result.task.taskCatagory,
            isDone: result.task.markAsDone,
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
        }
      } catch (err) {
        console.error('Error connecting to backend:', err);
      }
    }
  }
  };
  const handleEditTask = (task) => {
    setNewEvent({
      date: task.date,
      title: task.title,
      description: task.description,
      group: task.group,
    });
    setEditTaskId(task.id);
    setIsEditMode(true);
    setIsFormVisible(true);
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

  const handleDeleteTask = async (id) => {
    try{
      const response = await fetch(`http://localhost:5000/api/deleteTask/${projectId}/${id}`,{
        method: 'DELETE',
      });
      if (response.ok) {
        setTimelineEvents((prev) => prev.filter((task) => task.id !== id));
        console.log('Rask deleted successfully.');
      }else {
        console.error('Faild to delete task', await response.json());
      }
    }catch (err){
      console.error('Error deleting task:', err);
    }
  };
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {
      weekday: 'long', 
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    });
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
    const groupName = event.group || 'Ungrouped';
    if (!acc[groupName]) {
      acc[groupName] = [];
    }
    acc[groupName].push(event);
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
            <strong>{currentTask.title}</strong> - {formatDate(currentTask.date)}
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
                    key={`event-${event.id || `${eventIndex}-${formatDateevent.date}-${event.title}`}`}
                    className={`bg-gray-100 rounded-lg p-4 shadow ${
                      event.isDone ? 'opacity-50' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className={event.isDone ? 'line-through' : ''}>{event.title}</h3>
                        <p>{formatDate(event.date)}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                      <button onClick={() => toggleEvent(event.id)} className='ml-4'>
                        {expandedEvents.includes(event.id) ? <FaChevronUp/> : <FaChevronDown/>}
                      </button>
                      <button
                        onClick={() => toggleTaskDone(event.id)}
                        className="text-green-500 hover:text-green-600"
                      >
                        <FaCheckCircle size={20} />
                      </button>
                      <button
                        onClick={() => handleEditTask(event)}
                        className="text-blue-500 hover:text-blue-600"
                      >
                        <FaEdit size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteTask(event.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <FaTimes size={20} />
                      </button>
                    </div>
                    </div>
                    {expandedEvents.includes(event.id) && (
                      <div className='mt-2 bg-gray-200 p-3 rounded'>
                        <p className='text-gray-700'>{event.description}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <TaskCalendar tasks={timelineEvents} />

      {/* Add Task Button */}
      <AddItemButton onClick={() => setIsFormVisible(true)} />
      {/* Create Task Form */}
       {isFormVisible && (
        <CreateTaskForm
         newEvent={newEvent}
         handleInputChange={handleInputChange}
         handleFormSubmit={handleFormSubmit}
         setIsFormVisible={setIsFormVisible}
        />
      )}
    </div>
  );
};

export default EventTimeline;
