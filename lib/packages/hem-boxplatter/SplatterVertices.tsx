import React, { ReactElement, PropsWithChildren, useState, useEffect } from 'react'

interface IProps {
  rangeX: number
  rangeY: number

  bipolarX?: boolean
  bipolarY?: boolean
  className?: string
  compensate?: boolean
  disabled?: boolean
}

const styleSheet = `
  .hem-boxplatter-splatter-vertices {
    position: relative;
    width: 100%;
    height: 100%;
    transform-origin: center;
  }

  .hem-boxplatter-splatter-vertices-compensator {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-origin: center center;
  }
`

function SplatterVertices({
  children,
  className,
  rangeX,
  rangeY,

  bipolarX = false,
  bipolarY = false,
  compensate = true,
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

    if (compensate) {
      compensatorStyle = {
        transform: `skewX(${-1 * skewX}deg) skewY(${-1 * skewY}deg)`,
      }
    }
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styleSheet }} />
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
    </>
  )
}

export default SplatterVertices
