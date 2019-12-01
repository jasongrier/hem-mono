import React, { PropsWithChildren, ReactElement, useEffect, useState } from 'react'

interface IProps {
  panelWidth: number
  index: number
  unit: string
}

const styleSheet = `
  .hem-carousel {
    position: relative;
    overflow-x: hidden;
  }

  .hem-carousel-track {
    position: absolute;
    top: 0;
    left: 0;
    width: 10000px;
    transition: left 300ms;
  }
`

function Carousel({ children, panelWidth, index, unit }: PropsWithChildren<IProps>): ReactElement {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styleSheet }}/>
      <div className="hem-carousel">
        <div
          className="hem-carousel-track"
          style={{
            left: '-' + (index * panelWidth) + unit,
          }}
        >
          { children }
        </div>
      </div>
    </>
  )
}

export default Carousel
