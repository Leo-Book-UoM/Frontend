"use client"
import React, { useState } from 'react'
import SecretaryLayout from '@/app/secrataryLayout'
import AuthWrapper from '@/components/authWrapper'
import DisplayUserName from '@/components/displayUserName'

function page() {
  const [projectSecretaryNotSubCount, setProjectSecretaryNotSubCount] = useState(0);
  const [clubSecretaryNotSubmitted, setClubSecretaryNotSubmitted] = useState(0);
  const [submittedToDistrict, setSubmittedToDistrict] = useState(0);
  const [lastMonthTotal, setLastMonthTotal] = useState(0);

  const fetchNotreportedProjectCount = async () => {
    try{
      const response = await fetch(`http://localhost:5000/api/getUnSubmittedReportsCountsToClub`);
      if(!response.ok){
        throw new Error('Faild to fetch club secratary and project secretary both are not submitted project count')
      }
      const data = await response.json();
      setProjectSecretaryNotSubCount(data);
    }catch(error){
      console.error("Error fetching club secratary and project secretary both are not submitted project count:", error);
      setProjectSecretaryNotSubCount(0);
    }
  }

  const fetchProjectCountToBeSubmitted = async () => {
    try{
      const response = await fetch(`http://localhost:5000/api/getSubmittedReportsCountsToClub`);
      if(!response.ok){
        throw new Error('Faild to fetch project secretary submitted but club secretary not submitted project count');
      }
      const data = await response.json(data);
      setClubSecretaryNotSubmitted(data);
    }catch(error){
      console.error("Error fetching project secretary submitted but club secretary not submitted project count:", error);
      setClubSecretaryNotSubmitted(0);
    }
  }

  const fetchSubmittedProjectCount = async () => {
    try{
      const response = await fetch(`http://localhost:5000/api/getSubmittedReportsCountsToDistrict`);
      if(!response.ok){
        throw new Error('Faild to fetch club secretary submitted project count')
      }
      const data = await response.json(data);
      setSubmittedToDistrict(data);
    }catch(error){
      console.error("Error fetching club secretary submitted project count:", error);
      setSubmittedToDistrict(0);
    }
  }

  const fetchLastMonthTotal = async () => {
    try{
      const response = await fetch(`http://localhost:5000/api/getProjectCountsAtPreviousMonth`);
      if(!response.ok){
        throw new Error('Faild to fetch last month project count')
      }
      const data = await response.json(data);
      setLastMonthTotal(data);
    }catch(error){
      console.error("Error fetching last month project count:", error);
      setLastMonthTotal(0);
    }
  }
  return (
    <AuthWrapper>
      {(userName) => (
        <SecretaryLayout>
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

        </div>
        </main>
        </SecretaryLayout>
      )}
    </AuthWrapper>
)};

export default page