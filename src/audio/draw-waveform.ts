import { noop } from 'lodash'

async function drawWaveform(numBars: number, logger: (payload: {msg: string, data?: any}) => void = noop) {
  const audioContext = new AudioContext()
  const audioBufferSouceNode = audioContext.createBufferSource()
  const analyser = audioContext.createAnalyser()

  audioBufferSouceNode.connect(analyser)
  analyser.connect(audioContext.destination)
  logger({msg: 'setup'})

  const res = await fetch('/tmp/1-takeoff-berlin.wav')
  logger({msg: 'fetch'})

  const audioData = await res.arrayBuffer()
  logger({msg: 'spool'})

  const buffer = await audioContext.decodeAudioData(audioData)
  logger({msg: 'decode'})

  audioBufferSouceNode.buffer = buffer
  // audioBufferSouceNode.start(0)
  logger({msg: 'play'})

  const leftChannelData = buffer.getChannelData(0)
  // const rightChannelData = buffer.getChannelData(1)

  const stepSize = leftChannelData.length / numBars
  let amplitudes: number[] = []

  for (let i = 0; i < leftChannelData.length; i += stepSize) {
    amplitudes.push(leftChannelData[Math.round(i)])
  }

  return new Promise((resolve) => {
    resolve(amplitudes)
  })
}

export default drawWaveform
