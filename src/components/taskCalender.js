import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import styles

const TaskCalendar = ({ tasks }) => {
  // Extract task dates and format them
  const taskDates = tasks.map((task) => new Date(task.date).toDateString());

  // Highlight task dates
  const isTaskDate = (date) =>
    taskDates.includes(date.toDateString());

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-md mt-8">
      <h2 className="text-xl font-semibold mb-4 text-blue-500">Task Calendar</h2>
      <Calendar
        tileContent={({ date, view }) =>
          isTaskDate(date) && view === 'month' ? (
            <div className="bg-blue-500 text-white rounded-full p-1 text-xs">
              Task
            </div>
          ) : null
        }
        tileClassName={({ date, view }) =>
          isTaskDate(date) && view === 'month' ? 'highlight' : null
        }
      />
    </div>
  );
};

export default TaskCalendar;
