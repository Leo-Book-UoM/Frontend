"use client";
import { Avatar, Button, Box, TextField, Typography, Divider, Grid } from "@mui/material";
import { Edit } from "@mui/icons-material";
import AuthWrapper from "./authWrapper";
import { useState, useEffect } from "react";
import RoleBasedLayout from "./layout/RoleBasedLayout";

export default function ProfilePage() {
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState("");
  const [userImage, setUserImage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [userDetails, setUserDetails] = useState({
    userName: "",
    email: "",
    mobile: "",
    dob: "",
    addedAt: null,
    addedByName: null,
    image: null,
  });

  // Fetch full user data when userId is available
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (!userId) return;
        const res = await fetch(`http://localhost:5000/api/getUserDetails/${userId}`);
        if (res.ok) {
          const data = await res.json();
          setUserDetails(data);
        }
      } catch (err) {
        console.error("Failed to fetch user details:", err);
      }
    };
    fetchDetails();
  }, [userId]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Simulating save functionality (you can add logic to save changes here)
    setIsEditing(false);
    alert("Profile updated!");
  };

  return (
    <AuthWrapper>
      {(userNameFromAuth, userRoleFromAuth, userIdFromAuth) => {
        if (userIdFromAuth) {
          setUserId(userIdFromAuth);
          setUserRole(userRoleFromAuth);
        }
        return (
          <RoleBasedLayout userRole={userRole}>
            <div className="min-h-screen bg-gray-900 text-white font-sans">
              <div className="max-w-4xl mx-auto p-8">
                <div className="flex items-start space-x-6">
                  <Avatar
                    alt={userDetails.userName || userName}
                    src={userDetails.image || userImage || "https://avatars.githubusercontent.com/u/583231?v=4"}
                    sx={{ width: 160, height: 160 }}
                  />
                  <div className="w-full">
                    <Typography variant="h4" component="h1" className="text-blue-600 font-bold">
                      {userDetails.userName || userName}
                    </Typography>
                    <Typography className="text-gray-300">{userDetails.email}</Typography>
                    <Typography className="mt-2 text-sm text-gray-300">
                      {userRole === "President" ? "President of the organization" : "Team member"}
                    </Typography>

                    <div className="mt-6">
                      <Button
                        variant="outlined"
                        startIcon={<Edit />}
                        sx={{
                          borderColor: "gray",
                          color: "white",
                          textTransform: "none",
                          "&:hover": {
                            borderColor: "white",
                          },
                        }}
                        onClick={handleEditClick}
                      >
                        Edit Profile
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Editable Form */}
                {isEditing ? (
                  <div className="mt-8 space-y-6">
                    <Typography variant="h6" className="font-semibold text-white">
                      Edit Profile
                    </Typography>
                    <div className="space-y-4">
                      <TextField
                        label="User Name"
                        value={userDetails.userName || userName}
                        onChange={(e) => setUserDetails({ ...userDetails, userName: e.target.value })}
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{ className: "text-gray-300" }}
                        InputProps={{
                          className: "bg-gray-800 text-white",
                        }}
                      />
                      <TextField
                        label="Email"
                        value={userDetails.email}
                        onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{ className: "text-gray-300" }}
                        InputProps={{
                          className: "bg-gray-800 text-white",
                        }}
                      />
                      <TextField
                        label="Mobile"
                        value={userDetails.mobile}
                        onChange={(e) => setUserDetails({ ...userDetails, mobile: e.target.value })}
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{ className: "text-gray-300" }}
                        InputProps={{
                          className: "bg-gray-800 text-white",
                        }}
                      />
                      <TextField
                        label="Date of Birth"
                        value={userDetails.dob}
                        onChange={(e) => setUserDetails({ ...userDetails, dob: e.target.value })}
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{ className: "text-gray-300" }}
                        InputProps={{
                          className: "bg-gray-800 text-white",
                        }}
                      />
                    </div>

                    <div className="mt-6 flex justify-end space-x-4">
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => setIsEditing(false)}
                        sx={{ textTransform: "none" }}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSaveClick}
                        sx={{ textTransform: "none" }}
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-8 space-y-6">
                    <Typography variant="h6" className="font-semibold text-white">
                      Profile Details
                    </Typography>
                    <div className="space-y-4">
                      <Box display={"flex"}  alignItems="center" gap={2}>
                        <Typography variant="body1" className="font-semibold text-white">
                          User Name:
                        </Typography>
                        <Typography variant="body1" className="font-semibold text-blue-700">{userDetails.userName || "Not provided"}</Typography>
                      </Box>

                      <Box display={"flex"}  alignItems="center" gap={2}>
                        <Typography variant="body1" className="font-semibold text-white">
                          Email:
                        </Typography>
                        <Typography variant="body1" className="font-semibold text-blue-700">{userDetails.email || "Not provided"}</Typography>
                      </Box>

                      <Box display={"flex"}  alignItems="center" gap={2}>
                        <Typography variant="body1" className="font-semibold text-white">
                          Mobile:
                        </Typography>
                        <Typography variant="body1" className="font-semibold text-blue-700">{userDetails.mobile || "Not provided"}</Typography>
                      </Box>

                      <Box display={"flex"}  alignItems="center" gap={2}>
                        <Typography variant="body1" className="font-semibold text-white">
                          Date of Birth:
                        </Typography>
                        <Typography variant="body1" className="font-semibold text-blue-700">{userDetails.dob || "Not provided"}</Typography>
                      </Box>

                      <Box display={"flex"}  alignItems="center" gap={2}>
                        <Typography variant="body1" className="font-semibold text-white">
                          Account Created:
                        </Typography>
                        <Typography variant="body1" className="font-semibold text-blue-700">
                          {userDetails.addedAt ? new Date(userDetails.addedAt).toLocaleDateString() : "Not available"}
                        </Typography>
                      </Box>

                      <Box display={"flex"}  alignItems="center" gap={2}>
                        <Typography variant="body1" className="font-semibold text-white">
                          Added By:
                        </Typography>
                        <Typography variant="body1" className="font-semibold text-blue-700">{userDetails.addedByName || "Not available"}</Typography>
                      </Box>
                    </div>
                  </div>
                )}

                {/* Followers and other details */}
                <div className="mt-6 flex space-x-8 text-sm text-gray-300">
                  <p>
                    <span className="font-semibold text-white">150</span> followers
                  </p>
                  <p>
                    <span className="font-semibold text-white">120</span> following
                  </p>
                  <p>
                    <span className="font-semibold text-white">35</span> repositories
                  </p>
                </div>
              </div>
            </div>
          </RoleBasedLayout>
        );
      }}
    </AuthWrapper>
  );
}
