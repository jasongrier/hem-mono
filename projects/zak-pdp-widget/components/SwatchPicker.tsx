import React, { ReactElement } from 'react'

declare const PDP_WIDGET_SWATCH_URLS: string[]

// TODO: All projects; Export all props
export interface IProps {
  onChange: (value: any) => void
  options: string[]
  value: string

  availabilities?: any
  title?: string
  optionKeyTransform?: (value: string) => string
}

function isOptionUnavailable(availabilities: any, optionValue: any) {
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
            {title === 'Lens color:' && console.log((optionKeyTransform ? optionKeyTransform(optionValue) : optionValue))}
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
                  //@ts-ignore
                  (optionKeyTransform ? optionKeyTransform(optionValue) : optionValue)
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
