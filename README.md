# WebUI for Markdown eiditing

## Installation

```bash
# Using bun
bun install

# Or other package manager (will generate your own lock file)
npm install
```

## Running the app
```bash
bun dev
```

## Generating the API client (for development)
backend example:  [github link](https://github.com/fogelt/BackendMdViewer)
To fetch the latest backend spec and auto-generate the typed API client:
```bash
# Assumed to be running on localhost:8080 (See package.json)
bun generate-api
```

