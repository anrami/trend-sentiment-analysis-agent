project := .
app	 := $(project)/app
src	 := $(app)/src
run     := poetry run uvicorn
python  := $(run) python

.PHONY: install update run test clean

# Install project dependencies
install:
	poetry install

# Update dependencies
update:
	poetry update

# Run the FastAPI application
run:
	poetry run uvicorn app.src.main:app --reload

# Run tests
test:
	poetry run pytest tests/

# Run linting checks
lint:
	poetry run flake8 $(APP_DIR)
	poetry run mypy $(APP_DIR)

# Format code
format:
	poetry run black $(APP_DIR)
	poetry run isort $(APP_DIR)

# Run tests
test:
	poetry run pytest

# Clean up virtual environment and cache
clean:
	poetry env remove --all
	find . -type d -name "__pycache__" -exec rm -rf {} +
	find . -type f -name "*.pyc" -delete
