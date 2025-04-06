"use client";
import React from "react";
import useAuth from "./AuthComponents/useAuth";

const AuthWrapper = ({ children }) => {
  const { userName, userRole, userId, userImage, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {typeof children === "function"
        ? children(userName, userRole, userId, userImage)
        : children}
    </>
  );
};

export default AuthWrapper;
