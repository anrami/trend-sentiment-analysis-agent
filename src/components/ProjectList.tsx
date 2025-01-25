'use client';

import { Project } from '@/types/project';
import Link from 'next/link';

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-100 rounded-lg">
        <p className="text-gray-600 mb-4">No projects available</p>
        <Link
          href="/projects/new"
          className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-900 rounded-md hover:bg-gray-50 transition-colors"
        >
          Create sentiment analysis project
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {projects.map((project) => (
        <Link
          key={project.id}
          href={`/projects/${project.id}`}
          className="block p-6 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
        >
          <h3 className="text-lg font-semibold mb-2 text-gray-900">{project.trend}</h3>
          <p className="text-gray-600 text-sm mb-2">
            Data sources: {project.dataSources.join(', ')}
          </p>
          {project.description && (
            <p className="text-gray-500 text-sm">
              {project.description}
            </p>
          )}
          <p className="text-gray-400 text-xs mt-2">
            Created: {new Date(project.createdAt).toLocaleDateString()}
          </p>
        </Link>
      ))}
    </div>
  );
}
