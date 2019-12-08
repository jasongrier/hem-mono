import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

function SideLeft(): ReactElement {
  const { description, imageUrl } = useSelector((state: RootState) => ({
    description: state.app.product.description,
    imageUrl: state.app.product.imageUrl,
  }))

  return (
    <div className="zw-left">
      <div className="zw-info">
        <div className="zw-image-container">
          <div
            className="zw-image"
            style={{
              backgroundImage: `url(${imageUrl})`,
            }}
          />
        </div>
        <div className="zw-description-container">
          <div
            className="zw-description"
            dangerouslySetInnerHTML={{__html: description}}
          />
        </div>
      </div>
    </div>
  )
}

export default SideLeft
