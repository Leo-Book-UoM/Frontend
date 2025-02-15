"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import GeneralMeetingTabs from "@/components/generalMeetingTabs";
import MainLayout from "@/app/mainlayout";
import ProjectContentImage from "@/components/projectContentImage";

const CoursePage = () => {
  const searchParams = useSearchParams();
  const courseParams = decodeURIComponent(searchParams.get("title")) || "Course Details";
  const image = decodeURIComponent(searchParams.get("image")) || "/default-image.jpg";
  const generalMeetingId = searchParams.get("generalMeetingId");

  return (
    <MainLayout>
      <div className="bg-gray-900 min-h-screen">
        <GeneralMeetingTabs/>
        <div className="max-w-5xl mx-auto py-8">
            <ProjectContentImage courseParams={courseParams} image={image} />
        </div>
      </div>
    </MainLayout>
  );
};

export default CoursePage;
