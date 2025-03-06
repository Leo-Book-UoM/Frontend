"use client";
import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import MainLayout from "@/app/mainlayout";
import ProjectContentImage from "@/components/projectContentImage";
import GeneralMeetingTabs from "@/components/generalMeetingTabs";
import OfficerAttendanceReport from "@/components/officerAttendance";

const CoursePageContent = () => {
  const searchParams = useSearchParams();
  const courseParams = decodeURIComponent(searchParams.get("title")) || "Course Details";
  const image = decodeURIComponent(searchParams.get("image")) || "/default-image.jpg";
  const meetingId = searchParams.get("generalMeetingId");

  const [activeTab, setActiveTab] = useState("generalMeetingContent");

  return (
    <MainLayout>
      <div className="bg-gray-900 min-h-screen">
        <GeneralMeetingTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="max-w-5xl mx-auto py-8">
          <ProjectContentImage courseParams={courseParams} image={image} />

          {activeTab === "generalMeetingOverView" && <EventTimeline projectId={meetingId} />}
          {activeTab === "generalMeetingAttendance" && <OfficerAttendanceReport generalMeetingId={meetingId} />}
        </div>
      </div>
    </MainLayout>
  );
};

const CoursePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CoursePageContent />
    </Suspense>
  );
};

export default CoursePage;
