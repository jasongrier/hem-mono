import React, { PropsWithChildren, ReactElement, useEffect, useRef, CSSProperties } from 'react'
import $ from 'jquery'
import uuid from 'uuid/v1'

interface IProps {
  id?: string,
  random?: boolean
  rotate?: number
  translateX?: number
  translateY?: number
}

// TODO: All projects; use PropsWithChildren instead of `children: any` in IProps
function Displace({
  children,
  id = uuid(),
  random,
  rotate = 0,
  translateX = 0,
  translateY = 0,
}: PropsWithChildren<IProps>): ReactElement {
  useEffect(() => {
    const $el = $(`#${id}`)
    const $frame = $el.find('.hem-displace-frame')
    const $content = $el.find('.hem-displace-content')

    const frameBaseStyle = {
      position: 'relative',
    }

    const contentBaseStyle = {
      transformOrigin: 'center center'
    }

    let rotateFrameVal
    let rotateContentVal
    let translateFrameXVal
    let translateContentXVal
    let translateFrameYVal
    let translateContentYVal

    if (random) {
      if (rotate) {
        rotate = Math.random() * rotate * 2 - rotate
      }

      if (translateX) {
        translateX = Math.random() * translateX
      }

      if (translateY) {
        translateY = Math.random() * translateY
      }
    }

    if (rotate) {
      rotateFrameVal = rotate
      rotateContentVal = rotate * -1
    }

    if (translateX) {
      translateFrameXVal = translateX
      translateContentXVal = translateX * -1
    }

    if (translateY) {
      translateFrameYVal = translateY
      translateContentYVal = translateY * -1
    }

    const frameTransformStyle = `
      ${rotateFrameVal ? 'rotate(' + rotateFrameVal + 'deg)' : ''}
      ${translateFrameXVal ? 'translateX(' + translateFrameXVal + 'px)' : ''}
      ${translateFrameYVal ? 'translateY(' + translateFrameYVal + 'px)' : ''}
    `

    const contentTransformStyle = `
      ${rotateContentVal ? 'rotate(' + rotateContentVal + 'deg)' : ''}
      ${translateContentXVal ? 'translateX(' + translateContentXVal + 'px)' : ''}
      ${translateContentYVal ? 'translateY(' + translateContentYVal + 'px)' : ''}
    `

    $frame.css({
      ...frameBaseStyle,
      transform: frameTransformStyle,
    })

    $content.css({
      ...contentBaseStyle,
      transform: contentTransformStyle,
    })
  }, [])

  return (
    <div
      className="hem-displace"
      id={id}
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
