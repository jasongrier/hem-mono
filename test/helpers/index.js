async function delay(time) {
  return new Promise(function(resolve) {
    setTimeout(resolve, time)
  })
}

async function screenshotAfterdelay(page, time) {
  await delay(time)
  await page.screenshot({path: __dirname + '/test.png'})
}

export {
  delay,
  screenshotAfterdelay,
}
