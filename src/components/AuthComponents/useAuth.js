import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

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
        const response = await fetch("http://localhost:5000/api/authuser", {
          credentials: "include",
        });

        if (response.status === 200) {
          const data = await response.json();
          setUserName(data.userName);
          setUserRole(data.roleName);
          setUserId(data.userId);
          setUserImage(data.userImage);
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
    if (!userRole) return;

    const roleRoutes = {
      President: {
        default: "/presidentDashboard",
        allowedPaths: ["/profile/president", "/presidentDashboard"],
      },
      Secretary: {
        default: "/secretaryDashboard",
        allowedPaths: ["/profile", "/secretaryDashboard", "/projectAttribute", "/projectReports"],
      },
    };

    const roleConfig = roleRoutes[userRole];

    if (roleConfig && !roleConfig.allowedPaths.some((path) => pathname.startsWith(path))) {
      router.push(roleConfig.default);
    }
  }, [userRole, pathname, router]);

  return {
    userName,
    userRole,
    userId,
    userImage,
    loading,
  };
};

export default useAuth;
