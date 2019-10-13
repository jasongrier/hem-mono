import Tone from 'tone'
const testTone = require('../assets/sounds/Sine-1000Hz-300ms.mp3')

function webVersionSamplers() {
  return {
    amp: new Tone.Sampler({
      'C4': testTone,
    }).toMaster(),

    sax: new Tone.Sampler({
      'C4': testTone,
    }).toMaster(),

    turntable: new Tone.Sampler({
      'C4': testTone,
    }).toMaster(),

    drum: new Tone.Sampler({
      'C4': testTone,
    }).toMaster(),

    bells: new Tone.Sampler({
      'C4': testTone,
    }).toMaster(),

    piano: new Tone.Sampler({
      'C4': testTone,
    }).toMaster(),

    guitars: new Tone.Sampler({
      'C4': testTone,
    }).toMaster(),
  }
}

export default webVersionSamplers
