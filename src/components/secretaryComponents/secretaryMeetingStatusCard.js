"use client"; 

import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { useRouter } from "next/navigation"; 

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SecretaryMeetingParticipentsCard = ({
  title = "",
  count = 0,
  data,
  upcommingProjectsCount,
  month
}) => {
  
  const router = useRouter(); // Ensure this is inside the component

  if (!Array.isArray(data) || data.length === 0) return <p>Loading chart...</p>;

  const months = data.map((item) => `${item.month_name}`);
  const projectCounts = data.map((item) => parseInt(item.participant_count, 10));

  const chartData = {
    labels: months,
    datasets: [
      {
        label: "Project Count",
        data: projectCounts,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false, position: "top" },
      tooltip: { enabled: true },
    },
    scales: {
      x: { title: { display: false, text: "Months" } },
      y: { title: { display: false, text: "Project Count" }, beginAtZero: true },
    },
  };

  const doneProjectCount = count > 0 ? count - upcommingProjectsCount : 0;
  const doneProjectPercentage = count > 0 ? (doneProjectCount / count) * 100 : 0;

  let percentageColorClass = "";
  if (doneProjectPercentage <= 40) {
    percentageColorClass = "text-red-400";
  } else if (doneProjectPercentage <= 70) {
    percentageColorClass = "text-yellow-400";
  } else {
    percentageColorClass = "text-green-400";
  }

  const handleCardClick = () => {
    router.push(`/generalMeetings`);
  };

  return (
    <div
      className="bg-gradient-to-r from-gray-700 to-indigo-900 p-6 pb-8 lg:pb-20 rounded-xl shadow-lg w-full min-h-[150px] flex flex-col justify-between"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
    >
      <div className="flex justify-between sm:flex-col md:flex-row">
        <div>
          <p className="text-sm uppercase text-gray-300 mb-1">{title}</p>
          <h2 className="text-white font-bold text-2xl lg:mb-3">{count}</h2>
          <p className="text-sm text-gray-300 mt-5">
          </p>
        </div>
        <div className="col-span-1 xs:h-[20] xs:w-[20] sm:w-[300px] sm:h-[80px] sd:w-[100px] sd:h-[100px] lg:w-[350px] lg:h-[110px] ">
          <h2 className="text-base text-gray-300 mb-2 lg:ml-12 sm:ml-6">General Meeting Attendance Distribution</h2>
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default SecretaryMeetingParticipentsCard;
