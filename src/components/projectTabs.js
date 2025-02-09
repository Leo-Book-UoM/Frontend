import Link from 'next/link';
import React, { useMemo } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import MainLayout from '@/app/mainlayout';

const CourseTabs = React.memo(() => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
    // Get project ID once, so it does not trigger re-renders
    const projectId = useMemo(() => searchParams.get("projectId") || "", [searchParams]);

    // Memoize tab labels (this prevents object recreation)
    const tabs = useMemo(() => ({
      projectContent: "Content",
      projectDocuments: "Documents",
      projectTreasure: "Treasure",
      projectITEditorial: "IT & Editorial",
    }), []);
  

  const title = encodeURIComponent(searchParams.get('title') || "");
  const image = encodeURIComponent(searchParams.get("image") || "")
  // const projectId = searchParams.get("projectId") || "";

  // const tabs = {
  //   projectContent: "Content",
  //   projectDocuments: "Documents",
  //   projectTreasure: "Treasure",
  //   projectITEditorial: "IT & Editorial",
  // };

  // Function to determine if the current path matches the tab
  const getLinkClassName = (path) => {
    return pathname.startsWith(path)
      ? "border-b-2 border-white"
      : "border-transparent hover:border-white";
  };

  return (
    <div className="bg-gray-900 text-white px-8 py-5 p-4 flex space-x-6 sticky top-0 z-50">
      {Object.entries(tabs).map(([tab, label]) => (
        <Link
           key={tab}
           href={`/${tab}?title=${title}&image=${image}&projectId=${projectId}`}
           className={`border-b-2 ${getLinkClassName(`/${tab}`)}`}
           >
             {label}
         </Link> 

      ))}
    </div>
  );
});

export default CourseTabs;
