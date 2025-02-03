"use client";
import Layout from "../presidentlayout";
import AuthWrapper from "../../components/authWrapper";
import { Typewriter } from "react-simple-typewriter";
import PresidentCard from "../../components/presidentProjectTaskCard";
import { useState, useEffect } from "react";

const PresidentDashboard = () => {
  const [ongoingProjectCount, setOngoingProjectCount] = useState(0);
  const [projectTaskCount, setProjectTaskCount] = useState({});
  const [monthProjectCount, setMonthProjectCount] = useState({projectcount: "0"});
  const [monthlyProjectCont, setMonthlyProjectCount] = useState({});

  const fetchOngoingProjectCount = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/getProjectsCount/1");
      if (!response.ok) {
        throw new Error("Failed to fetch ongoing project count");
      }
      const data = await response.json();
      setOngoingProjectCount(data); 
    } catch (error) {
      console.error("Error fetching ongoing project count:", error);
    }
  };

  const fetchProjectTaskCount = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/getTasksDetails");
      if (!response.ok) {
        throw new Error("Failed to fetch project task count");
      }
      const data = await response.json();
      setProjectTaskCount(data)
    } catch (error) {
      console.error("Error fetching project task count:", error);
      setProjectTaskCount([]);
    }
  };

  const fetchMonthlyProjectCount = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/monthlyProjectCount");
      if(!response.ok){
        throw new Error("Failed to fetch month project count");
      }
      const data = await response.json();
      console.log(data);
      if (data && data.thisMonthCount){
        setMonthProjectCount(data.thisMonthCount);
      }
      setMonthlyProjectCount(data.allMonthCounts || {});
    } catch(error){
      console.error("Error fetching month project count:", error);
      setMonthlyProjectCount({});
      setMonthProjectCount({projectcount: "0"});
    }
  };

  useEffect(() => {
    fetchOngoingProjectCount();
    fetchProjectTaskCount();
    fetchMonthlyProjectCount();
  }, []);

  const combinedData = projectTaskCount ? {
    ...projectTaskCount,
    ongoingProjectCount    
  } : null;
  console.log("cbd:",monthProjectCount)

  return (
    <AuthWrapper>
      {(userName) => (
        <Layout>
          <main className="max-w-6xl mx-auto py-8">
            <h1 className="text-3xl font-bold text-indigo-600">
              <Typewriter words={[`Hi, ${userName}!`]} loop={1} typeSpeed={150} />
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {combinedData && (
                <PresidentCard
                  title="Ongoing Projects"
                  count={combinedData.ongoingProjectCount}
                  pendingTackCount={combinedData.pendingtasks}
                  totalTaskCount={combinedData.totaltasks}
                  timeOutTaskCount={combinedData.timeouttasks}
                /> 
              )}

              {monthProjectCount && monthlyProjectCont && (
                <PresidentCard
                  title="This Month's Projects"
                  count={monthProjectCount.projectcount}
                  pendingTackCount={monthlyProjectCont.projectcount}
                  totalTaskCount={combinedData.totaltasks}
                  timeOutTaskCount={combinedData.timeouttasks}
                /> 
              )}
            </div>
          </main>
        </Layout>
      )}
    </AuthWrapper>
  );
};

export default PresidentDashboard;