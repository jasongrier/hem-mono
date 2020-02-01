import React, { ReactElement } from 'react'
import { reduce } from 'lodash'
import { trim } from 'voca'
import romanNumeralToDecimal from 'roman-numeral-to-decimal'
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

const itemsSorted = items.sort((a, b) => {
  const numeralA = romanNumeralToDecimal(trim(a.title.replace(collection.title, '')))
  const numeralB = romanNumeralToDecimal(trim(b.title.replace(collection.title, '')))
  return numeralB - numeralA
})

function App(): ReactElement {
  return (
    <div className="hem-application">
      {itemsSorted.map((item: any) => (
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
