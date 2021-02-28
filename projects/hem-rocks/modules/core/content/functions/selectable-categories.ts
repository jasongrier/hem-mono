import { intersection } from 'lodash'
import { PROJECT_CONFIGS as UNTYPED_PROJECT_CONFIGS } from '../../../../config'

const PROJECT_CONFIGS = UNTYPED_PROJECT_CONFIGS as any

function selectableCategories(categories: string[], currentProject: string) {
  const categoriesConfig = PROJECT_CONFIGS[currentProject].CATEGORIES
  let finalCategories = []

  if (categoriesConfig === '*') {
    finalCategories = categories
  }

  else {
    finalCategories = intersection(categoriesConfig, categories)
  }

  finalCategories.sort((a, b) => {
    if(a < b) { return -1 }
    if(a > b) { return 1 }
    return 0
  })
}

export default selectableCategories
