var projectConfig = { PROJECT_TYPE: 'apps', PROJECT_NAME: 'simple' }

if (typeof window !== 'undefined') {
  window.env = projectConfig
}

if (typeof module !== 'undefined') {
  module.exports = projectConfig
}
