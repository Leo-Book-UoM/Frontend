import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend, } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PresidentTreasureDetailesCard = ({
  title = "",
  thisMonthTreasureDetailes,
  allMonthTreasureDetailes

}) => {
    if(!Array.isArray(allMonthTreasureDetailes) ||  allMonthTreasureDetailes.length === 0)
        return <p>Loarding chart...</p>

    const months = allMonthTreasureDetailes.map((item) => `${item.month_name}`);
    const parseMoney = (money) => parseFloat(money.replace(/[$,]/g, ""));
    const totalIncome = allMonthTreasureDetailes.map((item) => parseMoney(item.total_income, 10));
    const totalExpenses = allMonthTreasureDetailes.map((item) => parseMoney(item.total_expenses, 10));
    const totalCurrentAccets = allMonthTreasureDetailes.map((item) => parseMoney(item.total_current_accets, 10));

    const chartData = {
        labels: months,
        datasets: [
            {
                label: "Total Income",
                data: totalIncome,
                borderColor: "#4CAF50",
                backgroundColor: "rgba(76, 175, 80, 0.2)",
                pointBackgroundColor: "#4CAF50",
                borderWidth: 2,
                tension: 0.4,
            },
            {
                label: "Total Expenses",
                data: totalExpenses,
                borderColor: "#FF6384",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                pointBackgroundColor: "#FF6384",
                borderWidth: 2,
                tension: 0.4,
            },
            {
                label: "Total Current Assets",
                data: totalCurrentAccets,
                borderColor: "#FFCD56",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                pointBackgroundColor: "#FFCD56",
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
              text: "Amount (Rs)",
            },
            beginAtZero: true,
          },
        },
      };

  return (
    <div className="bg-gradient-to-r from-gray-700 to-indigo-900 p-6  rounded-xl shadow-lg w-full min-h-[150px] flex flex-col justify-between">
      <div className="flex justify-between  sm:flex-col md:flex-row">
        <div>
          <p style={{fontSize:'16px'}}className=" text-white mb-1">{title}</p>
          <div className="flex">
          <p style={{color:'#4CAF50'}} className="text-sm mt-2"> Rs. </p>
          <h2 style={{color:'#4CAF50'}}className=" font-bold text-xl lg:mb-3"> {thisMonthTreasureDetailes.total_income}</h2>
          </div>
          <p style={{fontSize:'15px'}}className="  text-white mb-1">Total Expenses</p>
          <div className="flex">
          <p style={{color:'#FF6384'}} className="text-sm mt-2"> Rs. </p>
          <h2 style={{color:'#FF6384'}}className=" font-bold text-xl lg:mb-3"> {thisMonthTreasureDetailes.total_expenses}</h2>
          </div>
          <p style={{fontSize:'16px'}}className="  text-white mb-1">Total Accets</p>
          <div className="flex">
          <p style={{color:'#FFCD56'}} className="text-sm mt-2"> Rs. </p>
          <h2 style={{color:'#FFCD56'}}className=" font-bold text-xl lg:mb-3"> {thisMonthTreasureDetailes.total_current_accets}</h2>
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

export default PresidentTreasureDetailesCard;