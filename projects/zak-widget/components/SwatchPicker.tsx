import { noop } from 'lodash'
import React, { ReactElement } from 'react'
import { IProduct } from '../store/types'

declare const PDP_WIDGET_SWATCH_URLS: string[]

// TODO: All projects; Export all props
export interface IProps {
  availabilities: any
  onChange: (value: any) => void
  options: string[]
  product: IProduct
  value: string

  title?: string
  optionKeyTransform?: (value) => string
}

function SwatchPicker({
  availabilities,
  onChange,
  options,
  value,

  title,
  optionKeyTransform,
}: IProps): ReactElement {
  return (
    <div className="zw-swatch-picker">
      {title && (
        <h5>{ title }</h5>
      )}
      <ul className="zw-clearfix">
        { options.map((optionValue: string, index: number) => (
          <li
            className={value === optionValue ? 'zw-swatch-picker-item-active' : ''}
            key={index}
          >
            {title === 'foo' && console.log(optionValue)}
            <div
              className="zw-swatch-picker-item-image"
              onClick={() => availabilities[optionValue] ? onChange(optionValue) : noop}
              style={{
                cursor: availabilities[optionValue] ? 'pointer' : 'auto',
                opacity: availabilities[optionValue] ? 1 : 0.5,
                backgroundImage: `url(${PDP_WIDGET_SWATCH_URLS[
                  (optionKeyTransform
                    ? optionKeyTransform(optionValue)
                    : optionValue)
                ]})`,
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SwatchPicker
