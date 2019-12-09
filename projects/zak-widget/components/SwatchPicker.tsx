import React, { ReactElement } from 'react'

export interface ISwatchPickerOption {
  imageUrl: string
  value: string
}

// TODO: All projects; Export all props
export interface IProps {
  onChange: (value: string) => void
  options: ISwatchPickerOption[]
  title: string
  value: string
}

function SwatchPicker({ onChange, options, title, value }: IProps): ReactElement {
  return (
    <div className="zw-swatch-picker">
      <h3>{ title }</h3>
      <ul className="zw-clearfix">
        { options.map(({ value: optionValue, imageUrl }) => (
          <li
            className={value === optionValue ? 'zw-swatch-picker-item-active' : ''}
            key={value}
          >
            <div
              className="zw-swatch-picker-item-image"
              onClick={() => onChange(value)}
              style={{
                backgroundImage: `url(${imageUrl})`,
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SwatchPicker
