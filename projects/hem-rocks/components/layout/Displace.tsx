import React, { PropsWithChildren, ReactElement, useEffect, useRef } from 'react'
import $ from 'jquery'

interface IProps {
  preset?: string
  rotate?: number
  translateX?: number
  translateY?: number
}

// TODO: All projects Use PropsWithChildren instead of `children: any` in IProps
function Displace({ children, rotate, preset, translateX, translateY }: PropsWithChildren<IProps>): ReactElement {
  const el = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!el || !el.current) return

    const $el = $(el)
    const $frame = $(el).find('.hem-displace-frame')
    const $content = $(el).find('.hem-displace-content')

    const frameBaseStyle = {
      position: 'relative',
    }

    const contentBaseStyle = {
      transformOrigin: 'center center'
    }

    $frame.css({
      ...frameBaseStyle,
    })

    $frame.css({
      ...contentBaseStyle,
    })
  })

  return (
    <div
      className="hem-displace"
      ref={el}
    >
      <div className="hem-displace-frame">
        <div className="hem-displace-content">
          { children }
        </div>
      </div>
    </div>
  )
}

export default Displace
