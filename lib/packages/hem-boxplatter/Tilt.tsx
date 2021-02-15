import React, { PropsWithChildren, ReactElement, useEffect, useRef } from 'react'

interface IProps {
  amount?: number
  both?: boolean
  className: string
  compensate?: boolean
  onRender?: () => void
  skew?: number
}

function Tilt({
  children,

  amount = 1,
  both = false,
  className,
  compensate = true,
  onRender,
  skew = 1,
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
      ?
      `
        rotate(${tilt * -1}deg)
        skewX(${skewX * -1}deg)
        skewY(${skewY * -1}deg)
      `
      : null

    onRender && onRender()
  }, [])

  return (
    <div
      className={`
        hem-tilt
        ${className ? className : ''}
      `}
      ref={el}
    >
      <div className="kas-tilt-tiltor">
        <div className="kas-tilt-compensator">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Tilt
