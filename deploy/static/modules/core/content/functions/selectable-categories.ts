import { intersection } from 'lodash'
import { alphabeticalAscSort } from '../../../../functions'
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

  return alphabeticalAscSort(finalCategories)
}

export default selectableCategories
