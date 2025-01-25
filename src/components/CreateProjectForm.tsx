'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const DATA_SOURCE_OPTIONS = [
  'Reuters',
  'Bloomberg',
  'CNBC',
  'Wall Street Journal'
];

export default function CreateProjectForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    trend: '',
    dataSource: '',
    description: ''
  });
  const [sentimentResult, setSentimentResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSentimentResult(null);
    
    try {
      const response = await fetch(`http://localhost:8000/sentiments?keywords=${encodeURIComponent(formData.trend)}&sources=${encodeURIComponent(formData.dataSource)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch sentiment analysis');
      }

      const data = await response.json();
      setSentimentResult(data.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
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
          placeholder="Enter data sources (e.g., Reuters, Bloomberg)"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="description" className="block text-sm font-medium text-gray-900 mb-2">
          Project Description (Optional)
        </label>
        <textarea
          id="description"
          className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-gray-200 focus:border-gray-400"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Enter a description for your project"
          rows={3}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
      >
        {isLoading ? 'Analyzing...' : 'Analyze Sentiment'}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
          {error}
        </div>
      )}

      {sentimentResult && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Analysis Results</h2>
          <p className="text-gray-800">{sentimentResult}</p>
        </div>
      )}
    </form>
  );
}
