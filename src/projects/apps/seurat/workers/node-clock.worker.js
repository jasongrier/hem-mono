const { startClock } = require('../../../../common/workers/clock.worker')

startClock((timestamp) => {
  process.send({ type: 'tick', data: timestamp })
})
