"use client"
import React,{useEffect, useState} from 'react'
import MainLayout from '../mainlayout'
import ProjectTabs from '@/components/projectTabs'
import { useSearchParams } from 'next/navigation'
import ProjectContentImage from '@/components/projectContentImage'
import ProjectBudgetReport from '@/components/projectBudgetReport'

export default function page() {
    const searchParams = useSearchParams();
    const courseParams = decodeURIComponent(searchParams.get("title")) || "Course Detailes";
    const image = decodeURIComponent(searchParams.get("image"))
    const projectId = searchParams.get("projectId");

  return (
    <MainLayout>
    <div className="bg-gray-900 min-h-screen">
        <ProjectTabs />
        <div className="max-w-5xl mx-auto py-8">
            <ProjectContentImage courseParams={courseParams} image={image} />
           <ProjectBudgetReport projectId={projectId}/>
        </div>
      </div>
    </MainLayout>
  )
}
