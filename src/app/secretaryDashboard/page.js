"use client";
import React, { useEffect, useState } from "react";
import SecretaryLayout from "@/app/secrataryLayout";
import AuthWrapper from "@/components/authWrapper";
import DisplayUserName from "@/components/displayUserName";
import SecretaryProjectStatusCard from "@/components/secretaryProjectReportingStatusCard";
import PresidentProjectAttributeCard from "@/components/presidentProjectAttributeCard";
import PresidentMonthlyProjectCard from "@/components/presidentMonthlyProjectCard";

function Page() {
  const [projectReportStatus, setProjectReportStatus] = useState({
    notReportedToClubSecretary: "0",
    reportedToClubSecretary: "0",
    reportedToDistrict: "0",
    totalProjectsPreviousMonth: "5",
  });
  const [projectAttributeCount, setProjectAttributeCount] = useState({});
  const [monthlyProjectCont, setMonthlyProjectCount] = useState([]);
  const [monthProjectCount, setMonthProjectCount] = useState({ projectcount: "0" });
  const [upcommingProjects, setUpcommingProjects] = useState(0);

  const fetchProjectReportingStatus = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/getProjectReportingStatus`);
      if (!response.ok) throw new Error("Failed to fetch project reported status");

      const data = await response.json();
      setProjectReportStatus(data);
    } catch (error) {
      console.error("Error fetching project reported status:", error);
      setProjectReportStatus({});
    }
  };

  const fetchProjectAttributeCounts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/attributeCounts");
      if (!response.ok) throw new Error("Failed to fetch project attribute count");

      const data = await response.json();
      setProjectAttributeCount(data);
    } catch (error) {
      console.error("Error fetching project attribute count:", error);
      setProjectAttributeCount({});
    }
  };

  const fetchMonthlyProjectCount = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/monthlyProjectCount");
      if (!response.ok) throw new Error("Failed to fetch month project count");

      const data = await response.json();
      setMonthProjectCount(data.thisMonthCount || { projectcount: "0" });
      setMonthlyProjectCount(Array.isArray(data.allMonthCounts) ? data.allMonthCounts : []);
    } catch (error) {
      console.error("Error fetching month project count:", error);
      setMonthlyProjectCount([]);
      setMonthProjectCount({ projectcount: "0" });
    }
  };

  const fetchUpcommingProjectCount = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/upcommingprojects");
      if (!response.ok) throw new Error("Failed to fetch upcoming project count");

      const data = await response.json();
      setUpcommingProjects(data);
    } catch (error) {
      console.error("Error fetching upcoming project count:", error);
      setUpcommingProjects(0);
    }
  };

  useEffect(() => {
    fetchProjectReportingStatus();
    fetchProjectAttributeCounts();
    fetchMonthlyProjectCount();
    fetchUpcommingProjectCount();
  }, []);

  return (
    <AuthWrapper>
      {(userName) => (
        <SecretaryLayout>
          <main className="max-w-6xl mx-auto py-8">
            <DisplayUserName userName={userName} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {projectReportStatus && (
                <SecretaryProjectStatusCard
                  title="Reporting Status"
                  totalCount={projectReportStatus.totalProjectsPreviousMonth}
                  reportedToClubSecretary={projectReportStatus.reportedToClubSecretary}
                  notReportedToClubSecretary={projectReportStatus.notReportedToClubSecretary}
                  submittedProjectsCount={projectReportStatus.reportedToDistrict}
                />
              )}
              {monthProjectCount && monthlyProjectCont && upcommingProjects && (
                <PresidentMonthlyProjectCard
                  title="This Month's Projects"
                  count={monthProjectCount.project_count}
                  data={monthlyProjectCont}
                  upcommingProjectsCount={upcommingProjects}
                />
              )}
              {projectAttributeCount && (
                <PresidentProjectAttributeCard
                  title="Total Attributes"
                  totalAttributeCount={projectAttributeCount.attribute_count}
                  doneAttributeCount={projectAttributeCount.done_attribute_count}
                />
              )}
            </div>
          </main>
        </SecretaryLayout>
      )}
    </AuthWrapper>
  );
}

export default Page;
