"use client";

import React, { useState, Suspense } from "react";
import MainLayout from "@/app/mainlayout";
import ProjectTabs from "@/components/projectTabs";
import ProjectContentImage from "@/components/projectContentImage";
import EventTimeline from "@/components/timeline";
import ProjectBudgetReport from "@/components/projectBudgetReport";
import ProjectReporting from "@/components/projectReporing";
import { useSearchParams } from "next/navigation";
import DirectorLayOut from "@/components/layout/directorLayout";

function ProjectContent() {
  const searchParams = useSearchParams();
  const courseParams = decodeURIComponent(searchParams.get("title")) || "Course Details";
  const image = decodeURIComponent(searchParams.get("image")) || "/default-image.jpg";
  const projectId = searchParams.get("projectId");

  const [activeTab, setActiveTab] = useState("projectContent");

  return (
    <DirectorLayOut>
      <div className="bg-gray-900 min-h-screen">
        <ProjectTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="max-w-5xl mx-auto py-4">
          <ProjectContentImage courseParams={courseParams} image={image} />

          {activeTab === "projectContent" && <EventTimeline projectId={projectId} />}
          {activeTab === "projectDocuments" && <ProjectReporting projectId={projectId} />}
          {activeTab === "projectTreasure" && <ProjectBudgetReport projectId={projectId} />}
        </div>
      </div>
    </DirectorLayOut>
  );
}

const ProjectContentPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectContent />
    </Suspense>
  );
};

export default ProjectContentPage;
