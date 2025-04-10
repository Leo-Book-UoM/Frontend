"use client";
import { Avatar, Button, Typography } from "@mui/material";
import { Edit } from "@mui/icons-material";
import AuthWrapper from "../authWrapper";
import { useState, useEffect } from "react";
import RoleBasedLayout from "../layout/RoleBasedLayout";
import ProfileTabs from "./profileTabs";
import ProfileDetails from "./profileDetails";
// import ProjectReporting from "./ProjectReporting";
// import ProjectBudgetReport from "./ProjectBudgetReport";

export default function ProfilePage() {
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState("");
  const [userImage, setUserImage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profileDetails");

  const [userDetails, setUserDetails] = useState({
    userName: "",
    email: "",
    mobile: "",
    dob: "",
    addedAt: null,
    addedByName: null,
    image: null,
  });

  const [authLoaded, setAuthLoaded] = useState(false);

  // Fetch user details from backend
  useEffect(() => {
    const fetchDetails = async () => {
      if (!userId) return;
      try {
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

  return (
    <AuthWrapper>
      {(userNameFromAuth, userRoleFromAuth, userIdFromAuth) => {
        if (!authLoaded && userIdFromAuth) {
          setUserName(userNameFromAuth);
          setUserRole(userRoleFromAuth);
          setUserId(userIdFromAuth);
          setAuthLoaded(true);
        }

        // Render nothing until auth is loaded
        if (!authLoaded) return null;

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
                      {userDetails.userRole || userRole}
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

                <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                {activeTab === "profileDetails" && <ProfileDetails userDetails={userDetails} userRole={userRole} />}
                {/* {activeTab === "projectDocuments" && <ProjectReporting projectId={projectId} />} */}
                {/* {activeTab === "projectTreasure" && <ProjectBudgetReport projectId={projectId} />} */}
              </div>
            </div>
          </RoleBasedLayout>
        );
      }}
    </AuthWrapper>
  );
}
