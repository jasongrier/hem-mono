import React, { ReactElement, useState, useEffect, useCallback } from 'react'
//@ts-ignore
import { useClickOutside } from 'react-click-outside-hook'

export interface ICustomSelectOption {
  name: string
  value: string
}

export interface IProps {
  onChange: (value: any) => void
  options: ICustomSelectOption[]
  value: string

  id?: string
  placeholder?: string
}

function CustomSelect({ id, onChange, options, placeholder, value }: IProps): ReactElement {
  const [open, setOpen] = useState()
  const [selectedText, setSelectedText] = useState(value || placeholder || options[0] && options[0].name)
  const [ref, hasClickedOutside] = useClickOutside()

  useEffect(() => {
    setSelectedText(value)
   }, [value])

  useEffect(() => { hasClickedOutside && setOpen(false) }, [hasClickedOutside])

  const setAndClose = useCallback(
    function setAndClose({ value }: ICustomSelectOption) {
      setOpen(false)
      onChange(value)
    }, [],
  )

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
              setAndClose({ value: '', name: placeholder })
            }}>
              None
            </li>
          }
          { options.map(({ value: optionValue, name }, index) => (
            <li
              className={value === optionValue ? 'zw-custom-select-item-active' : ''}
              key={index}
              onClick={() => {
                setAndClose({ value: optionValue, name })
              }}
            >
              { name }
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default CustomSelect
