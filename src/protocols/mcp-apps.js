export function mcpApp(mode) {
  return {tool:{name:'show_lecture_view',description:'Render a lecture view',inputSchema:{type:'object',properties:{mode:{type:'string'}}},_meta:{'ui/resourceUri':'ui://lecture/view'}},resource:{uri:'ui://lecture/view',mimeType:'text/html',mode}};
}
