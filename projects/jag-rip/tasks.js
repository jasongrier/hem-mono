function jagRipPostBuild(devSession) {
  if (!devSession) {
    // do some production stuff
  }
}

module.exports = {
  preBuild: [],
  postBuild: [
    jagRipPostBuild,
  ],
}
