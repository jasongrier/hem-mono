const config = require('./config')

module.exports = {
  locals: {
    // title: config.BASE_SITE_TITLE,
    title: __dirname,
    description: config.META_DESCRIPTION,
  }
}
