import React from "react";
import { FaArrowUp, FaChartBar } from "react-icons/fa";

const PresidentCard = ({
  title = "",
  count = 0,
}) => {
  return (
    <div className="bg-gradient-to-r from-gray-700 to-indigo-900 p-6 rounded-xl shadow-lg w-full min-h-[150px] flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm uppercase text-gray-300 mb-1">{title}</p>
          <h2 className="text-white font-bold text-2xl">{count}</h2>
        </div>
        <div className="bg-white p-3 rounded-full shadow-md">
          <FaChartBar className="h-6 w-6 text-gray-800" />
        </div>
      </div>
      <p className="text-sm text-gray-300 mt-3">
        <span className="text-green-400 flex items-center">
          <FaArrowUp className="h-4 w-4 mr-1" /> 3.48%
        </span>
        <span className="ml-2">Since last month</span>
      </p>
    </div>
  );
};

export default PresidentCard;
