import { noop } from 'lodash'
import React, { ReactElement } from 'react'
import { IProduct } from '../store/types'

declare const PDP_WIDGET_SWATCH_URLS: string[]

// TODO: All projects; Export all props
export interface IProps {
  onChange: (value: any) => void
  options: string[]
  product: IProduct
  value: string

  availabilities?: any
  title?: string
  optionKeyTransform?: (value) => string
}

function isOptionUnavailable(availabilities, optionValue) {
  return availabilities && !availabilities[optionValue]
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
            <div
              className="zw-swatch-picker-item-image"
              onClick={() => {
                if (isOptionUnavailable(availabilities, optionValue)) return
                onChange(optionValue)
              }}
              style={{
                cursor: isOptionUnavailable(availabilities, optionValue) ? 'auto' : 'pointer',
                opacity: isOptionUnavailable(availabilities, optionValue) ? 0.5 : 1,
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
