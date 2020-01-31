import React, { ReactElement } from 'react'
import { reduce } from 'lodash'
import ItemRow from './ItemRow'

declare const COLLECTIONS_WIDGET_PRODUCTS: string
declare const COLLECTIONS_WIDGET_COLLECTION: string
declare const PDP_WIDGET_PRODUCT_OPTIONS_WITH_VALUES: any[]

const collection = JSON.parse(COLLECTIONS_WIDGET_COLLECTION)
const items = JSON.parse(COLLECTIONS_WIDGET_PRODUCTS)
const options = reduce(PDP_WIDGET_PRODUCT_OPTIONS_WITH_VALUES, (acc, optsString, id) => {
  acc[id] = JSON.parse(optsString)
  return acc
}, {} as any)

function App(): ReactElement {
  return (
    <div className="hem-application">
      {items.reverse().map((item: any) => (
        <ItemRow
          collection={collection}
          item={item}
          key={item.id}
          options={options}
        />
      ))}
    </div>
  )
}

export default App
