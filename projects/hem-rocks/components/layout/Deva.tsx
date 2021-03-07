import React, { ReactElement, useEffect, useState } from 'react'
import { set } from 'react-ga'
import { assetHostHostname } from '../../functions'

interface IProps {
  name: string

  animate?: boolean
  className?: string
  display?: string
  flip?: boolean
  height?: string
  rotate?: number
  scale?: number
  speed?: number
  style?: any
  width?: string
}

function Deva({
  name,

  animate = true,
  className,
  display = 'inline-block',
  flip,
  height = '180px',
  rotate,
  scale,
  speed = 250,
  style = {},
  width = '180px',
}: IProps): ReactElement {
  const [shiftX, setShiftX] = useState<number>(0)
  const [shiftY, setShiftY] = useState<number>(0)
  const [flipped, setFlipped] = useState<boolean>(false)

  useEffect(function animation() {
    if (!animate) return

    setInterval(() => {
      setShiftX(Math.random() * 60 - 30)
      setShiftY(Math.random() * 60 - 30)
      setFlipped(Math.random() > .5)
    }, speed)
  }, [])

  const assetHost = assetHostHostname()

  let transform = ''

  if (
    flip
    || rotate
    || scale
  ) {
    if (flip) {
      transform += 'scaleX(-1)'
    }

    if (rotate) {
      transform += ` rotate(${rotate}deg)`
    }

    if (scale) {
      transform += ` scale(${scale})`
    }

    transform = transform.trim()
  }

  else {
    transform = 'none'
  }

  transform = `translateX(${shiftX}px) translateY(${shiftY}px) scaleX(${flipped ? '-1' : '1'})`

  return (
    <div
      className={`deva deva-${name} ${className}`}
      style={{
        width,
        height,
        display,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${assetHost}/hem.rocks/site/devas/transparent/${name}.png)`,
        transform,
        transition: 'all 100ms',
        ...style,
      }}
    />
  )
}

export default Deva
