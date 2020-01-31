import React, { ReactElement } from 'react'

interface IProps {
  collectionTitle: string
  itemTagline: string
  itemTitle: string
}

function Title({ collectionTitle, itemTagline, itemTitle }: IProps): ReactElement {
  return (
    <div className="zw-item-title">
      <h2>{itemTitle.replace(collectionTitle, '')}</h2>
      <p>{ itemTagline }</p>
    </div>
  )
}

export default Title
