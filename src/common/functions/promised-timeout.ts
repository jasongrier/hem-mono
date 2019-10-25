async function promisedTimeout(time: number) {
  return new Promise(function(resolve) {
    setTimeout(resolve, time)
  })
}

export default promisedTimeout
