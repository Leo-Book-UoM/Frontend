import React from "react";
import { FaArrowUp, FaChartBar } from "react-icons/fa";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";


ChartJS.register(ArcElement, Tooltip, Legend);

const PresidentCard = ({
  title = "",
  totalCount = 0,
  reportedToClubSecretary = 0, 
  notReportedToClubSecretary = 0,
  submittedProjectsCount = 0,

}) => {
  const totalProjectCount =parseInt (totalCount);

  const pieChartData = {
    labels: ["Delayed Reports" , "To do Reports", "Submitted Reports"],
    datasets: [
      {
      data: [ notReportedToClubSecretary, reportedToClubSecretary, submittedProjectsCount],
      backgroundColor: ["#FF6384", "#FFCD56", "#80EF80"],
      borderColor: ["#FF6384", "#FFCD56", "#80EF80"],
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


  return (
    <div className="bg-gradient-to-r from-gray-700 to-indigo-900 p-6 pb-8 lg:pb-3 rounded-xl shadow-lg w-full min-h-[150px] flex flex-col justify-between">
      <div className="flex justify-between  sm:flex-col md:flex-row">
        <div>
          <p className="text-sm uppercase text-gray-300 ">Total Projects to report</p>
          <h2 className="text-white font-bold text-2xl">{totalProjectCount}</h2>
          <p className="text-sm text-gray-300 mt-2">
      <span style={{color: "#80EF80"}}className="">Submitted Reports</span>
        <span style={{ fontSize: "18px", color: "#80EF80", fontWeight:"bold" }}className={`flex items-center `}>
          <span className="pt-6" /> {submittedProjectsCount}
        </span>
        <span style={{color: "#FFCD56"}} className="">To do Reports</span>
        <span style={{ fontSize: "18px" ,color: "#FFCD56", fontWeight:"bold"}}className={`flex items-center  `}>
          <span className="pt-6" /> {reportedToClubSecretary}
        </span>
        <span style={{color: "#FF6384"}} className="">Delayed Reports</span>
        <span style={{ fontSize: "18px",color: "#FF6384", fontWeight:"bold" }}className={`flex items-center  `}>
          <span className="pt-6" /> {notReportedToClubSecretary}
        </span>
      </p>
        </div>
        <div className="col-span-1 xs:h-[20] xs:w-[20] sm:w-[80px]  sm:h-[80px] sd:w-[100px] sd:h-[100px] lg:w-[120px] lg:h-[120px] ">
          <h2  className="text-base  text-gray-300 mb-2">Reports Distribution</h2>
            <Pie data={pieChartData} options={pieChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default PresidentCard;