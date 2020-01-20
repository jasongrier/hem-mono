import React, { ReactElement } from 'react'
import CustomSelect, { IProps as ICustomSelectProps } from './CustomSelect'

interface IAction {
  remodalTarget: string
  text: string
}

interface IProps {
  action: IAction
  label: string
  select: ICustomSelectProps

  className?: string
}

function OptionRow({ action, className, label, select }: IProps): ReactElement {
  return (
    <div className={`zw-option-row zw-clearfix ${className ? className : ''}`}>
      <div className="zw-option-row-label">{ label }</div>
      <CustomSelect
        onChange={select.onChange}
        options={select.options}
        value={select.value}
        availabilities={select.availabilities}
        id={select.id}
      />
        <div className="zw-option-action">
          <a
            className="zw-plus-left"
            data-remodal-target={action.remodalTarget}
          >
            { action.text }
          </a>
        </div>
    </div>
  )
}

export default OptionRow
