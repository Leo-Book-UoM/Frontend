"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Typewriter } from "react-simple-typewriter";

const AuthWrapper = ({ children }) => {
  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/authuser", {
          credentials: "include",
        });

        if (response.status === 200) {
          const data = await response.json();
          setUserName(data.userName);
        } else {
          router.push("/login"); // Redirect if not authenticated
        }
      } catch (error) {
        console.error("Error:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Show loading while checking authentication
  }

  return (
    <div>
      {/* Pass userName to children as prop */}
      {children && typeof children === "function" ? children(userName) : children}
    </div>
  );
};

export default AuthWrapper;
