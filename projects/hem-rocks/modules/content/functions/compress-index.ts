import { isEmpty } from 'lodash'
import modelize from './modelize'

function compressIndex(index: any) {
  const defaults = modelize({}) as any
  const compressedIndex: any[] = []
  
  for (const item of index) {
    const compressedItem: any = {}
    
    for (const fieldName in item) {
      if (
        typeof item[fieldName] === 'boolean'
        && defaults[fieldName] !== item[fieldName]
      ) {
        compressedItem[fieldName] = item[fieldName]
      }

      else if (item[fieldName].length) {
        compressedItem[fieldName] = item[fieldName]
      }
    }
    
    compressedIndex.push(compressedItem)
  }

  return compressedIndex
}

export default compressIndex
