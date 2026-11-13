import {validateTree} from './catalog.js';

export const examples = {
  static: {mode:'static', tree:{type:'Card',title:'Static dashboard',children:[{type:'Metric',label:'Orders',value:'128'},{type:'Button',label:'Refresh',action:'refresh'}]}},
  declarative: {mode:'declarative', tree:{type:'Stack',children:[{type:'Text',text:'Declarative UI is data, not executable code.'},{type:'Input',name:'email',label:'Email'},{type:'Button',label:'Subscribe',action:'submit'}]}},
  openEnded: {mode:'open-ended', tree:{type:'Card',title:'Agent-proposed answer',children:[{type:'Text',text:'The renderer validates this tree against its catalog.'},{type:'Table',columns:['Signal','Value'],rows:[['Latency','42 ms'],['Status','Healthy']]}]}},
  mixed: {mode:'mixed', tree:{type:'Card',title:'Fixed shell + generated slot',children:[{type:'Text',text:'The navigation and approval boundary are fixed.'},{type:'Metric',label:'Generated insight',value:'High intent'},{type:'Button',label:'Approve',action:'approve'}]}}
};

export function getMode(mode) { const item = examples[mode] || examples.mixed; validateTree(item.tree); return item; }
