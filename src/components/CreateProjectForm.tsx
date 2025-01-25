'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const DATA_SOURCE_OPTIONS = [
  'Reddit',
  'Twitter',
  'News Articles',
  'Blog Posts'
];

export default function CreateProjectForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    trend: '',
    dataSource: '',
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Implement API call to create project
    // For now, we'll just redirect back to home
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Sentiment Analysis Project</h1>
      
      <div className="mb-6">
        <label htmlFor="trend" className="block text-sm font-medium text-gray-900 mb-2">
          What trend do you want to analyze?
        </label>
        <input
          type="text"
          id="trend"
          required
          className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-gray-200 focus:border-gray-400"
          value={formData.trend}
          onChange={(e) => setFormData(prev => ({ ...prev, trend: e.target.value }))}
          placeholder="Enter a trend to analyze"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="dataSource" className="block text-sm font-medium text-gray-900 mb-2">
          What data source do you want to use?
        </label>
        <input
          type="text"
          id="dataSource"
          required
          className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-gray-200 focus:border-gray-400"
          value={formData.dataSource}
          onChange={(e) => setFormData(prev => ({ ...prev, dataSource: e.target.value }))}
          placeholder="Enter a keyword or data source"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="description" className="block text-sm font-medium text-gray-900 mb-2">
          Description (optional)
        </label>
        <textarea
          id="description"
          rows={3}
          className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-gray-200 focus:border-gray-400"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Add a description for your project"
        />
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.push('/')}
          className="px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-md hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-white border border-gray-300 text-gray-900 rounded-md hover:bg-gray-50 transition-colors"
        >
          Create Project
        </button>
      </div>
    </form>
  );
}
