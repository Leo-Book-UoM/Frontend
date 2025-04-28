import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import uri from '@/api/uri';

const useAuth = () => {
  const [userName, setUserName] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${uri}/authuser`, {
          credentials: "include",
        });

        if (response.status === 200) {
          const data = await response.json();
          setUserName(data.userName);
          setUserRole(data.roleName);
          setUserId(data.userId);
          setUserImage(data.image);
          sessionStorage.setItem("image", `http://localhost:5000${data.image}`);
          sessionStorage.setItem("userId",userId)
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
    if (!userRole || loading) return;
  
    const roleRoutes = {
      President: {
        default: "/presidentDashboard",
        allowedPaths: ["/profile", "/presidentDashboard"],
      },
      Secretary: {
        default: "/secretaryDashboard",
        allowedPaths: ["/profile", "/secretaryDashboard", "/projectAttribute", "/projectReports", "/clubMembership"],
      },
      Treasure: {
        default: "/treasureDashboard",
        allowedPaths: ["/profile", "/treasureDashboard", "/projectAttribute", "/projectReports", "/clubMembership"],
      },
      Director: {
        default: "/directorDashboard",
        allowedPaths: ["/profile", "/directorDashboard","/projectContent", "/myProjects", "/meetings", "/projectPlaning"],
      }
    };
  
    const roleConfig = roleRoutes[userRole];
  
    // Check if user is on an unauthorized path
    const isAllowed = roleConfig.allowedPaths.some((path) => pathname.startsWith(path));
  
    if (!isAllowed) {
  
      if (pathname !== roleConfig.default) {
        router.push(roleConfig.default);
      }
    }
  }, [userRole, loading, pathname, router]);
  

  return {
    userName,
    userRole,
    userId,
    userImage,
    loading,
  };
};

export default useAuth;
