export interface IProjectConfig {
  SITE_TITLE: string
  GLOBALS: any
  APP_TYPE: 'browser' | 'desktop'
  PORT: number
  HTML_HEAD_INSERT: string
  NODE_DEPENDENCIES: string[]
}