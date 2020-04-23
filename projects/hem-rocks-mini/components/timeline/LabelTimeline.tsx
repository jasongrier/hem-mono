import React, { ReactElement } from 'react'
import LabelTimelineTick from './LabelTimelineTick'

function LabelTimeline(): ReactElement {
  return (
    <div className="label-timeline">
      <LabelTimelineTick
        year="2020"
        hasLogo={true}
      />
      <LabelTimelineTick
        year="2017"
        hasLogo={true}
      />
      <LabelTimelineTick
        year="2013"
        hasLogo={true}
      />
      <LabelTimelineTick
        year="2012"
        hasLogo={true}
      />
      <LabelTimelineTick
        year="2010"
        hasLogo={true}
      />
      <LabelTimelineTick
        year="2008"
        hasLogo={true}
      />
      <LabelTimelineTick
        year="2006"
        hasLogo={true}
      />
    </div>
  )
}

export default LabelTimeline
