export const catalog = {
  Text: {required:["text"]}, Button: {required:["label","action"]}, Card: {required:["title","children"]},
  Stack: {required:["children"]}, Metric: {required:["label","value"]}, Table: {required:["columns","rows"]}, Input: {required:["name","label"]}
};

export function validateTree(node, depth=0) {
  if (!node || typeof node !== "object" || depth > 12) throw new Error("Invalid UI tree");
  if (!catalog[node.type]) throw new Error(`Unsupported component: ${node.type}`);
  for (const key of catalog[node.type].required) if (node[key] === undefined) throw new Error(`Missing ${key} on ${node.type}`);
  if (node.children) { if (!Array.isArray(node.children)) throw new Error("children must be an array"); node.children.forEach(child => validateTree(child, depth + 1)); }
  return node;
}

export function renderTree(node) {
  validateTree(node);
  const attrs = node.action ? ` data-action="${escapeHtml(node.action)}"` : "";
  if (node.type === "Text") return `<p>${escapeHtml(node.text)}</p>`;
  if (node.type === "Button") return `<button class="action"${attrs}>${escapeHtml(node.label)}</button>`;
  if (node.type === "Metric") return `<div class="metric"><small>${escapeHtml(node.label)}</small><strong>${escapeHtml(node.value)}</strong></div>`;
  if (node.type === "Input") return `<label>${escapeHtml(node.label)}<input name="${escapeHtml(node.name)}" /></label>`;
  if (node.type === "Table") return `<table><thead><tr>${node.columns.map(c=>`<th>${escapeHtml(c)}</th>`).join("")}</tr></thead><tbody>${node.rows.map(r=>`<tr>${r.map(c=>`<td>${escapeHtml(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
  return `<section class="${node.type.toLowerCase()}">${node.type === "Card" ? `<h3>${escapeHtml(node.title)}</h3>` : ""}${node.children.map(renderTree).join("")}</section>`;
}

function escapeHtml(value) { return String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c])); }
