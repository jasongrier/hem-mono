const zakTasks = require('../zak-pdp-widget/tasks')

module.exports = {
  preBuild: [],
  postBuild: [
    zakTasks.postBuild[0],
  ],
}
