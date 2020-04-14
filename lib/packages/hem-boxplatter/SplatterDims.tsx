import React, { ReactElement, PropsWithChildren, useState, useEffect } from 'react'

interface IProps {
  className: string
  height: number
  rangeX: number
  rangeY: number
  width: number

  bipolar?: boolean
  disabled?: boolean
}

function SplatterDims({
  children,
  className,
  height,
  rangeX,
  rangeY,
  width,

  bipolar = false,
  disabled = false,
}: PropsWithChildren<IProps>): ReactElement {
  const [widthOffset, setWidthOffset] = useState(0)
  const [heightOffset, setHeightOffset] = useState(0)

  useEffect(() => {
    if (disabled) return

    function randomOffset(range) {
      return (Math.random() * (range * 2))
    }

    function randomOffsetBipolar(range) {
      return randomOffset(range) - range
    }

    const randomOffsetFn = bipolar ? randomOffsetBipolar : randomOffset

    setWidthOffset(randomOffsetFn(rangeX))
    setHeightOffset(randomOffsetFn(rangeY))
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
      className={`hem-boxplatter hem-boxplatter-splatterdims ${className}`}
      style={style}
    >
      { children }
    </div>
  )
}

export default SplatterDims
