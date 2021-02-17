const config = require('./config')

module.exports = {
  locals: {
    title: config.BASE_SITE_TITLE,
    description: config.META_DESCRIPTION,
  }
}
