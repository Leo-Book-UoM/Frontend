import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Select, MenuItem, Button } from "@mui/material";
import SettedLastMonthProjectAttributes from './MonthlyProjectAttributeTable';

const ProjectAttributeHandle = () => {
  const [projects, setProjects] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [selectedAttributes1, setSelectedAttributes1] = useState({});
  const [selectedAttributes2, setSelectedAttributes2] = useState({});
  const [viewAssignedAttributes, setViewAssignedAttributes] = useState(false);

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
    } catch (error) {
      console.error("Error fetching attributes:", error);
      setAttributes([]);
    }
  };

  const confirmAttributeSelection = async (projectId) => {
    const selected1 = selectedAttributes1[projectId] || null;
    const selected2 = selectedAttributes2[projectId] || null;

    if (!selected1 && !selected2) {
      alert("Place select at least one attribute before confirming.");
      return;
    }

    const payload = {
      projectId: projectId,
      attributeIds: [selected1, selected2].filter(Boolean)
    };
    console.log("Sending payload:", payload);

    try {
      const response = await fetch(`http://localhost:5000/api/markAttribute`, {
        method: "POST",
        headers: {"Content-Type" : "application/json" },
        body: JSON.stringify({
          "projectId": projectId,
          "attributeIds": [selected1, selected2].filter(Boolean),
        }),
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error("Failed to confirm attributes");
      }
      alert("Attribute confirmed successfully!");
      setProjects(prevProjects => prevProjects.filter(project => project.projectId !== projectId));
    }catch (error) {
      console.error("Error confirming attributes:", error);
      alert("Failed to confirm attributes.");
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

  const handleViewAssignedAttributesClick = () => {
    setViewAssignedAttributes((prev) => !prev);
  }

  useEffect(() => {
    fetchProjectNames();
    fetchProjectAttributes();
  }, [fetchProjectNames]);

  return (
    <Paper sx={{ padding: 3, borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h5" color="primary" gutterBottom>
        Monthly Project Summary
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Project</TableCell>
              <TableCell align="center">Attribute 1</TableCell>
              <TableCell align="center">Attribute 2</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{project.projectname || "N/A"}</TableCell>
                  <TableCell align="center">
                    <Select
                      value={selectedAttributes1[project.projectId] || ""}
                      onChange={(e) => handleAttributeChange(project.projectId, e.target.value, true)}
                      displayEmpty
                      fullWidth
                    >
                      <MenuItem value="" disabled>
                        Select Attribute
                      </MenuItem>
                      {attributes.map((attribute, index) => (
                        <MenuItem key={index} value={attribute.attributeId}>
                          {attribute.attributeName}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell align="center">
                    <Select
                      value={selectedAttributes2[project.projectId] || ""}
                      onChange={(e) => handleAttributeChange(project.projectId, e.target.value, false)}
                      displayEmpty
                      fullWidth
                    >
                      <MenuItem value="" disabled>
                        Select Attribute
                      </MenuItem>
                      {attributes.map((attribute, index) => (
                        <MenuItem key={index} value={attribute.attributeId}>
                          {attribute.attributeName}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {confirmAttributeSelection(project.projectId) ; setViewAssignedAttributes(false)}}
                    >
                      Confirm
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No Data Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Button
      variant="outlined"
      color="secondary"
      onClick={handleViewAssignedAttributesClick}
      sx={{ marginTop: 2 }}>
        {viewAssignedAttributes ? "Hide Assigned Attributes" : "View Assigned Attributes" }
        </Button>
        {viewAssignedAttributes && <SettedLastMonthProjectAttributes fetchProjectNames={fetchProjectNames} viewAssignedAttributes={viewAssignedAttributes} />}
    </Paper>
    
  );
};

export default ProjectAttributeHandle;
