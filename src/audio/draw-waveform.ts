import { noop } from 'lodash'

async function drawWaveform(logger: (payload: {msg: string, data?: any}) => void = noop) {
  logger({msg: 'loading'})

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
  const rightChannelData = buffer.getChannelData(1)

  return new Promise((resolve) => {
    logger({msg: 'loaded'})
    resolve({leftChannelData, rightChannelData})
  })
}

export default drawWaveform
