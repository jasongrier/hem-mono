const { Clock } = require('../../../../common/workers')

(function init() {
  new Clock(() => {
    console.log('tick')
  })
}())
