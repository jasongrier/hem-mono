import React, { ReactElement } from 'react'
import clsx from 'clsx'
import './style.css'

interface IProps {
  foo: number
  bar: string
  someBit: boolean
  anotherBit: boolean
  onButtonClicked: () => void
  onFormSubmitted: () => void
}

function ClockView({
  foo,
  bar,
  someBit,
  anotherBit,
  onButtonClicked,
  onFormSubmitted,
 }: IProps): ReactElement {
  return (
    <div className={clsx('clock', someBit && 'has-some-bit')}>
      <div className={clsx('clock__box', anotherBit && 'has-another-bit')}>
        {{foo}}
      </div>
      <div className={clsx('clock__box', anotherBit && 'has-another-bit')}>
        {{bar}}
      </div>
      <div>
        <button onClick={onButtonClicked}>click me</button>
      </div>
      <div>
        <form onSubmit={onFormSubmitted}>
          <input type="text" />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  )
}

export default ClockView