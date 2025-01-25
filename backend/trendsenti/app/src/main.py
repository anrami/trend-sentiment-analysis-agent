from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import requests
from typing import Optional
from bs4 import BeautifulSoup
import urllib.parse
from .agent import get_sentiment

app = FastAPI(
    title="Sentiment Analysis API",
    description="API for analyzing sentiment across various sources"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/sentiments")
async def sentiments_search(
    keywords: Optional[str] = Query(
        default=None, 
        description="Comma-separated keywords to search"
    ),
    sources: Optional[str] = Query(
        default=None, 
        description="Comma-separated sources to search sentiment from"
    )
):
    """
    Perform sentiment analysis with keywords and source filtering.
    
    - **keywords**: Search terms
    - **sources**: Optional sources to analyze sentiment from
    - Returns sentiment analysis results
    """
    if not keywords:
        return {"error": "No keywords provided"}
    
    if not sources:
        return {"error": "No sources provided"}
    
    # Prepare search terms
    search_keywords = [term.strip() for term in keywords.split(',')]
    search_sources = [source.strip() for source in (sources or '').split(',') if source.strip()]

    print(f"Analyzing sentiment for keywords: {search_keywords}")
    print(f"Using sources: {search_sources}")
    
    try:
        # Get sentiment analysis results
        results = get_sentiment(search_keywords, search_sources)
        return {
            "keywords": search_keywords,
            "sources": search_sources,
            "results": results
        }
    except Exception as e:
        return {"error": str(e)}
