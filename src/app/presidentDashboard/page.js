"use client";
import Layout from "../presidentlayout";
import AuthWrapper from "../../components/authWrapper";
import { Typewriter } from "react-simple-typewriter";
import PresidentCard from "../../components/presidentCard";
import { useState, useEffect } from "react";

const PresidentDashboard = () => {
  const [ongoingProjectCount, setOngoingProjectCount] = useState(0); // ✅ Store number, not array

  const fetchOngoingProjectCount = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/getProjectsCount/1");
      if (!response.ok) {
        throw new Error("Failed to fetch ongoing project count");
      }
      const data = await response.json();
      console.log("Fetched Data:", data); // ✅ Debugging: See what the API returns
      setOngoingProjectCount(data); // ✅ Set the number directly
    } catch (error) {
      console.error("Error fetching ongoing project count:", error);
    }
  };

  useEffect(() => {
    fetchOngoingProjectCount();
  }, []);

  return (
    <AuthWrapper>
      {(userName) => (
        <Layout>
          <main className="max-w-6xl mx-auto py-8">
            <h1 className="text-3xl font-bold text-indigo-600">
              <Typewriter words={[`Hi, ${userName}!`]} loop={1} typeSpeed={150} />
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              <PresidentCard title="Ongoing Projects" count={ongoingProjectCount} />

              {/* ✅ Hardcoded cards */}
              <PresidentCard count={12} percentageChange={20} />
              <PresidentCard count={5} percentageChange={-10} />
              <PresidentCard count={7} percentageChange={5} />
              <PresidentCard count={7} percentageChange={5} />
            </div>
          </main>
        </Layout>
      )}
    </AuthWrapper>
  );
};

export default PresidentDashboard;
