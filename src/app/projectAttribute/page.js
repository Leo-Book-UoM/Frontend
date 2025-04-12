"use client";
import React, { useEffect, useState } from "react";
import SecretaryLayout from "@/components/layout/secrataryLayout";
import AuthWrapper from "@/components/authWrapper";
import ProjectAttributeHandle from "@/components/projectAttributeComponents/setProjectAttribute";;
import AttributeTabs from "@/components/projectAttributeComponents/attributeTabs";
import ViewAttribute from "@/components/projectAttributeComponents/viewAttribute";

function Page() {
const [activeTab, setActiveTab] = useState("assignAttribute");
  return (
        <SecretaryLayout>
          <AttributeTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          {activeTab === "assignAttribute" && <ProjectAttributeHandle/>}
          {/* {activeTab === "gmAttendance" && <GMAttendance userId={userId} />}  */}
          {activeTab === "viewAttribute" && <ViewAttribute/>} 
        </SecretaryLayout>
  );
}

export default Page;
