"use client"
import SecretaryLayout from "@/components/layout/secrataryLayout";
import AuthWrapper from "@/components/authWrapper";
import React, { useEffect, useState } from "react";
import ProjectCard from "../../components/projectCard";
import { useRouter } from "next/navigation";

function page() {
    const [project, setProject] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const router = useRouter();
  
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/getLastMontProjects");
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

  return (
    <AuthWrapper>
        <SecretaryLayout>
        <div className="bg-gray-900 min-h-screen text-gray-200 m-0">
        <main className="max-w-5xl mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6">My Project</h1>

          {/* Filter Section */}
          <div className="mb-8 flex space-x-4">
            <select className="bg-gray-800 border border-gray-700 text-gray-200 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500">
              <option>Past</option>
              <option>Ongoing</option>
            </select>
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-800 border border-gray-700 text-gray-200 rounded p-2 w-full focus:outline-none focus:ring focus:ring-blue-500"
            />
            <select className="bg-gray-800 border border-gray-700 text-gray-200 rounded p-2 focus:outline-none focus:ring focus:ring-blue-500">
              <option>Sort by last accessed</option>
              <option>Sort by progress</option>
            </select>
            <button className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700 focus:outline-none">
              Card
            </button>
          </div>

          {/* Course Cards Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
            {project.map((project, index) => {
              return (
                <ProjectCard
                key={index}
                title={project.projectname}
                image={project.image}
                time={ project.time ? project.time.split("+")[0].slice(0, 5) : "N/A" }
                venue={project.venue || "N/A"}
                date={ project.date ? new Date(project.date).toISOString().split("T")[0] : "N/A" }
                projectId={project.projectId}
              />
              );
            })}
          </div>
        </main>
      </div>
        </SecretaryLayout>
    </AuthWrapper>
  )
}

export default page;