import { Theme } from '../store/types'

function isThemeEyeglass(theme: Theme) {
  return theme.split('-')[0] === 'eyeglass'
}

export default isThemeEyeglass
