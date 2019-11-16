import React, { ReactElement } from 'react'

function Arrangement({ children }): ReactElement {
  return (
    <div className="arrangement">
      {children}
    </div>
  )
}

export default Arrangement
