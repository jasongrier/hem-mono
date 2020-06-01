export const mouseTheta = (evt, el) => {
  const rect = el.getBoundingClientRect()
  const deltaX = evt.pageX - rect.left - rect.width / 2
  const deltaY = evt.pageY - rect.top - rect.height / 2
  const thetaR = Math.atan2(deltaY, deltaX)
  const thetaD = ((thetaR > 0 ? thetaR : (2 * Math.PI + thetaR)) * 360 / (2 * Math.PI))
  const thetaN = thetaD < 270 ? thetaD + 90 : thetaD - 270
  const thetaNF = thetaN === 0 ? 180 : thetaN === 180 ? 0 : thetaN
  return thetaNF
}