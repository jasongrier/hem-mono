import React, { ReactElement } from 'react'
import ClipSource from './ClipSource'

/**
 * Copy/paste this template and fill in the props
 */
function ClipTemplate(): ReactElement {
  return (
    <div className="clip">
      <ClipSource
        automationCurves={[]}
        description=""
        end={0}
        fades={{ in: [], out: []}}
        loop={true}
        name=""
        src=""
        start={0}
        tags={[]}
        transcription=""
      />
    </div>
  )
}

export default ClipTemplate
