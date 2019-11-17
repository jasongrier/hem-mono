import React, { ReactElement } from 'react'

interface IProps {
  children: any
}

function Arrangement({ children }: IProps): ReactElement {
  return (
    <div className="arrangement">
      {children}
    </div>
  )
}

export default Arrangement
