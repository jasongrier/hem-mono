import React, { ReactElement, useState } from 'react'

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
  const [open, setOpen] = useState()
  // TODO: This can be compared against props when Redux is hooked up
  const [selectedText, setSelectedText] = useState(title)

  function setAndClose({ value, text }: ICustomSelectOption) {
    setOpen(false)
    setSelectedText(text)
    onChange(value)
  }

  return (
    <div className={`zw-custom-select ${open ? 'zw-custom-select-open' : ''}`}>
      <div
        className="zw-selected-value"
        onClick={() => setOpen(!open)}
      >
        { selectedText }
      </div>
      <div className="zw-select-options">
        <ul>
          <li onClick={() => {
            setAndClose({ value: '', text: title })
          }}>
            None
          </li>
          { options.map(({ value: optionValue, text }, index) => (
            <li className={value === optionValue ? 'zw-custom-select-item-active' : ''}
              key={index}
              onClick={() => {
                setAndClose({ value: optionValue, text })
              }}
            >
              { text }
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default CustomSelect
