"use client";
import React, { useEffect, useState } from "react";
import SecretaryLayout from "@/components/layout/secrataryLayout";
import AuthWrapper from "@/components/authWrapper";
import ClubMembers from '@/components/clubMembershipComponents/membersTable';
import MembershipTabs from "@/components/clubMembershipComponents/membershipTabs";


function Page() {
const [activeTab, setActiveTab] = useState("projectContent");
  return (
        <SecretaryLayout>
<MembershipTabs activeTab={activeTab} setActiveTab={setActiveTab} />
<ClubMembers />
        </SecretaryLayout>
  );
}

export default Page;