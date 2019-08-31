const Clock = require('../../../../common/workers/Clock')

const clock = new Clock(() => {
  process.send('tick')
})

clock.start()
