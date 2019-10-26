import React, { ReactElement } from 'react'

interface IProps {
  controlled: boolean
  onChange: (value: number) => void
  onChangeDone: (value: number) => void
  value: number
}

function Dial({ controlled, onChange, onChangeDone, value }: IProps): ReactElement {
  return (
    <div className="dial">
    </div>
  )
}

export default Dial
