import React, { PropsWithChildren, ReactElement, useEffect, useState } from 'react'

interface IProps {
  panelWidth: number
  slideIndex: number
  unit: string
}

const styleSheet = `
  .hem-slider {
    position: relative;
    overflow-x: hidden;
  }

  .hem-slider-track {
    position: absolute;
    top: 0;
    left: 0;
    width: 10000px;
    transition: left 300ms;
  }
`

function Slider({ children, panelWidth, slideIndex, unit }: PropsWithChildren<IProps>): ReactElement {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styleSheet }}/>
      <div className="hem-slider">
        <div
          className="hem-slider-track"
          style={{
            left: '-' + (slideIndex * panelWidth) + unit,
          }}
        >
          { children }
        </div>
      </div>
    </>
  )
}

export default Slider
