---
to: src/<%= name %>/view.tsx
---
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

function <%= Name %>View({
  foo,
  bar,
  someBit,
  anotherBit,
  onButtonClicked,
  onFormSubmitted,
 }: IProps): ReactElement {
  return (
    <div className={clsx('<%= name %>', someBit && 'has-some-bit')}>
      <div className={clsx('<%= name %>__box', anotherBit && 'has-another-bit')}>
        {{foo}}
      </div>
      <div className={clsx('<%= name %>__box', anotherBit && 'has-another-bit')}>
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

export default <%= Name %>View
