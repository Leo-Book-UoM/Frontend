import React, { useEffect, useState } from "react";

const ProjectAttributeHandle = ({ generalMeetingId }) => {
  const [projects, setProjects] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [selectedAttributes1, setSelectedAttributes1] = useState({});
  const [selectedAttributes2, setSelectedAttributes2] = useState({});

  const fetchProjectNames = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/getPreviousMonthProjectNames`);
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching project details:", error);
      setProjects([]);
    }
  };

  const fetchProjectAttributes = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/getAttributes`);
      if (!response.ok) {
        throw new Error("Failed to fetch project Attributes");
      }
      const data = await response.json();
      setAttributes(data);
      console.log("Fetched Attributes:", data); 
    } catch (error) {
      console.error("Error fetching attributes:", error);
      setAttributes([]);
    }
  };

  const handleAttributeChange = (projectId, selectedAttribute, isFirstAttribute) => {
    if (isFirstAttribute) {
      setSelectedAttributes1((prev) => ({
        ...prev,
        [projectId]: selectedAttribute,
      }));
    } else {
      setSelectedAttributes2((prev) => ({
        ...prev,
        [projectId]: selectedAttribute,
      }));
    }
  };

  useEffect(() => {
    fetchProjectNames();
    fetchProjectAttributes();
  }, []);

  return (
    <div className="rounded-2xl shadow-lg p-4">
      <h2 className="text-blue-700 text-2xl font-semibold mb-4">Monthly Project Summary</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-white bg-gray-600 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-800">
              <th className="px-6 py-3 text-center">Project</th>
              <th className="px-6 py-3 text-center">Attribute 1</th>
              <th className="px-6 py-3 text-center">Attribute 2</th>
            </tr>
          </thead>
          <tbody>
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <tr key={index} className="border-b border-gray-800">
                  <td className="px-6 py-3">{project.projectname || "N/A"}</td>
                  <td className="px-6 py-3">
                    <select
                      className="text-white bg-gray-800 p-2 rounded-md border border-gray-800"
                      value={selectedAttributes1[project.projectId] || ""}
                      onChange={(e) => handleAttributeChange(project.projectId, e.target.value, true)}
                    >
                      <option value="" disabled>
                        Select Attribute
                      </option>
                      {attributes.map((attribute, index) => (
                        <option key={index} value={attribute.attributeName}>
                          {attribute.attributeName}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-3">
                    <select
                      className="text-white bg-gray-800 p-2 rounded-md border border-gray-800"
                      value={selectedAttributes2[project.projectId] || ""}
                      onChange={(e) => handleAttributeChange(project.projectId, e.target.value, false)}
                    >
                      <option value="" disabled>
                        Select Attribute
                      </option>
                      {attributes.map((attribute, index) => (
                        <option key={index} value={attribute.attributeName}>
                          {attribute.attributeName}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-3 text-center">
                  No Data Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectAttributeHandle;
