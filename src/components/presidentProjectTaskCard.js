import React from "react";
import { FaArrowUp, FaChartBar } from "react-icons/fa";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";


ChartJS.register(ArcElement, Tooltip, Legend);

const PresidentCard = ({
  title = "",
  count = 0,
  pendingTaskCount = 0,
  totalTaskCount = 0,
  timeOutTaskCount = 0,

}) => {
  const doneTaskCount = totalTaskCount - (pendingTaskCount + timeOutTaskCount);
  const doneTaskPercentage =totalTaskCount > 0 ? (doneTaskCount  / totalTaskCount) * 100 : 0;
  const timeOutTaskPresentage = totalTaskCount > 0 ? (timeOutTaskCount / totalTaskCount) * 100 : 0;
  const pendingTaskPresentage = totalTaskCount > 0 ? (pendingTaskCount / totalTaskCount) * 100 : 0;

  const pieChartData = {
    labels: ["Delayed Task" , "Pending Tasks", "Done Tasks"],
    datasets: [
      {
      data: [timeOutTaskPresentage, pendingTaskPresentage, doneTaskPercentage],
      backgroundColor: ["#FF6384", "#FFCD56", "#4BC0C0"],
      borderColor: ["#FF6384", "#FFCD56", "#4BC0C0"],
      borderWidth: 1,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "none", 
      },
      tooltip: {
        enabled: true,
      },
    },
  maintainAspectRatio: true, 
  cutout: "60%"
  };

  let percentageColorClass = "";
  if(doneTaskPercentage <= 40){
    percentageColorClass ="text-red-400";
  }else if (doneTaskPercentage <= 70){
    percentageColorClass ="text-yellow-400";
  } else {
    percentageColorClass = "text-green-400";
  }

  return (
    <div className="bg-gradient-to-r from-gray-700 to-indigo-900 p-6 pb-8 lg:pb-12 rounded-xl shadow-lg w-full min-h-[150px] flex flex-col justify-between">
      <div className="flex justify-between  sm:flex-col md:flex-row">
        <div>
          <p className="text-sm uppercase text-gray-300 mb-1">{title}</p>
          <h2 className="text-white font-bold text-2xl">{count}</h2>
          <p className="text-sm text-gray-300 mt-5">
      <span className="">Done Status</span>
        <span className={`flex items-center ${percentageColorClass}`}>
          <span className="" /> {doneTaskPercentage.toFixed(2)}%
        </span>
      </p>
        </div>
        <div className="col-span-1 xs:h-[20] xs:w-[20] sm:w-[80px]  sm:h-[80px] sd:w-[100px] sd:h-[100px] lg:w-[120px] lg:h-[120px] ">
          <h2 className="text-base  text-gray-300 mb-2">Task Distribution</h2>
            <Pie data={pieChartData} options={pieChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default PresidentCard;