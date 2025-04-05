// pages/profile.js
import { Avatar, Button } from "@mui/material";
import { Edit } from "@mui/icons-material";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-700 text-white font-sans">
      <div className="max-w-4xl mx-auto p-8">
        {/* Top Section */}
        <div className="flex items-start space-x-6">
          {/* Avatar */}
          <Avatar
            alt="John Doe"
            src="https://avatars.githubusercontent.com/u/583231?v=4"
            sx={{ width: 160, height: 160 }}
          />

          {/* Profile Info */}
          <div>
            <h1 className="text-3xl font-bold">John Doe</h1>
            <p className="text-gray-300">@johndoe</p>
            <p className="mt-2 text-sm text-gray-300">
              Building cool stuff with React, Node.js & open-source. Based in NY.
            </p>

            {/* Edit Profile Button */}
            <div className="mt-4">
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
              >
                Edit Profile
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
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

        {/* Repo List */}
        <div className="mt-10 space-y-4">
          <h2 className="text-xl font-semibold text-white">Popular Repositories</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                <h3 className="text-lg font-bold text-blue-400">project-{i}</h3>
                <p className="text-sm text-gray-400">
                  Description of project {i}. Built with React and TypeScript.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
