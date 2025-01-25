from fastapi import FastAPI, Query
import requests
from typing import Optional
from bs4 import BeautifulSoup
import urllib.parse
from .agent import get_sentiment

app = FastAPI(
    title="Google Search API",
    description="A simple FastAPI endpoint to perform Google searches"
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
    Perform advanced search with keywords and source filtering.
    
    - **keywords**: Search terms
    - **sources**: Optional sources to prioritize
    - Returns combined search results
    """
    if not keywords:
        return {"error": "No keywords provided"}
    
    if not sources:
        sources = {"error": "No sources provided"}
    
    # Prepare search terms
    search_keywords = [term.strip() for term in keywords.split(',')]
    search_sources = [source.strip() for source in (sources or '').split(',') if source.strip()]

    print(f"Searching for keywords: {search_keywords}")
    print(f"Searching in sources: {search_sources}")
    
    try:
        # Extract search results
        results = get_sentiment(search_keywords, search_sources)
        # TODO call sentiment analysis API or module
        return {
            "keywords": search_keywords,
            "sources": search_sources,
            "results": results
        }
    
    except requests.RequestException as e:
        return {"error": f"Search request failed: {str(e)}"}
