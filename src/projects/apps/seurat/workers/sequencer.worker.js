const Clock = require('../../../../common/workers/Clock')
const Sequencer = require('./Sequencer')

const sequencer = new Sequencer()

const clock = new Clock(() => {
  process.send({ type: 'beat', data: sequencer.getNotes() })
})

clock.start()
