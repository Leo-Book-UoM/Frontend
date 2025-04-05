import React from "react";
import { FaArrowUp, FaChartBar } from "react-icons/fa";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useRouter } from "next/navigation";

ChartJS.register(ArcElement, Tooltip, Legend);

const SecretaryProjectStatusCard = ({
  title = "",
  totalMembership = 0,
  boardMemberCount = 0, 
  formerBordMembesCount = 0,
  newLeosCount = 0,
}) => {
 
  const router = useRouter();

  const pieChartData = {
    labels: ["Board Members" , "New Leos", "Former Board Members"],
    datasets: [
      {
      data: [ boardMemberCount, newLeosCount, formerBordMembesCount],
      backgroundColor: ["rgba(75, 192, 192)", "#FFCD56", "#80EF80"],
      borderColor: ["rgba(75, 192, 192)", "#FFCD56", "#80EF80"],
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
    router.push(`/secretaryReportingProjects`);
  };

  return (
    <div className="bg-gradient-to-r from-gray-700 to-indigo-900 p-6 pb-8 lg:pb-3 rounded-xl shadow-lg w-full min-h-[150px] flex flex-col justify-between"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      >
      <div className="flex justify-between  sm:flex-col md:flex-row">
        <div>
          <p className="text-sm uppercase text-gray-300 ">Total Membership</p>
          <h2 className="text-white font-bold text-2xl">{totalMembership}</h2>
          <div className="text-sm text-gray-300 mt-2">
      <div className="flex flex-col gap-1 mt-3">
      <span style={{color: "#80EF80"}}className="text-sm">Board Members</span>
        <span style={{ fontSize: "25px", color: "#80EF80", fontWeight:"bold" }}className={`flex items-center `}>
          <span className="pt-6" /> {boardMemberCount}
        </span>
        </div>
        <div className="flex flex-col gap-1 mt-3">
        <span style={{color: "#FFCD56"}} className="text-sm">New Leos</span>
        <span style={{ fontSize: "25px" ,color: "#FFCD56", fontWeight:"bold"}}className={`flex items-center  `}>
          <span className="pt-6" /> {newLeosCount}
        </span>
        </div>
        <div className="flex flex-col gap-1 mt-3">
        <span style={{color: "#FF6384"}} className="text-sm">Former Board Members</span>
        <span style={{ fontSize: "25px",color: "#FF6384", fontWeight:"bold" }}className={`flex items-center  `}>
          <span className="pt-6" /> {formerBordMembesCount}
        </span>
        </div>
      </div>
        </div>
        <div className="col-span-1 xs:h-[20] xs:w-[20] sm:w-[80px]  sm:h-[80px] sd:w-[100px] sd:h-[100px] lg:w-[120px] lg:h-[120px] ">
          <h2  className="text-base  text-gray-300 mb-2">Membership Distribution</h2>
            <Pie data={pieChartData} options={pieChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default SecretaryProjectStatusCard;