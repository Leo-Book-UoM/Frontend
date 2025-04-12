import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios";

export default function ProfileDetailsSection({ userDetails, userRole }) {

  const [projectCount, setProjectCount] = useState(null);

  useEffect(() => {
    const fetchProjectCount = async () => {
      try {
        let res;

        if (userRole.toLowerCase() === "prospect") {
          res = await axios.get(`http://localhost:5000/api/prospectProjectCount/${userDetails.userId}`);
        } else if (userRole.toLowerCase() === "director") {
          res = await axios.get(`http://localhost:5000/api/directorProjectCount/${userDetails.userId}`)
        }
        if (res && res.data && res.data.count !== undefined) {
          setProjectCount(res.data.count);
        }
      } catch (error) {
        console.log("Error fetching project count", error);
      }
    };

    fetchProjectCount();
  }, [userDetails.userId, userRole]);

  const profileFields = [
    { label: "User Name", value: userDetails.userName },
    { label: "Email", value: userDetails.email },
    { label: "Designation", value: userDetails.designationName || userRole },
    { label: "Mobile", value: userDetails.mobile },
    { label: "Date of Birth", value: userDetails.dob },
    { label: "Account Created", value: userDetails.addedAt ? new Date(userDetails.addedAt).toLocaleDateString() : "Not available" },
    { label: "Added By", value: userDetails.addedByName || "Not available" },
  ];

  if (projectCount !== null) {
    profileFields.push({ label: "Project Count", value: projectCount });
  }

  return (
    <div className="mt-8 space-y-6">
      <Typography variant="h5" className="text-white mb-4">
        Profile Details
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {profileFields.map((field, index) => (
          <Box key={index} display="flex" alignItems="center" gap={2}>
            <Typography className="font-semibold text-white">{field.label}:</Typography>
            <Typography className="font-semibold text-blue-700">{field.value || "Not provided"}</Typography>
          </Box>
        ))}
      </div>
    </div>
  );
}
