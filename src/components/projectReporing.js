import React from 'react'
import SubmitProjectReport from './projectReportSubmit'
import ViewProjectReport from './viewProjectReport'
import ProjectProposalCard from './projectProposalCard'

function projectReporing({ projectId }) {
    return (
      <>
      <div className="flex ">
            <ProjectProposalCard projectId={projectId} />
        </div>
      <div className="flex  ">
        <ViewProjectReport projectId={projectId} />
        <SubmitProjectReport projectId={projectId} />
        </div>

      </>
    );
  }
  
  export default projectReporing;
  