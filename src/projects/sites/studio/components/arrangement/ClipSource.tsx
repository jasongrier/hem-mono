import React, { ReactElement } from 'react'

interface IBezierCurve {
  points: number[][]
}

interface IAutomationCurve {
  assignment: number
  data: IBezierCurve
  name: string
}

interface IProps {
  automationCurves: IAutomationCurve[]
  description: string
  end: number
  fades: { in: IBezierCurve[], out: IBezierCurve[] }
  loop: boolean
  name: string
  src: string
  start: number
  tags: string[]
  transcription: string
}

export function ClipSource({
  automationCurves,
  description,
  end,
  fades,
  loop,
  name,
  src,
  start,
  tags,
  transcription,
}: IProps): ReactElement {
  return (
    <div className="clip-source">
    </div>
  )
}

export default ClipSource
