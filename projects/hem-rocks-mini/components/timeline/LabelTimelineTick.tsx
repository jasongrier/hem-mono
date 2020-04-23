import React, { ReactElement } from 'react'

interface IProps {
  hasLogo: boolean
  year: string
}

function LabelTimelineTick({ hasLogo, year }: IProps): ReactElement {
  return (
    <div
      className={`label-timeline-tick`}
      id={`label-timeline-tick-${year}`}
    >
      { hasLogo && (
        <img
          alt={`HEM logo from ${year}`}
          src={`http://static.hem.rocks/site/timeline-logos/HEM_logo_${year}.jpg`}
        />
      )}
      <span className="label-timeline-tick-label">{ year }</span>
    </div>
  )
}

export default LabelTimelineTick
