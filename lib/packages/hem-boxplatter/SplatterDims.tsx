import React, { ReactElement, PropsWithChildren, useState, useEffect } from 'react'

interface IProps {
  height: number
  rangeX: number
  rangeY: number
  width: number

  bipolarX?: boolean
  bipolarY?: boolean
  className?: string
  disabled?: boolean
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
}: PropsWithChildren<IProps>): ReactElement {
  const [widthOffset, setWidthOffset] = useState(0)
  const [heightOffset, setHeightOffset] = useState(0)

  useEffect(() => {
    if (disabled) return

    function randomOffset(range) {
      return (Math.random() * (range))
    }

    function randomOffsetBipolar(range) {
      return randomOffset(range * 2) - range
    }

    const randomXOffsetFn = bipolarX ? randomOffsetBipolar : randomOffset
    const randomYOffsetFn = bipolarY ? randomOffsetBipolar : randomOffset

    setWidthOffset(randomXOffsetFn(rangeX))
    setHeightOffset(randomYOffsetFn(rangeY))
  }, [])

  let style = {}
  if (!disabled) {
    style = {
      width: width + widthOffset + 'px',
      height: height + heightOffset,
      marginTop: heightOffset,
      marginLeft: widthOffset,
    }
  }

  return (
    <div
      className={`hem-boxplatter hem-boxplatter-splatter-dims ${className}`}
      style={style}
    >
      { children }
    </div>
  )
}

export default SplatterDims
