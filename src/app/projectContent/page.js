"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import ProjectTabs from "../../components/projectTabs";
import MainLayout from "@/app/mainlayout";
import EventTimeline from "@/components/timeline";
import ProjectContentImage from "@/components/projectContentImage";

const CoursePage = () => {
  const searchParams = useSearchParams();
  const courseParams = decodeURIComponent(searchParams.get("title")) || "Course Details";
  const image = decodeURIComponent(searchParams.get("image")) || "/default-image.jpg";
  const projectId = searchParams.get("projectId");

  return (
    <MainLayout>
      <div className="bg-gray-900 min-h-screen">
        <ProjectTabs projectId={projectId} />
        <div className="max-w-5xl mx-auto py-8">
            <ProjectContentImage courseParams={courseParams} image={image} />
          {<EventTimeline projectId={projectId} />  }
        </div>
      </div>
    </MainLayout>
  );
};

export default CoursePage;
