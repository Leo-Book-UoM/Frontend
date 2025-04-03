"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const AuthWrapper = ({ children }) => {
  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/authuser", {
          credentials: "include",
        });

        if (response.status === 200) {
          const data = await response.json();
          setUserName(data.userName);
          setUserRole(data.roleName);
        } else {
          router.push("/"); 
        }
      } catch (error) {
        console.error("Error:", error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  useEffect(() => {
    if(userRole) {
      if(userRole === "President" && pathname !== "/presidentDashboard"){
        router.push("/presidentDashboard");
      }else if(userRole === "Scretary" && pathname !== "/secretaryDashboard" && !pathname.startsWith("/secretary")){
        router.push("/secretaryDashboard");
      }
    }
  },[userRole, router]);

  if (loading) {
    return <p>Loading...</p>; // Show loading while checking authentication
  }

  return (
    <div>
      {children && typeof children === "function" ? children(userName) : children}
    </div>
  );
};

export default AuthWrapper;
