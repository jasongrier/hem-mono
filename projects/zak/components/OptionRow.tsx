import React, { ReactElement } from 'react'
import CustomSelect, { IProps as ICustomSelectProps } from './CustomSelect'

interface IAction {
  onClick: () => void
  text: string
}

interface IProps {
  action: IAction
  select: ICustomSelectProps
}

function ZwOptionRow({ action, select }: IProps): ReactElement {
  return (
    <div className="zw-option-row">
      <CustomSelect
        onChange={select.onChange}
        options={select.options}
        title={select.title}
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
