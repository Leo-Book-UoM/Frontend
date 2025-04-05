"use client";
import React, { useEffect, useState } from "react";
import SecretaryLayout from "@/app/secrataryLayout";
import AuthWrapper from "@/components/authWrapper";
import ProjectAttributeHandle from "@/components/projectAttributeComponents/setProjectAttribute";
import projectTabs from "@/components/projectTabs";
import ProjectTabs from "@/components/projectAttributeComponents/attributeTabs";


function Page() {
const [activeTab, setActiveTab] = useState("projectContent");
  return (
        <SecretaryLayout>
<ProjectTabs activeTab={activeTab} setActiveTab={setActiveTab} />
<ProjectAttributeHandle/>
        </SecretaryLayout>
  );
}

export default Page;
