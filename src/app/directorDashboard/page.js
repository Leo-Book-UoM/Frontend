"use client";
import React, { useEffect, useState } from "react";
import DirectorLayout from '@/components/layout/directorLayout'
import ProjectCard from "../../components/projectCard";
import AddItemButton from "../../components/addItemButton";
import CreateProjectForm from "../../components/projectComponents/projectCreationForm";
import { useRouter } from "next/navigation";
import DisplayUserName from "@/components/displayUserName";
import AuthWrapper from "@/components/authWrapper";

const HomePage = () => {
  const [project, setProject] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const router = useRouter();

  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/projects");
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      const data = await response.json();
      setProject(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchMyProjects = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/myProjects/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      const data = await response.json();
      setProject(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleProjectAdded = async () => {
    setIsFormVisible(false);
    await fetchProjects();
  }

  const handleCardClick = (project) => {
    router.push(`/projectContent?title=${encodeURIComponent(project.projectname)}&image=${encodeURIComponent(project.image)}&projectId=${encodeURIComponent(project.projectId)}`
    );
  };

  return (
    <AuthWrapper>
      {(userName) => (
    <DirectorLayout>
        <main className="max-w-6xl mx-auto py-8">
           <DisplayUserName userName={userName} />

          {/* Filter Section */}
          <div className="mb-8 flex space-x-4 mt-8">
            <select className="bg-gray-800 border border-gray-700 text-gray-200 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500">
              <option>Past</option>
              <option>Ongoing</option>
            </select>
            <input
              type="text"
              placeholder="Search by project name"
              className="bg-gray-800 border border-gray-700 text-gray-200 rounded p-2 w-full focus:outline-none focus:ring focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Search by director position"
              className="bg-gray-800 border border-gray-700 text-gray-200 rounded p-2 w-full focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          {/* Course Cards Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
            {project.map((project, index) => {
              return (
                <ProjectCard
                  key={index}
                  title={project.projectname}
                  image={project.image}
                  time={ project.time.split("+")[0].slice(0, 5) }
                  venue={project.venue}
                  date={ new Date(project.date).toISOString().split("T")[0] }
                  projectId={project.projectId}
                  handleCardClick={() => handleCardClick(project)}
                />
              );
            })}
          </div>
          <AddItemButton onClick={() => setIsFormVisible(true)} />
        </main>
      {isFormVisible && (
        <CreateProjectForm 
        setIsFormVisible={setIsFormVisible}
        onProjectAdded = { handleProjectAdded}
         />
      )}
    </DirectorLayout>
      )}
    </AuthWrapper>
  );
};

export default HomePage;
