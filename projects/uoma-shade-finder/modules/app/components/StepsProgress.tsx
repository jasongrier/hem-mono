import React, { ReactElement } from 'react'
import StepsProgressItem from './StepsProgressItem'

function StepsProgress(): ReactElement {
  return (
    <div className="steps-progress">
      <StepsProgressItem stepNumber={1} />
      <StepsProgressItem stepNumber={2} />
      <StepsProgressItem stepNumber={3} />
      <StepsProgressItem stepNumber={4} />
    </div>
  )
}

export default StepsProgress
