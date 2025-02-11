"use client"
import React from 'react'
import SecretaryLayout from '@/app/secrataryLayout'
import AuthWrapper from '@/components/authWrapper'

function page() {
  return (
    <AuthWrapper>
    <SecretaryLayout>
    <div>page</div>
    </SecretaryLayout>
    </AuthWrapper>
  );
};

export default page