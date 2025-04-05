import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useRouter } from "next/navigation";
import "../../styles/calendar.css"; 


const SecretaryProjectStatusCard = ({
title = "", 
totalCount = 0, 
dates = [],
doneEventCount = 0,
}) => {
        const router = useRouter();
        const [selectedDate, setSelectedDate] = useState(null);
        const formattedDates = dates.map(date => new Date(date));
        const toDoEventCount = totalCount - doneEventCount;

  const handleCardClick = () => {
    router.push(`/secretaryReportingProjects`);
  };

  return (
    <div className="bg-gradient-to-r from-gray-700 to-indigo-900 p-6 pb-8 lg:pb-3 rounded-xl shadow-lg w-full min-h-[301px] flex flex-col justify-between"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      >
      <div className="flex justify-between  sm:flex-col md:flex-row">
        <div>
          <p className="text-sm uppercase text-gray-300 ">Total Event Count</p>
          <h2 className="text-white font-bold text-2xl">{totalCount}</h2>
          <div className="text-sm text-gray-300 mt-2">
      <span style={{color: "#80EF80"}}className="">Done Events</span>
        <span style={{ fontSize: "18px", color: "#80EF80", fontWeight:"bold" }}className={`flex items-center `}>
          <span className="pt-6" /> {doneEventCount}
        </span>
        <p className="text-sm text-gray-300 mt-4"></p>
        <span style={{color: "#FFCD56" }} className="">To do Events</span>
        <span style={{ fontSize: "18px" ,color: "#FFCD56", fontWeight:"bold"}}className={`flex items-center  `}>
          <span className="pt-6" /> {toDoEventCount}
        </span>
      </div>
        </div>
        <div className="col-span-1 xs:h-[20] xs:w-[20] sm:w-[80px]  sm:h-[80px] sd:w-[100px] sd:h-[100px] lg:w-[320px] lg:h-[200px] ">
          <h2  className="text-base  text-gray-300 mb-2">District Event Distribution</h2>
          <Calendar
          className='mt-4'
        value={selectedDate}
        showNavigation={false}
        tileClassName={({ date }) => {
          return formattedDates.some(d => d.toDateString() === date.toDateString())
            ? "highlight"
            : "";
        }}
      />
      {selectedDate && (
        <p>Selected Date: {selectedDate.toDateString()}</p>
      )}
        </div>
      </div>
    </div>
  );
};

export default SecretaryProjectStatusCard;