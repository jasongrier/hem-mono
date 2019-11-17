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
  title?: string
  src?: string
  props?: {
    automationCurves?: IAutomationCurve[]
    children?: any
    description?: string
    end?: number
    fades?: { in: IBezierCurve[], out: IBezierCurve[] }
    loop?: boolean
    src?: string
    start?: number
    tags?: string[]
    transcription?: string
  }
}

export function Clip({
  automationCurves,
  description,
  end,
  fades,
  loop,
  src,
  start,
  tags,
  transcription,
}: IProps): ReactElement {
  return (
    <div className="clip">
    </div>
  )
}

export default Clip
