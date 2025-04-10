import React from "react";
import { Box, Typography } from "@mui/material";

export default function ProfileDetailsSection({ userDetails, userRole }) {
  return (
    <div className="mt-8 space-y-6">
      <Typography variant="h5" className="font-semibold text-blue-700">
        Profile Details
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: "User Name", value: userDetails.userName },
          { label: "Email", value: userDetails.email },
          { label: "Designation", value: userDetails.designationName || userRole },
          { label: "Mobile", value: userDetails.mobile },
          { label: "Date of Birth", value: userDetails.dob },
          { label: "Account Created", value: userDetails.addedAt ? new Date(userDetails.addedAt).toLocaleDateString() : "Not available" },
          { label: "Added By", value: userDetails.addedByName || "Not available" },
        ].map((field, index) => (
          <Box key={index} display="flex" alignItems="center" gap={2}>
            <Typography className="font-semibold text-white">{field.label}:</Typography>
            <Typography className="font-semibold text-blue-700">{field.value || "Not provided"}</Typography>
          </Box>
        ))}
      </div>
    </div>
  );
}
