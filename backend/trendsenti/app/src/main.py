from fastapi import FastAPI, Query
import requests
from typing import Optional
from bs4 import BeautifulSoup
import urllib.parse

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
    
    # Headers to mimic browser request
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36'
    }
    
    try:
        # Perform the Google search
        url = f'https://www.google.com/search?q={encoded_query}'
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        
        # Parse the HTML
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Extract search results
        results = []
        for result in soup.select('.g'):
            title_elem = result.select_one('.r')
            link_elem = result.select_one('.r a')
            snippet_elem = result.select_one('.s')
            
            if title_elem and link_elem:
                results.append({
                    'title': title_elem.get_text(),
                    'link': link_elem['href'],
                    'snippet': snippet_elem.get_text() if snippet_elem else ''
                })
        
        return {
            "keywords": search_keywords,
            "sources": search_sources,
            "results": results
        }
    
    except requests.RequestException as e:
        return {"error": f"Search request failed: {str(e)}"}
