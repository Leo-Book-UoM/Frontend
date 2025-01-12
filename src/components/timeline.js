import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaCalendarAlt, FaUserFriends, FaTrophy } from 'react-icons/fa';

const EventTimeline = () => {
  const [expandedEvents, setExpandedEvents] = useState([]);

  const timelineEvents = [
    {
      id: 1,
      date: '2023-05-15',
      title: 'Company Anniversary Celebration',
      description: 'Join us for a day of festivities as we celebrate our company\'s 10th anniversary!',
      icon: <FaCalendarAlt />,
      group: 'Company Events'
    },
    {
      id: 2,
      date: '2023-06-01',
      title: 'New Product Launch',
      description: 'Exciting unveiling of our latest product line. Be the first to see it!',
      icon: <FaTrophy />,
      group: 'Product Launches'
    },
    {
      id: 3,
      date: '2023-06-15',
      title: 'Team Building Retreat',
      description: 'A fun-filled weekend of team-building activities and bonding.',
      icon: <FaUserFriends />,
      group: 'Company Events'
    },
    {
      id: 4,
      date: '2023-07-01',
      title: 'Q3 Planning Meeting',
      description: 'Strategic planning session for the upcoming quarter.',
      icon: <FaCalendarAlt />,
      group: 'Meetings'
    },
  ];

  const toggleEvent = (id) => {
    setExpandedEvents(prev =>
      prev.includes(id) ? prev.filter(eventId => eventId !== id) : [...prev, id]
    );
  };

  const groupedEvents = timelineEvents.reduce((acc, event) => {
    if (!acc[event.group]) {
      acc[event.group] = [];
    }
    acc[event.group].push(event);
    return acc;
  }, {});

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Event Timeline</h1>
      <div className="space-y-8">
        {Object.entries(groupedEvents).map(([group, events]) => (
          <div key={group} className="bg-gray-100 rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4">{group}</h2>
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="bg-white rounded-lg p-4 shadow transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleEvent(event.id)}>
                    <div className="flex items-center space-x-3">
                      <div className="text-blue-500 text-xl">{event.icon}</div>
                      <div>
                        <h3 className="font-medium">{event.title}</h3>
                        <p className="text-sm text-gray-500">{event.date}</p>
                      </div>
                    </div>
                    <button
                      className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
                      aria-expanded={expandedEvents.includes(event.id)}
                      aria-label={expandedEvents.includes(event.id) ? 'Collapse event details' : 'Expand event details'}
                    >
                      {expandedEvents.includes(event.id) ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                  </div>
                  {expandedEvents.includes(event.id) && (
                    <div className="mt-4 text-gray-700 animate-fadeIn">
                      <p>{event.description}</p>
                      <a href="#" className="text-blue-500 hover:underline mt-2 inline-block">Learn more</a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventTimeline;
