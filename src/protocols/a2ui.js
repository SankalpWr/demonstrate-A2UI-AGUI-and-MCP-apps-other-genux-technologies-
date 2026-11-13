export function a2uiMessage(mode) {
  return {mimeType:'application/a2ui+json', surfaceId:`lecture-${mode}`, createSurface:{catalog:'lecture-catalog', mode, dataModel:{status:'demo'}}};
}
