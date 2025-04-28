"use client";
import { Avatar, Button, Typography } from "@mui/material";
import { Edit } from "@mui/icons-material";
import AuthWrapper from "../authWrapper";
import { useState, useEffect } from "react";
import RoleBasedLayout from "../layout/RoleBasedLayout";
import ProfileTabs from "./profileTabs";
import ProfileDetails from "./profileDetails";
import GMAttendance from "./gmAttendance";
import ProjectAttendance from "./projectAttendance";
import ProfileEditForm from "./profileEditForm";
import uri from "@/api/uri";

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
        const res = await fetch(`${uri}/getUserDetails/${userId}`);
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

  const handleSaveChanges = () => {
    setIsEditing(false);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`${uri}/updateProPic/${userId}`, {
        method: "PATCH",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setUserImage(data.imageUrl);
        setUserDetails((prev) => ({...prev, image: data.imageUrl }));
      } else {
        console.error("Failed to upload image");
      }
    } catch (err) {
      console.error("Upload error:", err);
    }
  }
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
                  <div className="relative">
                    <label htmlFor="avatar-upload" className="cursor-pointer">
                      <Avatar
                        alt={userDetails.userName || userName}
                        src={`http://localhost:5000${userDetails.image}` || userImage || "https://avatars.githubusercontent.com/u/583231?v=4"}
                        className= 'rounded-full border-2 border-blue-500'
                        sx={{ width: 160, height: 160 }}
                      />
                    </label>
                    <input id="avatar-upload" type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }}/>
                  </div>
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
                {activeTab === "gmAttendance" && <GMAttendance userId={userId} />} 
                {activeTab === "projectAttendance" && <ProjectAttendance userId={userId} />} 
              </div>
              <ProfileEditForm open={isEditing} onClose={() => setIsEditing(false)} userDetails={userDetails} setUserDetails={setUserDetails} onSave={handleSaveChanges} />
            </div>
          </RoleBasedLayout>
        );
      }}
    </AuthWrapper>
  );
}
