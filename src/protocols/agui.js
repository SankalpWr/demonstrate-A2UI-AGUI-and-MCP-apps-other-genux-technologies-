export function aguiEvents(mode) {
  return [
    {type:'RUN_STARTED',runId:'demo-run'},
    {type:'TEXT_MESSAGE_CONTENT',delta:`AG-UI event stream for ${mode}`},
    {type:'STATE_SNAPSHOT',snapshot:{mode,approved:false}},
    {type:'RUN_FINISHED',runId:'demo-run'}
  ];
}
