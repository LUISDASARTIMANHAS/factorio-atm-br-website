# Copilot instructions

## Repository context

This repo is a plain HTML/CSS/JavaScript static web app for browsing Factorio mods. Use the existing vanilla browser patterns instead of introducing frameworks, build tooling, or a different architecture.

## Core guidance

- Prefer small, readable ES module code.
- Keep API configuration centralized in `config.js`.
- Match the app’s existing DOM IDs and component structure in `index.html` and `components/`.
- Preserve the current state-driven rendering and pagination flow in `app.js`.
- Keep HTTP logic in `api-client.js`; do not scatter fetch calls across unrelated files.
- Prefer static verification via local server and browser checks over assumptions about runtime behavior.

## Local run

There is no `package.json` or bundler setup in this repo. Run the app with a simple static server such as:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/`.

## Limits

- Do not add npm dependencies or build scripts unless explicitly requested.
- Do not default to the `v2/` folder unless the task specifically asks for that version.
- Keep the change scope narrow and aligned with the existing structure.
