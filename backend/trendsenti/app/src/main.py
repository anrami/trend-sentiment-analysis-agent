from fastapi import FastAPI, Query
import requests
from typing import Optional
from bs4 import BeautifulSoup
import urllib.parse

app = FastAPI(
    title="Google Search API",
    description="A simple FastAPI endpoint to perform Google searches"
)

@app.get("/search")
async def search_google(
    query: Optional[str] = Query(
        default=None, 
        description="Search query to search on Google"
    )
):
    """
    Perform a Google search and return top search results.
    
    - **query**: Search term to look up on Google
    - Returns a dictionary of search results
    """
    if not query:
        return {"error": "No query provided"}
    
    # Encode the query for URL
    encoded_query = urllib.parse.quote(query)
    
    # Set up headers to mimic a browser request
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
            "query": query,
            "results": results
        }
    
    except requests.RequestException as e:
        return {"error": f"Search request failed: {str(e)}"}
