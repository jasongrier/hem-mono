const articles = require('./data')

module.exports = {
  STATIC_RENDER: [
    '/',
    'not-found',
    ...articles.map(article => article.slug)
  ]
}
