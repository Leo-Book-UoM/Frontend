import Link from 'next/link';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const CourseTabs = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const title = encodeURIComponent(searchParams.get('title') || "");
  const image = encodeURIComponent(searchParams.get("image") || "")
  const projectId = searchParams.get("projectId") || "";

  return (
    <div className="bg-gray-900 text-white px-8 py-2 flex space-x-6">
      <Link href={`/projectContent?title=${title}&image=${image}&projectId=${projectId}`} className="hover:border-b-2 border-white">
        Overview
      </Link>
      <a href="/projectTreasuries" className="hover:border-b-2 border-white">Records</a>
      <Link href="" className="hover:border-b-2 border-white">Treasure</Link>
      <a href="#" className="hover:border-b-2 border-white">Media</a>
    </div>
  );
};

export default CourseTabs;
