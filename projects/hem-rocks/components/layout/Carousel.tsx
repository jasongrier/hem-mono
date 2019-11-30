import React, { PropsWithChildren, ReactElement, useEffect } from 'react'
import 'slick-carousel'
import 'slick-carousel/slick/slick.css'
import $ from 'jquery'
import uuid from 'uuid/v1'

interface IProps {
  arrows?: boolean,
  id?: string,
}

function Carousel({
  arrows = true,
  children,
  id = uuid(),
}: PropsWithChildren<IProps>): ReactElement {
  useEffect(() => {
    const $el: any = $(`#${id}`)
    $el.find('.hem-carousel-slick').slick({
      arrows,
    })
  }, [])

  return (
    <div
      className="hem-carousel"
      id={id}
    >
      <div className="hem-carousel-slick">
        { children }
      </div>
    </div>
  )
}

export default Carousel
