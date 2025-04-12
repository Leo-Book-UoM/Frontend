"use client";
import React, { useEffect, useState } from "react";
import DirectorLayout from "@/components/layout/directorLayout";
import ProjectCard from "../../components/projectCard";
import AddItemButton from "../../components/addItemButton";
import CreateGeneralMeetingForm from "../../components/generalMeetingCreateForm";
import { useRouter } from "next/navigation";


const HomePage = () => {
  const [generalMeeting, setGeneralMeeting] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const router = useRouter();

  const fetchGeneralMeetings = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/upcommingMeetings");
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      const data = await response.json();
      setGeneralMeeting(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchGeneralMeetings();
  }, []);

  const handleGeneralMeetingAdded = async () => {
    setIsFormVisible(false);
    await fetchGeneralMeetings();
  }

  const handleCardClick = (generalMeeting) => {
    router.push(`/generalMeetingContent?title=${encodeURIComponent(generalMeeting.meetingName)}&image=${encodeURIComponent(generalMeeting.image)}&generalMeetingId=${encodeURIComponent(generalMeeting.meetingId)}`
    );
  };

  return (
    <DirectorLayout>
      <div className="bg-gray-900 min-h-screen text-gray-200 m-0">
        <main className="max-w-5xl mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6">General Meetings</h1>

          {/* Meeting Cards Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
            {generalMeeting.length === 0? (
              <div className="col-span-full text-center text-gray-400 text-lg mt-10">
                No General Meetings yet.
              </div>
            ) : (
            generalMeeting.map((generalMeeting, index) => (
                <ProjectCard
                  key={index}
                  title={generalMeeting.meetingName}
                  image={generalMeeting.image}
                  time={ generalMeeting.time.split("+")[0].slice(0, 5) }
                  venue={generalMeeting.location}
                  date={ new Date(generalMeeting.date).toISOString().split("T")[0] }
                  projectId={generalMeeting.meetingId}
                  handleCardClick={() => handleCardClick(generalMeeting)}
                />
            ))
          )}
          </div>
        </main>
      </div>
    </DirectorLayout>
  );
};

export default HomePage;
