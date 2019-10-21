const Tone = require('tone') // No @types!!
import { testTones } from '../../data/sounds'

function createSampler(soundAssignments: any) {
  const sampler = new Tone.Sampler(soundAssignments).toMaster()

  return {
    play: function(noteNumber: number) {
      sampler.triggerAttackRelease(noteNumber, .125)
    },

    stop: function(noteNumber: number) {
      sampler.triggerRelease(noteNumber)
    },
  }
}

function setupBuiltInSounds() {
  return {
    amp: createSampler(testTones),
    bells: createSampler(testTones),
    drum: createSampler(testTones),
    guitars: createSampler(testTones),
    piano: createSampler(testTones),
    sax: createSampler(testTones),
    turntable: createSampler(testTones),
  }
}

export default setupBuiltInSounds
