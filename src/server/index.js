import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {getMode} from '../protocols/modes.js';
import {renderTree} from '../protocols/catalog.js';
import {a2uiMessage} from '../protocols/a2ui.js';
import {aguiEvents} from '../protocols/agui.js';
import {mcpApp} from '../protocols/mcp-apps.js';
import {jsonRenderPayload} from '../protocols/json-render.js';
import {openUiSource} from '../protocols/openui.js';
import {harnessPlan} from '../protocols/harness.js';

const root = path.dirname(fileURLToPath(import.meta.url));
const json = value => JSON.stringify(value, null, 2);
const server = http.createServer(async (req,res) => {
  const url = new URL(req.url, 'http://localhost');
  if (url.pathname === '/api/example') {
    const topic = url.searchParams.get('topic') || 'a2ui'; const mode = url.searchParams.get('mode') || 'mixed';
    const item = getMode(mode); const common = {topic, mode, tree:item.tree, html:renderTree(item.tree)};
    const payload = topic === 'a2ui' ? {...common, protocol:a2uiMessage(mode)} : topic === 'agui' ? {...common, protocol:aguiEvents(mode)} : topic === 'mcp-apps' ? {...common, protocol:mcpApp(mode)} : topic === 'json-render' ? {...common, protocol:jsonRenderPayload(mode,item.tree)} : topic === 'openui' ? {...common, protocol:openUiSource(mode)} : {...common, protocol:harnessPlan(mode)};
    res.writeHead(200, {'content-type':'application/json'}); return res.end(json(payload));
  }
  const file = url.pathname === '/' ? '/index.html' : url.pathname;
  try { const body = await readFile(path.join(root,'../../public',file)); res.writeHead(200, {'content-type':file.endsWith('.js')?'text/javascript':'text/html'}); res.end(body); } catch { res.writeHead(404); res.end('Not found'); }
});
server.listen(8787, () => console.log('GenUX lecture suite: http://localhost:8787'));
