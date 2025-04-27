"use client";
import React, { useEffect, useState } from "react";
import DirectorLayout from '@/components/layout/directorLayout'
import ProjectCard from "../../components/projectCard";
import AddItemButton from "../../components/addItemButton";
import CreateProjectForm from "../../components/projectComponents/projectCreationForm";
import { useRouter } from "next/navigation";
import { Typewriter } from "react-simple-typewriter";
import AuthWrapper from "@/components/authWrapper";

const HomePage = () => {
  const [project, setProject] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  const fetchMyProjects = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/getUserProjects/${userId}`);

      if (response.status === 404 || response.status === 204) {
        console.log("No projects found for this user.");
        setProject([]);
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await response.json();
      if (Array.isArray(data) && data.length === 0) {
        console.log("No projects available.");
      }

      setProject(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProject([]);
    }
  };

  useEffect(() => {
    const storedUserId = sessionStorage.getItem("userId");
    setUserId(storedUserId);

    if (storedUserId) {
      fetchMyProjects(storedUserId);
    }
  }, []);

  const handleProjectAdded = async () => {
    setIsFormVisible(false);
    if (userId) {
      await fetchMyProjects(userId);
    }
  };

  const handleCardClick = (project) => {
    router.push(
      `/projectContent?title=${encodeURIComponent(project.projectname)}&image=${encodeURIComponent(project.image)}&projectId=${encodeURIComponent(project.projectId)}`
    );
  };

  return (
    <AuthWrapper>
      {(userName) => (
        <DirectorLayout>
          <main className="max-w-6xl mx-auto py-8">
            <h1 className='text-3xl font-bold text-indigo-600'>
              <Typewriter words={[` ${userName}'s Work`]} loop={1} typeSpeed={150} />
            </h1>

            {/* Project Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
              {project.length === 0 ? (
                <div className="col-span-full text-center text-gray-400 text-lg mt-10">
                  No projects yet. Start by creating one!
                </div>
              ) : (
                project.map((project, index) => (
                  <ProjectCard
                    key={index}
                    title={project.projectname}
                    image={project.image}
                    time={project.time.split("+")[0].slice(0, 5)}
                    venue={project.venue}
                    date={new Date(project.date).toISOString().split("T")[0]}
                    projectId={project.projectId}
                    handleCardClick={() => handleCardClick(project)}
                  />
                ))
              )}
            </div>
            <AddItemButton onClick={() => setIsFormVisible(true)} />
          </main>
          {isFormVisible && (
            <CreateProjectForm
              setIsFormVisible={setIsFormVisible}
              onProjectAdded={handleProjectAdded}
            />
          )}
        </DirectorLayout>
      )}
    </AuthWrapper>
  );
};

export default HomePage;
