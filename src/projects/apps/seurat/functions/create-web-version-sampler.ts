import { reduce } from 'lodash'
const Tone = require('tone') // No @types!!

function createWebVersionSampler(soundAssignments: any) {
  // const soundAssignments = reduce(sounds, (acc: any, sound: string, index: number) => {
  //   acc[index + 1] = sound
  //   return acc
  // }, {})

  const sampler = new Tone.Sampler(soundAssignments).toMaster()

  return {
    play: function(noteNumber: number) {
      sampler.triggerAttack('C2') // TODO: Why is this repitching when the note numbers match??
    },

    stop: function(noteNumber: number) {
      sampler.triggerRelease(noteNumber)
    },
  }
}

export default createWebVersionSampler
