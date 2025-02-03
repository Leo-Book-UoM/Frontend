"use client";
import Layout from "../presidentlayout";
import AuthWrapper from "../../components/authWrapper";
import { Typewriter } from "react-simple-typewriter";
import PresidentCard from "../../components/presidentProjectTaskCard";
import { useState, useEffect } from "react";

const PresidentDashboard = () => {
  const [ongoingProjectCount, setOngoingProjectCount] = useState(0);
  const [projectTaskCount, setProjectTaskCount] = useState({}); // Initialize as an empty array

  const fetchOngoingProjectCount = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/getProjectsCount/1");
      if (!response.ok) {
        throw new Error("Failed to fetch ongoing project count");
      }
      const data = await response.json();
      console.log("Fetched Data:", data);
      setOngoingProjectCount(data); // Assuming the response is a single number
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
      console.log("Fetched Data:", data);
      setProjectTaskCount(data)
    } catch (error) {
      console.error("Error fetching project task count:", error);
      setProjectTaskCount([]);
    }
  };

  useEffect(() => {
    fetchOngoingProjectCount();
    fetchProjectTaskCount();
    console.log("balla",projectTaskCount)
  }, []);

  const combinedData = projectTaskCount ? {
    ...projectTaskCount,
    ongoingProjectCount    
  } : null;

  console.log("Combined Data:", combinedData);

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

              {combinedData && (
                <PresidentCard
                  title="Ongoing Projects"
                  count={combinedData.ongoingProjectCount}
                  pendingTackCount={combinedData.pendingtasks}
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