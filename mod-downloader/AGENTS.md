# AGENTS.md

## Project overview

This repository is a static browser app for browsing and downloading Factorio mods from a remote API. The app is implemented as plain HTML, CSS, and ES modules; there is no framework, no build step, and no package manifest in the repo.

Primary entry points:

- `index.html` — app shell and DOM structure
- `app.js` — main orchestration, filters, pagination, and lifecycle
- `api-client.js` — HTTP calls to the backend API
- `config.js` — runtime URLs and backend configuration
- `components/` — reusable UI builders and renderers
- `state.js` — shared state helpers if used by the app
- `v2/` — alternate version of the UI, not the main implementation unless explicitly asked to work there

## How to run locally

Because this is a static site, run it from a local HTTP server instead of opening files directly in the browser.

Preferred options:

- `python -m http.server 8000` from the repo root
- any static file server such as VS Code Live Server

Then open:

- `http://localhost:8000/`

Do not assume there is a Node or npm workflow. There is no `package.json` for this project.

## Architecture conventions

- Prefer ES modules (`import` / `export`) and keep browser-compatible JavaScript.
- Keep logic organized by responsibility:
  - network access in `api-client.js`
  - app state and rendering flow in `app.js`
  - reusable UI in `components/`
  - global constants and API URLs in `config.js`
- Preserve the existing DOM structure and IDs used by the app, especially in `index.html` and the status widgets.
- Reuse existing utility functions before introducing new abstractions.
- Keep CSS changes in `style.css` unless a specific component has a dedicated stylesheet.

## Coding expectations

- Follow modern web standards and semantic HTML.
- Keep accessibility in mind: labels, meaningful text, and non-visual fallbacks where relevant.
- Add JSDoc comments for functions when the code is being extended or created.
- Prefer small, focused functions over large monolithic ones.
- When changing server status or API behavior, keep error handling consistent with the existing pattern in `api-client.js` and related UI code.
- Avoid introducing frameworks or build tooling unless explicitly requested.

## Project-specific notes

- API and server URLs are centralized in `config.js`; use those instead of hardcoding endpoints in new files.
- The app depends on remote backend endpoints; verify whether any changes affect the contract before editing API calls.
- Search and pagination are state-driven; when editing filters or rendering logic, keep the `state` object and pagination flow in sync.
- The repo appears to have a production UI and a separate experimental `v2/` folder; default to the main app unless a request specifically targets `v2`.

## Safe change strategy

When making changes:

1. Read the relevant feature entry point first (`app.js`, `api-client.js`, or the matching component).
2. Match the existing conventions for naming, state management, and DOM updates.
3. Keep changes limited to the feature being edited.
4. Verify behavior in the browser by running a local static server and checking the affected flow.

## Useful references

- `index.html` for markup and section IDs
- `config.js` for environment configuration
- `app.js` for pagination/search flow and app lifecycle
- `api-client.js` for API contracts and error handling
- `components/` for reusable UI patterns and rendering helpers
