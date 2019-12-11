import React, { ReactElement } from 'react'
import CustomSelect, { IProps as ICustomSelectProps } from './CustomSelect'

interface IAction {
  onClick: () => void
  text: string
}

interface IProps {
  action: IAction
  select: ICustomSelectProps

  className?: string
}

function ZwOptionRow({ action, className, select }: IProps): ReactElement {
  return (
    <div className={`zw-option-row ${className}`}>
      <CustomSelect
        onChange={select.onChange}
        options={select.options}
        value={select.value}
      />
      <div className="zw-option-action">
        <a
          className="zw-plus-left"
          onClick={action.onClick}
        >
          { action.text }
        </a>
      </div>
    </div>
  )
}

export default ZwOptionRow
