"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "../presidentlayout";
import { Typewriter } from "react-simple-typewriter";

export default function PresidentDashboard() {
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const content = await fetch("http://localhost:5000/api/authuser", {
          credentials: "include",
        });
        if (content.status === 200) {
          const data = await content.json();
          setUserName(data.userName);
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Error:", error);
        console.log("You are not logged in");
      }
    })();
  }, []);

  return (
    <Layout>
          <h1 className="text-3xl font-bold text-indigo-600">
            <Typewriter words={[`Hi , ${userName}!`]} loop={1} typeSpeed={100} />
          </h1>
    </Layout>
  );
}
