import React, { ReactElement } from 'react'

export function Section({ children }): ReactElement {
  return (
    <div className="arrangement__section">
      {children}
    </div>
  )
}

export default Section
