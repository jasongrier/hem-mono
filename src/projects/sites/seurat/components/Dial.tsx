import React, { ReactElement, SyntheticEvent } from 'react'

interface IProps {
  controlled: boolean
  label: string
  onChange: (value: number) => void
  onChangeDone: (value: number) => void
  value: number
}

function normalizedValue(value: number) {
  return (value + 45) / 90 * 100
}

function denormalizedValue(value: number) {
  return value / 100 * 90 -45
}

function Dial({ controlled, label, onChange, onChangeDone, value }: IProps): ReactElement {

  function onMouseDown(evt: SyntheticEvent<HTMLDivElement>) {

  }

  return (
    <div className={`dial ${label ? ' dial--with-label' : ''}`}>
      <div
        className="dial__inner"
        onMouseDown={onMouseDown}
        style={{
          transform: `rotate(${value / 100 * 360}deg)`,
        }}
      >
        <div className="dial__label">
          {Math.round(normalizedValue(value))}
        </div>
      </div>
    </div>
  )
}

export default Dial
