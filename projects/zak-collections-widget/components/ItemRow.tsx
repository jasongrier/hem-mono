import React, { ReactElement, useState } from 'react'
import Title from './Title'
import Image from './Image'
import Picker from './Picker'

interface IProps {
  collection: any
  item: any
  options: any
}

function ItemRow({ collection, item, options }: IProps): ReactElement {
  const [currentVariantId, setCurrentVariantId] = useState(item.variants[0].id)
  const [currentThemeHandle, setCurrentThemeHandle] = useState()

  return (
    <div className="zw-item-row zw-clearfix">
      <div className="zw-item-column zw-item-column-left">
        <Title
          collectionTitle={collection.title}
          itemTitle={item.title}
          itemTagline={item.tags[0]}
        />
      </div>
      <div className="zw-item-column zw-item-column-center">
        <Image
          currentThemeHandle={currentThemeHandle}
          currentVariantId={currentVariantId}
          item={item}
        />
      </div>
      <div className="zw-item-column zw-item-column-right">
        <Picker
          currentVariantId={currentVariantId}
          item={item}
          onThemeSelected={(variantId, themeKebab) => {
            setCurrentVariantId(variantId)
            setCurrentThemeHandle(themeKebab)
          }}
          options={options[item.id]}
        />
      </div>
    </div>
  )
}

export default ItemRow