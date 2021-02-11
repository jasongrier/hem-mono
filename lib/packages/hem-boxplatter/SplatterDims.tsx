import React, { ReactElement, PropsWithChildren, useState, useEffect, CSSProperties } from 'react'

interface IProps {
  height: number
  rangeX: number
  rangeY: number
  width: number

  bipolarX?: boolean
  bipolarY?: boolean
  className?: string
  disabled?: boolean
  id?: string
  marginRangeX?: number
  marginRangeY?: number
  minMarginX?: number
  minMarginY?: number
}

function SplatterDims({
  children,
  className,
  height,
  rangeX,
  rangeY,
  width,

  bipolarX = false,
  bipolarY = false,
  disabled = false,
  id,
  marginRangeX,
  marginRangeY,
  minMarginX = 0,
  minMarginY = 0,
}: PropsWithChildren<IProps>): ReactElement {
  const [widthOffset, setWidthOffset] = useState(0)
  const [heightOffset, setHeightOffset] = useState(0)
  const [marginXOffset, setMarginXOffset] = useState(0)
  const [marginYOffset, setMarginYOffset] = useState(0)

  marginRangeX = marginRangeX === undefined ? rangeX : marginRangeX
  marginRangeY = marginRangeY === undefined ? rangeY : marginRangeY

  useEffect(() => {
    if (disabled) return

    function randomOffset(range: number) {
      return (Math.random() * (range))
    }

    function randomOffsetBipolar(range: number) {
      return randomOffset(range * 2) - range
    }

    const randomXOffsetFn = bipolarX ? randomOffsetBipolar : randomOffset
    const randomYOffsetFn = bipolarY ? randomOffsetBipolar : randomOffset
    const randomXMarginOffsetFn = bipolarX ? randomOffsetBipolar : randomOffset
    const randomYMarginOffsetFn = bipolarY ? randomOffsetBipolar : randomOffset

    setWidthOffset(randomXOffsetFn(rangeX))
    setHeightOffset(randomYOffsetFn(rangeY))
    setMarginXOffset(randomXMarginOffsetFn(marginRangeX))
    setMarginYOffset(randomYMarginOffsetFn(marginRangeY))
  }, [])

  let style: CSSProperties = {}

  if (!disabled) {
    style = {
      width: width + widthOffset + 'px',
      height: height === 0 ? 'auto' : height + heightOffset,
      marginTop: marginYOffset + minMarginY + 'px',
      marginLeft: marginXOffset + minMarginX + 'px',
    }
  }

  return (
    <div
      className={`hem-boxplatter hem-boxplatter-splatter-dims ${className}`}
      id={id}
      style={style}
    >
      { children }
    </div>
  )
}

export default SplatterDims
