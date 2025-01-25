# Trendsenti

## Overview
Trendsenti is a FastAPI-based search application that provides advanced search capabilities with potential for sentiment analysis.

## Prerequisites
- Python 3.9+
- Poetry
- Git

## Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd trendsenti
```

### 2. Install Poetry
```bash
curl -sSL https://install.python-poetry.org | python3 -
```

### 3. Install Dependencies
```bash
make install
```

## Development Commands

### Run Application
```bash
make run
```

### Run Tests
```bash
make test
```

### Code Formatting
```bash
make format
```

### Linting
```bash
make lint
```

### Update Dependencies
```bash
make update
```

### Clean Project
```bash
make clean
```

## Project Structure
- `app/`: Main application directory
  - `src/`: Source code
  - `__main__.py`: Entry point
- `pyproject.toml`: Project configuration
- `Makefile`: Development commands

## Contributing
1. Ensure code passes linting: `make lint`
2. Run tests: `make test`
3. Format code: `make format`