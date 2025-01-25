'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingBar from './LoadingBar';
import SentimentScore from './SentimentScore';

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
      // Ensure we're getting the results as a string
      if (data && typeof data.results === 'string') {
        setSentimentResult(data.results);
      } else if (Array.isArray(data.results) && data.results.length > 0) {
        // If results is an array, take the first item
        setSentimentResult(data.results[0]);
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching sentiment:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <LoadingBar isLoading={isLoading} />
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
            disabled={isLoading}
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
            disabled={isLoading}
          />
          <div className="mt-2 text-sm text-gray-500">
            Available sources: {DATA_SOURCE_OPTIONS.join(', ')}
          </div>
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
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 transition-all duration-200"
        >
          {isLoading ? 'Analyzing...' : 'Analyze Sentiment'}
        </button>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
            {error}
          </div>
        )}

        {sentimentResult && <SentimentScore result={sentimentResult} />}
      </form>
    </>
  );
}
