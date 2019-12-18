import { titleCase } from 'voca'
import { Theme } from '../store/types'

function getThemeTitle(theme: Theme) {
  return titleCase(theme.replace(/-/g, ' / ')) + ' Frame'
}

export default getThemeTitle
