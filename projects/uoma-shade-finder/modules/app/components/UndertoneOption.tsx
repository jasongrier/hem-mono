import React, { ReactElement } from 'react'

interface IProps {
  onSelect: () => void
  selected: boolean
  title: string
}

function UndertoneOption({ onSelect, selected, title }: IProps): ReactElement {
  return (
    <div
      className="undertone-option"
      onClick={onSelect}
    >
      <h2>{ title }</h2>
      {selected &&
        <div className="undertone-option-active" />
      }
    </div>
  )
}

export default UndertoneOption
