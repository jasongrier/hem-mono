const NanoTimer = require('nanotimer')
let interval

function startClock(onTick) {
  const timer = new NanoTimer()

  interval = timer.setInterval(() => {
    onTick()
  }, '', 20.833333333 + 'm')
}

function stopClock() {
  timer.clearInterval(interval)
}

module.exports = { startClock, stopClock }
