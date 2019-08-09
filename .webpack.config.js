module.exports = config => {
  if (process.env.PROJECT_TYPE === 'app') {
    console.log('************************')
    console.log('************************')
    console.log('************************')
    console.log('************************')
    config.target = 'electron-renderer'
  }

  return config
}