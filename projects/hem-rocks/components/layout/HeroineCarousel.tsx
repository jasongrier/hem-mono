import React, { PropsWithChildren, ReactElement, useEffect, useState } from 'react'

interface IProps {
  index: number
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

function HeroineCarousel({ children, index }: PropsWithChildren<IProps>): ReactElement {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styleSheet }}/>
      <div className="hem-carousel">
        <div
          className="hem-carousel-track"
          style={{
            left: (-1 * index * 100) + 'vw',
          }}
        >
          { children }
        </div>
      </div>
    </>
  )
}

export default HeroineCarousel
