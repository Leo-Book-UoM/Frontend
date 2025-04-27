import React, { useEffect, useState } from "react";
import { 
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button 
} from "@mui/material";
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';

const ProjectTable = (fetchProjectNames , viewAssignedAttributes) => {
    const [projects, setProjects] = useState([]);
    const [maxAttributes, setMaxAttributes] = useState(0);

    useEffect(() => {
        fetch("http://localhost:5000/api/getMarkedAttributes")
            .then(response => response.json())
            .then(data => {
                const formattedData = data.map((item) => ({
                    ...item,
                    attributeNames: typeof item.attributeNames === "string"
                        ? item.attributeNames.split(",").map(attr => attr.trim())
                        : item.attributeNames,
                }));

                setProjects(formattedData);

                const maxAttrCount = formattedData.length > 0
                    ? Math.max(...formattedData.map(p => p.attributeNames.length))
                    : 0;

                setMaxAttributes(maxAttrCount);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, [viewAssignedAttributes]);

    const handleDelete = async (projectId) => {
        try {
            const response = await fetch("http://localhost:5000/api/deleteAssigning", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ projectId }),  
            });

            const data = await response.json();
            
            if (!response.ok) throw new Error(data.error || "Failed to delete project");
            if (typeof fetchProjectNames === "function") {
                fetchProjectNames();
            }

            alert("Project deleted successfully!");
            setProjects(prevProjects => prevProjects.filter(project => project.projectId !== projectId));

        } catch (error) {
            console.error("Error deleting project:", error);
            alert("Failed to delete project.");
        } 
    };

    return (
        <TableContainer component={Paper} sx={{ maxWidth: "100%", margin: "auto", mt: 4 }}>
            <Table sx={{ minWidth: 650 }} aria-label="dynamic project table">
                <TableHead sx={{ bgcolor: "#03a9f4"}}>
                    <TableRow>
                        <TableCell sx={{ fontWeight: "bold", backgroundColor: "#1976d2", color: "white" }}>
                            Project Name
                        </TableCell>
                        {[...Array(maxAttributes)].map((_, index) => (
                            <TableCell key={index} sx={{ fontWeight: "bold", backgroundColor: "#1976d2", color: "white" }}>
                                Attribute {index + 1}
                            </TableCell>
                        ))}
                        <TableCell sx={{ fontWeight: "bold", backgroundColor: "#1976d2", color: "white" }}>
                            Actions
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {projects.map((project, index) => (
                        <TableRow key={index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f5f5f5" } }}>
                            <TableCell>{project.projectname}</TableCell>
                            {[...Array(maxAttributes)].map((_, attrIndex) => (
                                <TableCell key={attrIndex}>
                                    {project.attributeNames[attrIndex] || "-"}
                                </TableCell>
                            ))}
                            <TableCell>
                                <Button 
                                    variant="contained" 
                                    color="error" 
                                    size="small"
                                    onClick={() => handleDelete(project.projectId)}  
                                    sx={{ marginRight: 1 }}
                                    startIcon={<RemoveDoneIcon />}  
                                >
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ProjectTable;
