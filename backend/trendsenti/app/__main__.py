import uvicorn
from app.src.main import app

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)