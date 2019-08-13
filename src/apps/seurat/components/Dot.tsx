import React, { ReactElement } from 'react'

interface IProps {
  id: number
}

function Dot({ id }: IProps): ReactElement {
  return (
    <div className="dot">
    </div>
  )
}

export default Dot
