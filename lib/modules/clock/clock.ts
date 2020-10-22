import { compact } from 'lodash'

type IClockSubscriber = (time: number, beatNumber: number, audioContext: AudioContext) => void

const LOOKAHEAD = 25.0
const NOTE_LENGTH = 0.05
const SCHEDULE_AHEAD_TIME = 0.1
const TEMPO = 120.0

let audioContext: AudioContext | null = null
let current16thNote: number = 0
let playing: boolean = false
let nextNoteTime: number = 0.0
let sounds: boolean = false
let subscribers: Array<IClockSubscriber | null> = []
let timerWorker: Worker | null = null
let unlocked: boolean = false

const workerSrc = `
  let interval = 100
  let timerID = null

  self.onmessage = function (evt) {
    if (evt.data === 'start') {
      timerID = setInterval(function() {
        postMessage('tick')
      }, interval)

      postMessage('Clock worker: Started.')
    }

    else if (evt.data.interval) {
      interval = evt.data.interval

      if (timerID) {
        clearInterval(timerID)

        timerID = setInterval(function() {
          postMessage('tick')
        }, interval)
      }

      postMessage('Clock worker: Interval is now ' + evt.data.interval)
    }

    else if (evt.data === 'stop') {
      clearInterval(timerID)
      timerID = null

      postMessage('Clock worker: Stopped.')
    }
  }
`

export function beep(time: number) {
  if (!audioContext) return

  const osc = audioContext.createOscillator()

  osc.connect(audioContext.destination)

  if (current16thNote % 16 === 0) {
    osc.frequency.value = 880.0
  }

  else if (current16thNote % 4 === 0 ) {
    osc.frequency.value = 440.0
  }

  else {
    osc.frequency.value = 220.0
  }

  osc.start(time)
  osc.stop(time + NOTE_LENGTH)
}

export function subscribe(subscriber: IClockSubscriber) {
  subscribers.push(subscriber)
  return subscribers.length - 1
}

export function unsubscribe(subscriberNumber: number) {
  subscribers[subscriberNumber] = null
  subscribers = compact(subscribers)
}

function tick(time: number) {
  for (const subscriber of subscribers) {
    if (!audioContext) continue
    subscriber && subscriber(time, current16thNote, audioContext)
  }
}

function scheduler() {
  if (!audioContext) return

  while (nextNoteTime < audioContext.currentTime + SCHEDULE_AHEAD_TIME) {
    tick(nextNoteTime)

    if (sounds) {
      beep(nextNoteTime)
    }

    nextNoteTime += 0.25 * 60.0 / TEMPO
    current16thNote ++

    if (current16thNote === 16) {
      current16thNote = 0
    }
  }
}

export function toggle() {
  if (!audioContext) return
  if (!timerWorker) return

  if (!unlocked) {
    const buffer = audioContext.createBuffer(1, 1, 22050)
    const node = audioContext.createBufferSource()
    node.buffer = buffer
    node.start(0)
    unlocked = true
  }

  playing = !playing

  if (playing) {
    current16thNote = 0
    nextNoteTime = audioContext.currentTime
    timerWorker.postMessage('start')
  }

  else {
    timerWorker.postMessage('stop')
  }
}

export function init() {
  const workerBlob = new Blob([workerSrc], { type: 'application/javascript' })

  audioContext = new AudioContext()
  timerWorker = new Worker(URL.createObjectURL(workerBlob))

  timerWorker.onmessage = function(evt) {
    if (evt.data === 'tick') {
      scheduler()
    }

    else {
      console.log(evt.data)
    }
  }

  timerWorker.postMessage({ interval: LOOKAHEAD })
}

export function getState() {
  return { playing, sounds }
}

export function toggleSounds() {
  sounds = !sounds
}
