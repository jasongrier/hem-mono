export const getRendererAppUtils = () => {
  return window['require']('electron').remote.getGlobal('rendererAppUtils')
}