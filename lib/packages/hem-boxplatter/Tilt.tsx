import React, { PropsWithChildren, ReactElement, useEffect, useRef } from 'react'

interface IProps {
  amount?: number
  both?: boolean
  compensate?: boolean
  disabled?: boolean
  onRender?: () => void
  skew?: number
}

function Tilt({
  children,

  amount = 5,
  both = false,
  compensate = true,
  disabled,
  onRender,
  skew = 0,
}: PropsWithChildren<IProps>): ReactElement {
  const el = useRef<null | HTMLDivElement>(null)

  useEffect(function renderEffect() {
    const tiltor: HTMLElement = el.current.querySelector('.hem-tilt-tiltor')
    const compensator: HTMLElement = el.current.querySelector('.hem-tilt-compensator')

    const tilt = both
      ? Math.random() * amount * 2 - amount
      : Math.random() * amount

    const skewX = both
      ? Math.random() * skew * 2 - skew
      : Math.random() * skew

    const skewY = both
      ? Math.random() * skew * 2 - skew
      : Math.random() * skew

    tiltor.style.transform = `
      rotate(${tilt}deg)
      skewX(${skewX}deg)
      skewY(${skewY}deg)
    `

    compensator.style.transform = compensate
      ? `
          rotate(${tilt * -1}deg)
          skewX(${skewX * -1}deg)
          skewY(${skewY * -1}deg)
        `
      : null

    onRender && onRender()
  }, [])

  if (disabled) return (<>{ children }</>)

  return (
    <div
      className="hem-tilt"
      ref={el}
    >
      <div className="hem-tilt-tiltor">
        <div className="hem-tilt-compensator">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Tilt
