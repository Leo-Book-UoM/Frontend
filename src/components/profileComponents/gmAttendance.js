import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
  Typography,
} from "@mui/material";

export default function GeneralMeetingTable({ userId }) {
  const [allMeetings, setAllMeetings] = useState([]);
  const [participatedMeetingIds, setParticipatedMeetingIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [meetingsRes, participatedRes] = await Promise.all([
          axios.get("http://localhost:5000/api/getAllGMdetails"),
          axios.get(`http://localhost:5000/api/getParticipatedGMs/${userId}`),
        ]);

        setAllMeetings(meetingsRes.data);
        const ids = participatedRes.data.map((row) => row.meetingId);
        setParticipatedMeetingIds(ids);
      } catch (error) {
        console.error("Error fetching meeting data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Typography variant="h5" className="text-white mb-4">
        General Meeting Attendance Status
      </Typography>

      <TableContainer component={Paper} className="shadow-md mt-4">
        <Table>
          <TableHead className="bg-gray-100">
            <TableRow>
              <TableCell className="font-bold text-gray-700">Meeting Name</TableCell>
              <TableCell className="font-bold text-gray-700">Date</TableCell>
              <TableCell className="font-bold text-gray-700">Attendance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allMeetings.map((meeting) => {
              const isPresent = participatedMeetingIds.includes(meeting.meetingId);
              return (
                <TableRow key={meeting.meetingId}>
                  <TableCell>{meeting.meetingName}</TableCell>
                  <TableCell>{new Date(meeting.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Chip
                      label={isPresent ? "Present" : "Absent"}
                      color={isPresent ? "success" : "error"}
                      variant="outlined"
                      className="font-medium"
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
