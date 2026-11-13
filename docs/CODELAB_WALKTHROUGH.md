# GenUX codelab walkthrough

## 0. Mental model

There are two independent decisions:

1. **Transport/contract:** how the agent and UI communicate (AG-UI events, A2UI messages, MCP App tool/resource, JSON payload, OpenUI source).
2. **UX freedom:** how much control the model has (static, declarative, open-ended, or mixed).

This repo keeps a safe renderer-owned catalog in `src/protocols/catalog.js`. Every generated tree is validated before it reaches the browser.

## 1. Start the common renderer

```bash
npm install
npm start
```

Open `http://localhost:8787`, select a topic and mode, and click **Run example**. The left panel renders the UI; the right panel shows the protocol payload or harness plan.

## 2. Static mode

Static mode uses a fixed component tree selected by the application. In `src/protocols/modes.js`, the `static` tree is a Card with a Metric and Button. The agent can supply text/data, but cannot change the structure. This is ideal for stable approval, payment, and navigation flows.

Try: topic `a2ui`, mode `static`; then change topic to `mcp-apps` without changing the tree. The contract changes, while the UI freedom remains static.

## 3. Declarative mode

Declarative mode lets the agent propose a JSON tree from a known catalog. `validateTree()` rejects unknown components, missing required fields, excessive depth, and malformed children. `renderTree()` maps the safe tree to HTML. It is more flexible than static templates but remains bounded by the host.

Try: topic `json-render`, mode `declarative`. Explain that the payload is data; no executable JavaScript is accepted.

## 4. Open-ended mode

Open-ended mode gives the agent the broadest presentation freedom inside the catalog. The host still validates the tree and owns event handlers. In a production system, add quotas, component allowlists by tenant, moderation, and human approval for side effects.

Try: topic `openui`, mode `openEnded`. The OpenUI adapter returns a tiny language sample while the renderer remains host-owned. A real OpenUI integration would use the official language renderer and stream source incrementally.

## 5. Mixed mode

Mixed mode is the production default: the app fixes the shell, safety boundary, and actions while the agent fills a generated insight/table/card slot. `modes.js` demonstrates this with a fixed Card and Approve action plus an agent-generated Metric. This combines reliable UX with contextual generation.

Try every topic with mode `mixed` and compare the payloads. The same UX policy is carried by different protocols.

## 6. A2UI

`src/protocols/a2ui.js` emits an A2UI-style message containing a MIME type, surface ID, catalog, and data model. In a full implementation, the agent streams `createSurface` and component updates to an A2UI renderer; the native host renders components from its catalog. A2UI is a UI description protocol, not the transport for every application event.

Code path: dashboard → `/api/example` → `a2uiMessage()` → JSON displayed in the payload panel.

## 7. AG-UI

`src/protocols/agui.js` emits a short event stream: run started, text delta, state snapshot, and run finished. A real frontend subscribes to the stream and updates local state as events arrive. AG-UI is the interaction/event connection between frontend and agent; it can carry or coordinate a generative UI spec such as A2UI or Open-JSON-UI.

Code path: dashboard → `aguiEvents()` → event array → frontend event reducer in a production client.

## 8. MCP Apps

`src/protocols/mcp-apps.js` demonstrates the central pairing: an MCP tool plus a UI resource URI. The host calls the tool, resolves the declared `ui://` resource, and renders it in a sandboxed view. The tool remains the agent-facing capability; the resource is the user-facing view.

Code path: tool metadata → `ui://lecture/view` → host renders view → UI can call back through host-mediated tool calls.

## 9. JSON-render / Open-JSON-UI

`src/protocols/json-render.js` packages the validated tree as a versioned JSON specification. This is the simplest approach to explain in class: a schema-constrained tree, a registry, a renderer, and an action dispatcher. For a production integration, use the chosen library's official schema and React renderer instead of treating this teaching adapter as a drop-in implementation.

## 10. OpenUI

`src/protocols/openui.js` returns a compact OpenUI-Lang-like source example. The lecture point is that a constrained language can be more token-efficient and streamable than verbose JSON, but it still needs parsing, component allowlists, error recovery, and an application-owned action bridge.

## 11. Harness integration

`src/protocols/harness.js` models a coding-agent harness loop: receive request → select adapter → validate → render in sandbox → emit event and capture result. This mirrors the supplied simple-coding-harness reference conceptually, while keeping this repository self-contained. To connect a real harness, replace the first step with its session/event API and preserve validation and sandbox boundaries.

## 12. What to show during execution

For every topic, record four quick runs: static, declarative, open-ended, and mixed. Keep the browser on the same page, switch the selects, click Run, and explain what changed in the payload and what did not change in the renderer's safety boundary.
