export const addRendererAppUtil = (name: string, util: Function | Object) => {
  global['rendererAppUtils'] = global['rendererAppUtils'] || {}
  global['rendererAppUtils'][name] = util
}