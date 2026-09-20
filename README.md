# WebUI for Markdown editing

This application follows the design principles outlined in [Bulletproof React](https://github.com/alan2207/bulletproof-react) to ensure a scalable React application architecture.

## Installation

```bash
# Using bun
bun install

# Or using another package manager
npm install
```

## Running the app

```bash
bun dev
```

## Generating the API client

This project utilizes a backend-first development approach. See the backend example repository here: [BackendMdViewer](https://github.com/fogelt/BackendMdViewer).

To fetch the latest backend specification and automatically generate the typed API client, run:

```bash
# Assumes the backend is running on localhost:8080 (see package.json)
bun generate-api
```
