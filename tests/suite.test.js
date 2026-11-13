import test from 'node:test';
import assert from 'node:assert/strict';
import {getMode} from '../src/protocols/modes.js';
import {validateTree} from '../src/protocols/catalog.js';
import {aguiEvents} from '../src/protocols/agui.js';

for (const mode of ['static','declarative','openEnded','mixed']) test(`mode ${mode} validates`, () => assert.ok(validateTree(getMode(mode).tree)));
test('unknown component is rejected', () => assert.throws(() => validateTree({type:'Script', code:'alert(1)'})));
test('AG-UI stream has lifecycle', () => assert.deepEqual(aguiEvents('mixed').map(e=>e.type), ['RUN_STARTED','TEXT_MESSAGE_CONTENT','STATE_SNAPSHOT','RUN_FINISHED']));
