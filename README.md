# GenUX Lecture Suite

A runnable, dependency-light teaching repository for agent-generated user experiences. It progressively demonstrates:

- A2UI
- AG-UI
- MCP Apps
- Open-JSON-UI / JSON-render-style rendering
- OpenUI Lang
- coding-harness integration, using the supplied simple-coding-harness reference as the conceptual model

Every topic includes four modes: **static** (fixed components), **declarative** (validated UI description), **open-ended** (agent-proposed UI tree), and **mixed** (fixed shell plus constrained generated slots). The examples run without an API key so the lecture can be recorded locally.

## Run

```bash
cd genux-lecture-suite
npm start
# open http://localhost:8787
```

Run checks:

```bash
npm test
npm run lint
```

## Repo map

`src/protocols/` contains small protocol adapters and validators. `src/examples/` contains one example for every topic/mode combination. `public/index.html` is the interactive lecture dashboard. `docs/` contains the complete codelab walkthrough, mode matrix, and one YouTube script per topic plus a master recording plan.

## Important teaching point

The renderer owns executable behavior and the component catalog. Agents return data or constrained UI descriptions; they do not send arbitrary JavaScript to the browser. AG-UI carries events, while A2UI, MCP Apps, Open-JSON-UI, and OpenUI describe different ways to represent or deliver UI.

## GitHub and video

This folder is a GitHub-ready repository with CI. The scripts are recording-ready, but no GitHub or YouTube account is connected here, so publication must be done from the user's account.
