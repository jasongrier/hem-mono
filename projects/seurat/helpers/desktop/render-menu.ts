import {Menu} from 'electron'

export const renderMenu = (template) => {
  const menu = Menu.buildFromTemplate(template as any)
  Menu.setApplicationMenu(menu)
  return menu
}