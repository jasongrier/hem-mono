import createWebVersionSampler from './create-web-version-sampler'
const testTone = require('../assets/sounds/test-tone.mp3')

function webVersionSamplers() {
  return {
    amp: createWebVersionSampler([testTone]),
    sax: createWebVersionSampler([testTone]),
    turntable: createWebVersionSampler([testTone]),
    drum: createWebVersionSampler([testTone]),
    bells: createWebVersionSampler([testTone]),
    piano: createWebVersionSampler([testTone]),
    guitars: createWebVersionSampler([testTone]),
  }
}

export default webVersionSamplers
