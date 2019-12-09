import React, { ReactElement } from 'react'

export interface ICustomSelectOption {
  text: string
  value: string
}

export interface IProps {
  onChange: (value: string) => void
  options: ICustomSelectOption[]
  title: string
  value: string
}

function CustomSelect({ onChange, options, title, value }: IProps): ReactElement {
  return (
    <div className="zw-custom-select">
      <div
        className="zw-selected-value"
        onClick={() => {}}
      >
        { title }
      </div>
      <div className="zw-select-options">
        <ul>
          { options.map(({ value: optionValue, text }) => (
            <li className={value === optionValue ? 'zw-custom-select-item-active' : ''}
              key={value}
              onClick={() => onChange(value)}>
              { text }
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default CustomSelect
