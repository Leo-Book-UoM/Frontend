import React, {useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Chip, CircularProgress } from "@mui/material";

export default function ProjectAttendance ({ userId }) {
    const [ participatedProjects, setParticipatedProjects ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    const fetchParticipatedProjects = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/getUserProjectAttendance/${userId}`);
            setParticipatedProjects(res.data);
        } catch (error) {
            console.error("Error fetching project participated",error);
        } finally {
            setLoading(false);
          }
    };

    useEffect(() => {
        fetchParticipatedProjects();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <Typography variant="h5" className="text-white mb-6">
                Project Attendance
            </Typography>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {participatedProjects.map((project) => {
                    const isPresent = true;
                    return (
                        <Card key={project.projectId}>
                            <CardContent>
                                <Typography variant="h6" className="font-semibold text-gray-800">
                                    {project.projectname}
                                </Typography>
                                <Typography className="text-gray-600 mb-2">
                                    Date: {new Date(project.date).toLocaleDateString()}
                                </Typography>
                                <Chip label={isPresent ? "Present" : "Absent"}
                                      color={isPresent ? "success" : "error"}
                                      variant="outlined"
                                />
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}