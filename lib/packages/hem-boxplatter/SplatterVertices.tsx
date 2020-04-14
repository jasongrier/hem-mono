import React, { ReactElement, PropsWithChildren, useState, useEffect } from 'react'

interface IProps {
  rangeX: number
  rangeY: number

  bipolarX?: boolean
  bipolarY?: boolean
  className?: string
  disabled?: boolean
}

function SplatterVertices({
  children,
  className,
  rangeX,
  rangeY,

  bipolarX = false,
  bipolarY = false,
  disabled = false,
}: PropsWithChildren<IProps>): ReactElement {
  const [skewX, setSkewX] = useState(0)
  const [skewY, setSkewY] = useState(0)

  useEffect(() => {
    if (disabled) return

    function randomSkew(range) {
      return (Math.random() * (range))
    }

    function randomSkewBipolar(range) {
      return randomSkew(range * 2) - range
    }

    const randomXSkewFn = bipolarX ? randomSkewBipolar : randomSkew
    const randomYSkewFn = bipolarY ? randomSkewBipolar : randomSkew

    setSkewX(randomXSkewFn(rangeX))
    setSkewY(randomYSkewFn(rangeY))
  }, [])

  let style = {}
  let compensatorStyle = {}
  if (!disabled) {
    style = {
      transform: `skewX(${skewX}deg) skewY(${skewY}deg)`,
    }

    compensatorStyle = {
      transform: `skewX(${-1 * skewX}deg) skewY(${-1 * skewY}deg)`,
    }
  }

  return (
    <div
      className={`hem-boxplatter hem-boxplatter-splatter-vertices ${className}`}
      style={style}
    >
      <div
        className="hem-boxplatter-splatter-vertices-compensator"
        style={compensatorStyle}
      >
        { children }
      </div>
    </div>
  )
}

export default SplatterVertices
