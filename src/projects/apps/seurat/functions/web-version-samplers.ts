import createWebVersionSampler from './create-web-version-sampler'

const tmpTone = require('../assets/sounds/test/test-tone-1.mp3')

const testTones = {
  'C2': require('../assets/sounds/test/test-tone-1.mp3'),
  'C#2': require('../assets/sounds/test/test-tone-2.mp3'),
  'D2': require('../assets/sounds/test/test-tone-3.mp3'),
  'D#2': require('../assets/sounds/test/test-tone-4.mp3'),
  'E2': require('../assets/sounds/test/test-tone-5.mp3'),
  'F2': require('../assets/sounds/test/test-tone-6.mp3'),
  'F#2': require('../assets/sounds/test/test-tone-7.mp3'),
  'G2': require('../assets/sounds/test/test-tone-8.mp3'),
  'G#2': require('../assets/sounds/test/test-tone-9.mp3'),
  'A2': require('../assets/sounds/test/test-tone-10.mp3'),
  'A#2': require('../assets/sounds/test/test-tone-11.mp3'),
  'B2': require('../assets/sounds/test/test-tone-12.mp3'),
  'C3': require('../assets/sounds/test/test-tone-13.mp3'),
  'C#3': require('../assets/sounds/test/test-tone-14.mp3'),
  'D3': require('../assets/sounds/test/test-tone-15.mp3'),
  'D#3': require('../assets/sounds/test/test-tone-16.mp3'),
}

function webVersionSamplers() {
  return {
    amp: createWebVersionSampler(tmpTone),
    sax: createWebVersionSampler(tmpTone),
    turntable: createWebVersionSampler(tmpTone),
    drum: createWebVersionSampler(tmpTone),
    bells: createWebVersionSampler(testTones), /***/
    piano: createWebVersionSampler(tmpTone),
    guitars: createWebVersionSampler(tmpTone),
  }
}

export default webVersionSamplers
