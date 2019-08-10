module.exports = config => {
  if (process.env.PROJECT_TYPE === 'app') {
    // config.target = 'electron-renderer'
  }

  return config
}