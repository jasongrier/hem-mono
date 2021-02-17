import contentRoutes from './content'
import internalRoutes from './internal'
import staticRoutes from './static'

export default [
  ...contentRoutes,
  ...internalRoutes,
  ...staticRoutes,
]
