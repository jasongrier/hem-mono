import React, { PropsWithChildren, ReactElement, useEffect, useRef, CSSProperties } from 'react'
import $ from 'jquery'
import uuid from 'uuid/v1'

interface IProps {
  compensate?: string[],
  id?: string,
  random?: boolean
  rotate?: number
  skewX?: number
  skewY?: number
  translateX?: number
  translateY?: number
  unipolar?: string[],
}

// TODO: All projects; use PropsWithChildren instead of `children: any` in IProps
function Displace({
  children,
  compensate = [],
  id = uuid(),
  random,
  rotate = 0,
  skewX = 0,
  skewY = 0,
  translateX = 0,
  translateY = 0,
  unipolar = [],
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

    let skewFrameXVal
    let skewContentXVal

    let skewFrameYVal
    let skewContentYVal

    let translateFrameXVal
    let translateContentXVal

    let translateFrameYVal
    let translateContentYVal

    function random(prop: string, val: number) {
      return (
        unipolar.indexOf(prop)
          ? Math.random() * val * 2 - val
          : Math.random() * val * 2 - val
      )
    }

    if (random) {
      if (rotate) {
        rotate = random('rotate', rotate)
      }

      if (skewX) {
        skewX = random('skewX', skewX)
      }

      if (skewY) {
        skewY = random('skewY', skewY)
      }

      if (translateX) {
        translateX = random('translateX', translateX)
      }

      if (translateY) {
        translateY = random('translateY', translateY)
      }
    }

    if (rotate) {
      rotateFrameVal = rotate
      if (compensate.indexOf('rotate') > -1) {
        rotateContentVal = rotate * -1
      }
    }

    if (skewX) {
      skewFrameXVal = skewX
      if (compensate.indexOf('skewX') > -1) {
        skewContentXVal = skewX * -1
      }
    }

    if (skewY) {
      skewFrameYVal = skewY
      if (compensate.indexOf('skewY') > -1) {
        skewContentXVal = skewY * -1
      }
    }

    if (translateX) {
      translateFrameXVal = translateX
      if (compensate.indexOf('translateX') > -1) {
        translateContentXVal = translateX * -1
      }
    }

    if (translateY) {
      translateFrameYVal = translateY
      if (compensate.indexOf('translateY') > -1) {
        translateContentYVal = translateY * -1
      }
    }

    const frameTransformStyle = `
      ${rotateFrameVal ? 'rotate(' + rotateFrameVal + 'deg)' : ''}
      ${skewFrameXVal ? 'skewX(' + skewFrameXVal + 'deg)' : ''}
      ${skewFrameYVal ? 'skewY(' + skewFrameYVal + 'deg)' : ''}
      ${translateFrameXVal ? 'translateX(' + translateFrameXVal + 'px)' : ''}
      ${translateFrameYVal ? 'translateY(' + translateFrameYVal + 'px)' : ''}
    `

    const contentTransformStyle = `
      ${rotateContentVal ? 'rotate(' + rotateContentVal + 'deg)' : ''}
      ${skewContentXVal ? 'skewX(' + skewContentXVal + 'deg)' : ''}
      ${skewContentYVal ? 'skewY(' + skewContentYVal + 'deg)' : ''}
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
