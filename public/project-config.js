var projectConfig = { PROJECT_TYPE: 'sites', PROJECT_NAME: 'simple' }

if (typeof window !== 'undefined') {
  window.env = projectConfig
}

if (typeof module !== 'undefined') {
  module.exports = projectConfig
}
