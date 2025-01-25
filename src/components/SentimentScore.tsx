'use client';

interface SentimentScoreProps {
  result: string | any; // Updated type to handle potential non-string results
}

export default function SentimentScore({ result }: SentimentScoreProps) {
  // Extract score from the result text
  const extractScore = (text: string | any): number => {
    if (!text || typeof text !== 'string') {
      console.error('Invalid result format:', text);
      return 0;
    }

    const scoreMatch = text.match(/(\d+)(?=\s*(?:out of 100|%))/);
    return scoreMatch ? parseInt(scoreMatch[1], 10) : 0;
  };

  const score = extractScore(result);
  
  // Determine color based on score
  const getScoreColor = (score: number) => {
    if (score >= 70) return 'bg-green-500';
    if (score >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Get sentiment label
  const getSentimentLabel = (score: number) => {
    if (score >= 70) return 'Positive';
    if (score >= 40) return 'Neutral';
    return 'Negative';
  };

  if (!result || typeof result !== 'string') {
    return null;
  }

  return (
    <div className="mt-6 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Detailed Analysis</h3>
        <p className="text-gray-700 whitespace-pre-line">{result}</p>
      </div>
      
      <div className="border-t border-gray-200 pt-4">
        <h4 className="text-md font-medium text-gray-900 mb-3">Overall Sentiment Score</h4>
        <div className="flex items-center space-x-4">
          <div className="relative w-20 h-20">
            {/* Circular progress background */}
            <div className="w-full h-full rounded-full bg-gray-200"></div>
            {/* Circular progress indicator */}
            <div 
              className="absolute top-0 left-0 w-full h-full rounded-full transition-all duration-1000 ease-out"
              style={{
                background: `conic-gradient(${getScoreColor(score)} ${score}%, transparent ${score}%)`,
              }}
            ></div>
            {/* Score text */}
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <span className="text-xl font-bold text-gray-900">{score}</span>
            </div>
          </div>
          
          <div>
            <div className="text-lg font-semibold text-gray-900">
              {getSentimentLabel(score)}
            </div>
            <div className="text-sm text-gray-500">
              out of 100
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
