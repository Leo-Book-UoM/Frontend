import React from "react";
import { FaArrowUp, FaChartBar } from "react-icons/fa";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useRouter } from "next/navigation";

ChartJS.register(ArcElement, Tooltip, Legend);

const PresidentProjectAttributeCard = ({
  title = "",
  totalAttributeCount = 0,
  doneAttributeCount = 0,
}) => {
  const todoAttributeCount = totalAttributeCount > 0 ? (totalAttributeCount - doneAttributeCount) : 0;
  const router = useRouter();
  const pieChartData = {
    labels: [ "Todo Attributes", "doneAttributeCount"],
    datasets: [
      {
      data: [ todoAttributeCount, doneAttributeCount],
      backgroundColor: ["#FFCD56", "#4BC0C0", ],
      borderColor: ["#FFCD56", "#4BC0C0", ],
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
  const handleCardClick = () => {
    router.push(`/projectAttribute`);
  };

  return (
    <div className="bg-gradient-to-r from-gray-700 to-indigo-900 p-6 pb-8 lg:pb-12 rounded-xl shadow-lg w-full min-h-[150px] flex flex-col justify-between"
    onClick={handleCardClick}
      role="button"
      tabIndex={0}
      >
      <div className="flex justify-between  sm:flex-col md:flex-row">
        <div>
          <p className="text-sm uppercase text-gray-300 mb-1">{title}</p>
          <h2 className="text-white font-bold text-2xl">{totalAttributeCount}</h2>
          <p style={{ color: "#4BC0C0" }}className="text-sm mt-2">
      <span className="">Done Attributes </span>
        <span style={{ fontSize: "18px", color: "#4BC0C0" }}className={`flex items-center`}>
          <span className="pt-6" /> {doneAttributeCount}
        </span>
        </p>
        <p style={{color: "#FFCD56"}}className="text-sm mt-2">
        <span className="">Todo Attributes </span>
        <span style={{ fontSize: "18px", color: "#FFCD56"}}className={`flex items-center`}>
          <span className="pt-6" /> {todoAttributeCount}
        </span>
      </p>
        </div>
        <div className="col-span-1 xs:h-[20] xs:w-[20] sm:w-[80px]  sm:h-[80px] sd:w-[100px] sd:h-[100px] lg:w-[120px] lg:h-[120px] ">
          <h2 className="text-base  text-gray-300 mb-2">Attributes Distribution</h2>
            <Pie data={pieChartData} options={pieChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default PresidentProjectAttributeCard;