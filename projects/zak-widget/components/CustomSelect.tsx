import React, { ReactElement, useState, useEffect } from 'react'
//@ts-ignore
import { useClickOutside } from 'react-click-outside-hook'

export interface ICustomSelectOption {
  text: string
  value: string
}

export interface IProps {
  onChange: (value: string) => void
  options: ICustomSelectOption[]
  value: string

  placeholder?: string
}

function CustomSelect({ onChange, options, placeholder, value }: IProps): ReactElement {
  const [open, setOpen] = useState()
  const [selectedText, setSelectedText] = useState(placeholder || options[0] && options[0].text)
  const [ref, hasClickedOutside] = useClickOutside()

  useEffect(() => { hasClickedOutside && setOpen(false) }, [hasClickedOutside])

  function setAndClose({ text, value }: ICustomSelectOption) {
    setOpen(false)
    setSelectedText(text)
    onChange(value)
  }

  return (
    <div
      className={`zw-custom-select ${open ? 'zw-custom-select-open' : ''}`}
      ref={ref}
    >
      <div
        className="zw-selected-value"
        onClick={() => setOpen(!open)}
      >
        { selectedText }
      </div>
      <div className="zw-select-options">
        <ul>
          { placeholder &&
            <li onClick={() => {
              setAndClose({ value: '', text: placeholder })
            }}>
              None
            </li>
          }
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
