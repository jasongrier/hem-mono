import React, { ReactElement } from 'react'

declare const PDP_WIDGET_SWATCH_URLS: string[]

// TODO: All projects; Export all props
export interface IProps {
  onChange: (value: any) => void
  options: string[]
  value: string

  title?: string
  optionKeyTransform?: (value) => string
}

function SwatchPicker({
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
              onClick={() => onChange(optionValue)}
              style={{
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
