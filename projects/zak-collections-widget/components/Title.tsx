import React, { ReactElement } from 'react'
import { productClicked } from '../functions'

interface IProps {
  collectionTitle: string
  currentThemeHandle: string
  item: any
}

function Title({ collectionTitle, currentThemeHandle, item }: IProps): ReactElement {
  return (
    <div className="zw-item-title">
      <a
        href="#"
        onClick={() => {
          productClicked(item, currentThemeHandle)
        }}
      >
        <h2>{item.title.replace(collectionTitle, '')}</h2>
        <p>{ item.tags[0] }</p>
      </a>
    </div>
  )
}

export default Title
