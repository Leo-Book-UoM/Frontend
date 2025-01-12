"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';
import ProjectTabs from '../../../../components/projectTabs';
import ContentSection from '../../../../components/contentSection';
import AnnouncementCard from '../../../../components/announcementCard';
import MainLayout from '@/app/mainlayout';
import TimeLine from '@/components/timeline';

const CoursePage = () => {
  const searchParams = useSearchParams();
  const courseParams = decodeURIComponent(searchParams.get('title')) || 'Course Details';
  const image = decodeURIComponent(searchParams.get('image')) || '/default-image.jpg';

  return (
    <MainLayout>
    <div className="bg-gray-900 min-h-screen">
      <ProjectTabs />

      <div className="max-w-5xl mx-auto py-8">
        <h1 className="text-3xl text-blue-600 font-bold mb-6">{courseParams}</h1>
        <img src={image} alt={courseParams} className="w-full h-64 object-cover rounded mb-4" />
        <ContentSection title="General">
          <AnnouncementCard
            title="Announcements"
            description="Check out the latest updates for this course."
            color="border-red-500"
          />
          <AnnouncementCard
            title="Student Feedback - Mid Semester"
            description="Provide your feedback on the course progress."
            color="border-green-500"
          />
          <AnnouncementCard
            title="Zoom Link to Tutorial on 16/10/2024"
            description="Join the session via the provided link."
            color="border-blue-500"
          />
        </ContentSection>
        <TimeLine/>
      </div>
    </div>
    </MainLayout>
  );
};

export default CoursePage;
