"use client";
import React, { useEffect, useState } from "react";
import SecretaryLayout from "@/app/secrataryLayout";
import AuthWrapper from "@/components/authWrapper";
import ProjectAttributeHandle from "@/components/projectAttributeComponents/setProjectAttribute";
function Page() {


  return (
        <SecretaryLayout>

<ProjectAttributeHandle/>
        </SecretaryLayout>
  );
}

export default Page;
