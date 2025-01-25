'use client';

import ProjectList from '@/components/ProjectList';

export default function Home() {
  // TODO: Fetch projects from API
  const projects = [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        My Projects
      </h1>
      <ProjectList projects={projects} />
    </div>
  );
}
