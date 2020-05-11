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
  const [currentThemeHandle, setCurrentThemeHandle] = useState('')

  const badge = item.tags.find((tag: string) => /^badge--/.test(tag))

  return (
    <div className="zw-item-row zw-clearfix">
      {badge && (
        <div className="zw-item-badge">
          { badge.replace(/^badge--/, '') }
        </div>
      )}
      <div className="zw-item-column zw-item-column-left">
        <Title
          collectionTitle={collection.title}
          currentThemeHandle={currentThemeHandle}
          item={item}
        />
      </div>
      <div className="zw-item-column zw-item-column-center">
        <Image
          // @ts-ignore
          currentThemeHandle={currentThemeHandle}
          currentVariantId={currentVariantId}
          item={item}
        />
        <div className="mobile-collection-title">
          <Title
            collectionTitle={collection.title}
            currentThemeHandle={currentThemeHandle}
            item={item}
          />
        </div>
      </div>
      <div className="zw-item-column zw-item-column-right">
        <Picker
          currentVariantId={currentVariantId}
          currentThemeHandle={currentThemeHandle}
          item={item}
          onThemeSelected={(variantId, themeKebab) => {
            setCurrentVariantId(variantId)
            // @ts-ignore
            setCurrentThemeHandle(themeKebab)
          }}
          options={options[item.id]}
        />
      </div>
    </div>
  )
}

export default ItemRow