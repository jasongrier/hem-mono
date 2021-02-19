import { intersection } from 'lodash'
import { PROJECT_CONFIGS as UNTYPED_PROJECT_CONFIGS } from '../../../config'

const PROJECT_CONFIGS = UNTYPED_PROJECT_CONFIGS as any

function selectableCategories(categories: string[], currentProject: string) {
  const categoriesConfig = PROJECT_CONFIGS[currentProject].CATEGORIES

  if (categoriesConfig === '*') {
    return categories
  }

  else {
    return intersection(categoriesConfig, categories)
  }
}

export default selectableCategories
