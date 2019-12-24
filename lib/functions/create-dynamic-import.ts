import { createElement as e, SFC }  from 'react'
import { DynamicImport } from '../components'

function createDynamicImport(load: () => Promise<any>) {
  return function DynamicImportWrapper(props: any) {
    return e(DynamicImport, { load, props })
  }
}

export default createDynamicImport
