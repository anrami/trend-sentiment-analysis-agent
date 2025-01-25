from langchain_openai import ChatOpenAI
from langchain_community.tools.tavily_search import TavilySearchResults
from langchain_core.messages import HumanMessage
from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt import create_react_agent
from dotenv import load_dotenv
import os

load .env
load_dotenv()
OPENAI_API_KEY = os.environ["OPENAI_API_KEY"]
TAVILY_API_KEY = os.environ["TAVILY_API_KEY"]

#Create the agent
memory = MemorySaver()
model = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0, openai_api_key=OPENAI_API_KEY)  # Use "gpt-4" or "gpt-3.5-turbo"
search = TavilySearchResults(max_results=2)
tools = [search]
agent_executor = create_react_agent(model, tools, checkpointer=memory)

#define keyword/news sources
sentimentKeyword = "AI Agents"
newsSources = ['Reddit']
formattedNewsSources = newsSources.
#Use the agent
config = {"configurable": {"thread_id": "abc123"}}
for chunk in agent_executor.stream(
    {"messages": [HumanMessage(content=f"You are a guru on sentimate analysis, can you look on these news sources: {newsSources} and report to me what the overall sentiment based on the last ten posts for {sentimentKeyword}, is it positive or negative and to what percentage?")]}, config
):
    print(chunk)
    print("----")