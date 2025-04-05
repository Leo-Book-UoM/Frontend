import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend, } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PresidentMonthlyProjectCard = ({
  title = "",
  count = 0,
  data,
  upcommingProjectsCount,

}) => {
    if(!Array.isArray(data) ||  data.length === 0)
        return <p>Loarding chart...</p>

    const months = data.map((item) => `${item.month_name}`);
    const projectCounts = data.map((item) => parseInt(item.project_count, 10));

    const chartData = {
        labels: months,
        datasets: [
            {
                label: "Project Count",
                data: projectCounts,
                borderColor: "#FF6384",
                backgroundColor: "rgb(0, 0, 0)",
                pointBackgroundColor: "#FF6384",
                borderWidth: 2,
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
          legend: {
            display: false,
            position: "top",
          },
          tooltip: {
            enabled: true,
          },
        },
        scales: {
          x: {
            title: {
              display: false,
              text: "Months",
            },
          },
          y: {
            title: {
              display: false,
              text: "Project Count",
            },
            beginAtZero: true,
          },
        },
      };

const doneProjectCount = count > 0 ? (count - upcommingProjectsCount) : 0;
const doneProjectPresentage = count > 0 ? (doneProjectCount/count)*100 : 0;
  let percentageColorClass = "";
  if(doneProjectPresentage <= 40){
    percentageColorClass ="text-red-400";
  }else if (doneProjectPresentage <= 70 && doneProjectPresentage > 40 ){
    percentageColorClass ="text-yellow-400";
  } else {
    percentageColorClass = "text-green-400";
  }

  return (
    <div className="bg-gradient-to-r from-gray-700 to-indigo-900 p-6 pb-8 lg:pb-12 rounded-xl shadow-lg w-full min-h-[150px] flex flex-col justify-between">
      <div className="flex justify-between  sm:flex-col md:flex-row">
        <div>
          <p className="text-sm uppercase text-gray-300 mb-1">{title}</p>
          <h2 className="text-white font-bold text-2xl lg:mb-3">{count}</h2>
          <div className="text-sm text-gray-300 mt-5">
      <span className="">Upcoming Projects</span>
      <span style= {{ fontSize: "18px" }}  className={`flex items-center ${percentageColorClass}`}>
          <span className="pt-6" /> {upcommingProjectsCount}
        </span>
      </div>
        </div>
        <div className="col-span-1 xs:h-[20] xs:w-[20] sm:w-[300px]  sm:h-[80px] sd:w-[100px] sd:h-[100px] lg:w-[350px] lg:h-[110px] ">
          <h2 className="text-base  text-gray-300 mb-2 lg:ml-12 sm:ml-6">Project Distribution</h2>
            <Line data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default PresidentMonthlyProjectCard;