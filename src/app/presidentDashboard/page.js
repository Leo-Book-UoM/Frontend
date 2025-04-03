"use client";
import Layout from "../presidentlayout";
import AuthWrapper from "../../components/authWrapper";
import PresidentCard from "../../components/presidentProjectTaskCard";
import PresidentMonthlyProjectCard from "@/components/presidentComponents/presidentMonthlyProjectCard";
import PresidentProjectAttributeCard from "@/components/presidentComponents/presidentProjectAttributeCard";
import PresidentTreasureDetailesCard from "@/components/presidentComponents/presidentTreasureDetailesCard";
import DisplayUserName from "@/components/displayUserName";
import { useState, useEffect } from "react";

const PresidentDashboard = () => {
  const [ongoingProjectCount, setOngoingProjectCount] = useState(0);
  const [projectTaskCount, setProjectTaskCount] = useState({});
  const [monthProjectCount, setMonthProjectCount] = useState({projectcount: "0"});
  const [monthlyProjectCont, setMonthlyProjectCount] = useState({});
  const [upcommingProjects, setUpcommingProjects] = useState(0);
  const [projectAttributeCount, setProjectAttributeCount] = useState({});
  const [currentMonthTreasures, setCurrentMonthTreasures] = useState({});
  const [allMonthTreasures, setAllMonthTreasures] = useState({});

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
      setUpcommingProjects(0);
    }
  };

  const fetchProjectTaskCount = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/getTasksDetails");
      if (!response.ok) {
        throw new Error("Failed to fetch project task count");
      }
      const data = await response.json();
      setProjectTaskCount(data.length > 0 ? data[0] : {});
    } catch (error) {
      console.error("Error fetching project task count:", error);
      setProjectTaskCount({});
    }
  };

  const fetchMonthlyProjectCount = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/monthlyProjectCount");
      if(!response.ok){
        throw new Error("Failed to fetch month project count");
      }
      const data = await response.json();
      setMonthProjectCount(data.thisMonthCount || { projectcount: "0" });
      setMonthlyProjectCount(Array.isArray(data.allMonthCounts) ? data.allMonthCounts : []);
    } catch(error){
      console.error("Error fetching month project count:", error);
      setMonthlyProjectCount({});
      setMonthProjectCount({projectcount: "0"});
    }
  };

  const fetchUpcommingProjectCount = async () => {
    try{
      const response = await fetch("http://localhost:5000/api/upcommingprojects");
      if(!response.ok){
        throw new Error("Failed to fetch upcomming project count");
      }
      const data = await response.json();
      setUpcommingProjects(data);
    }catch(error){
      console.error("Error fetching upcomming project count:", error);
      setUpcommingProjects(0);
    }
  };

  const fetchProjectAttributeCounts = async () => {
    try{
      const response = await fetch("http://localhost:5000/api/attributeCounts");
      if(!response.ok){
        throw new Error("Failed to fetch project attribute count");
      }
      const data = await response.json();
      setProjectAttributeCount(data);
    }catch(error){
      console.error("Error fetching project attribute count:", error);
      setProjectAttributeCount({});
    }
  };

  const fetchMonthlyTreasureDetailes = async () => {
    try{
      const response = await fetch("http://localhost:5000/api/getTreasureDetailes");
      if(!response.ok){
        throw new Error("Failed to fetch monthly treasure detailes");
      }
      const data = await response.json();
      try{
      setAllMonthTreasures(data.allMonthTreasures);
      setCurrentMonthTreasures(data.currentMonthTreasures);
      }catch (error){
        console.error("faild to set treasure detailes", error);
      }
    }catch(error){
      console.error("Error fetching treasure detailes:", error);
      setAllMonthTreasures({});
      setCurrentMonthTreasures({});
    }
  }

  useEffect(() => {
    fetchOngoingProjectCount();
    fetchProjectTaskCount();
    fetchMonthlyProjectCount();
    fetchUpcommingProjectCount();
    fetchProjectAttributeCounts();
    fetchMonthlyTreasureDetailes();
  }, []);

  const combinedData = projectTaskCount ? {
    ...projectTaskCount,
    ongoingProjectCount    
  } : null;
  // console.log("ppt",allMonthTreasures);
  // console.log(projectTaskCount.pendingTasks)
  // console.log(projectTaskCount.doneTasks)
  // console.log(projectTaskCount.timeoutTasks)
  return (
    <AuthWrapper>
      {(userName) => (
        <Layout>
          <main className="max-w-6xl mx-auto py-8">
            <DisplayUserName userName={userName} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {projectTaskCount && ongoingProjectCount &&(
                <PresidentCard
                  title="Ongoing Projects"
                  count={ongoingProjectCount}
                  pendingTackCount={projectTaskCount.pendingTasks}
                  doneTaskCount={projectTaskCount.doneTasks}
                  timeOutTaskCount={projectTaskCount.timeoutTasks}
                /> 
              )}

              {monthProjectCount && monthlyProjectCont && upcommingProjects && (
                <PresidentMonthlyProjectCard
                  title="This Month's Projects"
                  count={monthProjectCount.project_count}
                  data = {monthlyProjectCont}
                  upcommingProjectsCount = {upcommingProjects}
                /> 
              )}

              {projectAttributeCount && (
                <PresidentProjectAttributeCard
                  title="Total Attributes"
                  totalAttributeCount={projectAttributeCount.attribute_count}
                  doneAttributeCount={projectAttributeCount.done_attribute_count}
                /> 
              )}

              {allMonthTreasures && currentMonthTreasures && (
                <PresidentTreasureDetailesCard
                  title="Total Income"
                  thisMonthTreasureDetailes = {currentMonthTreasures}
                  allMonthTreasureDetailes = {allMonthTreasures}
                /> 
              )}
            </div>
          </main>
        </Layout>
      )
      }
    </AuthWrapper>
  );
};

export default PresidentDashboard;