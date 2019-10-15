import { reduce } from 'lodash'
const Tone = require('tone') // No @types!!
const config = require('../config')

const aTwoMp = require('../assets/sounds/A2.mp3')
const aTwoOg = require('../assets/sounds/A2.ogg')

function createWebVersionSamplerFromTonePlayer(sounds: string[]) {
  var ampEnv = new Tone.AmplitudeEnvelope({
    attack: 0.5,
    decay: 1.0,
    sustain: 1.0,
    release: 1.0
  }).toMaster()

  return reduce(sounds, (acc: any, sound: string, index: number) => {
    const sampler = {
      // sampler: new Tone.Player(sound).toMaster(),
      sampler: new Tone.Player(sound).connect(ampEnv),
      envelope: ampEnv,
    }
    acc[index + 1] = sampler
    return acc
  }, [])
}

function createWebVersionSamplerFromToneSampler(sounds: string[]) {
  const soundAssignments = reduce(sounds, (acc: any, sound: string, index: number) => {
    acc[index + 1] = sound
    return acc
  }, {})

  return new Tone.Sampler({
    // ...soundAssignments,
    'A2': aTwoMp,
  }).toMaster()
}

function createWebVersionSampler(sounds: string[]) {
  let playFn
  let stopFn

  if (config.SAMPLER_TYPE === 'player') {
    const sampler = createWebVersionSamplerFromTonePlayer(sounds)

    setTimeout(() => {
      sampler[1].sampler.start()
    }, 500)

    playFn = function(noteNumber: number) {
      sampler[noteNumber].envelope.triggerRelease()
      sampler[noteNumber].envelope.triggerAttackRelease()
    }

    stopFn = function(noteNumber: number) {
      sampler[noteNumber].stop()
    }
  }

  else if (config.SAMPLER_TYPE === 'sampler') {
    const sampler = createWebVersionSamplerFromToneSampler(sounds)

    playFn = function(noteNumber: number) {
      sampler.triggerAttack('A2') // TODO: Why is this repitching when the note numbers match??
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
