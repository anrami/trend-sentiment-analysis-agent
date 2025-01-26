[Watch Demo Video here](https://td6vw10lmp.ufs.sh/f/tUeDRE4SLPx8sH1sG2931RPaNsLtW0mnYgwQvziqCbJjMDu7)

# Trend Sentiment Analysis Agent

A powerful tool that analyzes sentiment trends across multiple data sources using AI. Built with Next.js, FastAPI, and LangChain.

## Features

- 🔍 Real-time sentiment analysis across multiple sources
- 📊 Visual sentiment scoring with interactive UI
- 🎨 Beautiful, responsive design with Tailwind CSS
- 🤖 AI-powered analysis using GPT-3.5-turbo
- 🔎 Real-time web search integration with Tavily
- 📱 Mobile-friendly interface
- ⚡ Fast and efficient with Next.js and FastAPI

## Tech Stack

### Frontend
- **Next.js** - React framework for production
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Utility-first CSS framework
- **React** - UI library

### Backend
- **FastAPI** - Modern Python web framework
- **LangChain** - Framework for LLM applications
- **OpenAI GPT-3.5** - Language model for sentiment analysis
- **Tavily** - Real-time web search API

## Prerequisites

Before you begin, ensure you have:
- Node.js 18+ installed
- Python 3.8+ installed
- OpenAI API key
- Tavily API key

## Environment Setup

1. **Frontend Environment Variables**
   Create `.env.local` in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

2. **Backend Environment Variables**
   Create `.env` in the `backend/trendsenti/app` directory:
   ```env
   OPENAI_API_KEY=your-openai-api-key
   TAVILY_API_KEY=your-tavily-api-key
   ```

## Installation

1. **Frontend Setup**
   ```bash
   # Install dependencies
   npm install

   # Start development server
   npm run dev
   ```

2. **Backend Setup**
   ```bash
   # Navigate to backend directory
   cd backend/trendsenti

   # Create virtual environment
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate

   # Install dependencies
   pip install -r requirements.txt

   # Start backend server
   uvicorn app.src.main:app --reload
   ```

## Usage

1. Open [http://localhost:3000](http://localhost:3000) in your browser
2. Enter a trend to analyze (e.g., "Tesla", "Bitcoin")
3. Select data sources (e.g., "Reuters, Bloomberg")
4. Click "Analyze Sentiment"
5. View the detailed analysis and sentiment score

## API Endpoints

### Sentiment Analysis
- **GET** `/sentiments`
  - Query Parameters:
    - `keywords`: Search terms
    - `sources`: Data sources to analyze
  - Returns sentiment analysis results with score

## Project Structure

```
trend-sentiment-analysis-agent/
├── src/                      # Frontend source code
│   ├── app/                  # Next.js pages
│   ├── components/           # React components
│   └── types/                # TypeScript types
├── backend/
│   └── trendsenti/
│       ├── app/
│       │   ├── src/
│       │   │   ├── main.py  # FastAPI application
│       │   │   └── agent.py # LangChain agent
│       │   └── requirements.txt
│       └── README.md
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [LangChain](https://python.langchain.com/)
- [Tavily](https://tavily.com/)
- [OpenAI](https://openai.com/)

