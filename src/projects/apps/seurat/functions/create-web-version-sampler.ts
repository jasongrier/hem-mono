import { reduce } from 'lodash'
const Tone = require('tone') // No @types!!
const config = require('../config')

function createWebVersionSamplerFromTonePlayer(sounds: string[]) {
  return reduce(sounds, (acc: any, sound: string, index: number) => {
    const sampler = new Tone.Player(sound).toMaster()
    // sampler.fadeIn = 0.125
    // sampler.fadeOut = 0.125
    acc[index + 1] = sampler
    return acc
  }, [])
}

function createWebVersionSamplerFromToneSampler(sounds: string[]) {
  const soundAssignments = reduce(sounds, (acc: any, sound: string, index: number) => {
    acc[index + 1] = sound
    return acc
  }, {})

  console.log(soundAssignments)

  return new Tone.Sampler({
    ...soundAssignments,
  }).toMaster()
}

function createWebVersionSampler(sounds: string[]) {
  let playFn
  let stopFn

  if (config.SAMPLER_TYPE === 'player') {
    const sampler = createWebVersionSamplerFromTonePlayer(sounds)

    playFn = function(noteNumber: number) {
      sampler[noteNumber].start()
    }

    stopFn = function(noteNumber: number) {
      sampler[noteNumber].stop()
    }
  }

  else if (config.SAMPLER_TYPE === 'sampler') {
    const sampler = createWebVersionSamplerFromToneSampler(sounds)

    playFn = function(noteNumber: number) {
      sampler.triggerAttack(noteNumber) // TODO: Why is this repitching when the note numbers match??
    }

    stopFn = function(noteNumber: number) {
      sampler.triggerRelease(noteNumber)
    }
  }

  return {
    play: playFn,
    stop: stopFn,
  }
}

export default createWebVersionSampler
