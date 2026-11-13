# YouTube scripts

Each segment is designed for 3–5 minutes. Record the browser and terminal side by side. Use the same sequence for every part: concept → code files → run command → four modes → safety takeaway.

## Part 1 — A2UI

Say: “A2UI lets the agent describe an interface while the host owns native rendering.” Open `src/protocols/a2ui.js`, run `npm start`, select A2UI, and show all four modes. Point to the surface ID, catalog, and data model. End by explaining that messages are data, not arbitrary browser code.

## Part 2 — AG-UI

Say: “AG-UI is the event bridge between an agent and a user-facing application.” Open `src/protocols/agui.js`, run the example, and show the run lifecycle and state snapshot. Explain that AG-UI can carry or coordinate another generative UI format. Demonstrate static, declarative, open-ended, and mixed policies as event payloads.

## Part 3 — MCP Apps

Say: “An MCP App is a tool plus a UI resource.” Open `src/protocols/mcp-apps.js`, show the `ui://` resource URI and tool metadata, then run all four modes. Explain host-mediated communication and sandboxing. Contrast a fixed tool view with an agent-generated dashboard slot.

## Part 4 — JSON-render

Say: “JSON-render makes the catalog and renderer explicit.” Open `catalog.js` and `json-render.js`; deliberately change a component type in the browser payload if demonstrating the validator from the terminal. Run all modes and show that unsupported components must fail validation.

## Part 5 — OpenUI

Say: “OpenUI uses a constrained UI language rather than verbose JSON.” Open `openui.js`, show the source returned for each mode, then compare it with the rendered tree. Explain parsing, streaming, recovery, and the need for host-owned actions.

## Part 6 — Harness integration

Say: “A harness turns generation into a repeatable execution loop.” Open `harness.js`, show the five steps, and run each mode. Explain that the harness should log the request, selected adapter, validation result, rendered output, and user action without logging secrets.

## Closing

Say: “The engineering pattern is consistent: fixed safety boundaries, typed tools, validated UI descriptions, and explicit event traces. Protocol choice determines interoperability; mode choice determines how much UI authority the model receives.”
