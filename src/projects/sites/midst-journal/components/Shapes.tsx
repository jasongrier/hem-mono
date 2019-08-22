import React, { ReactElement, useEffect } from 'react'
import $ from 'jquery'
import { camelCase } from 'voca'
import shapeImages from '../assets/shapes'

const colors = [
  'blue',
  'green',
  'pink',
  'yellow',
]

const shapes = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k']

function makeShapes() {
  $(document).ready(function() {
    const $shapes = $('.shapes div').remove()

    for (var i = 0; i <= 10; i++) {
      var $nextShape = $shapes.eq(Math.floor(Math.random() * $shapes.length))

      $nextShape.css({
        position: 'fixed',
        zIndex: '9999',
        top: (Math.random() * 100) + '%',
        left: (Math.random() * 100) + '%',
        width: (Math.random() * 150 + 50) + 'px',
        height: (Math.random() * 150 + 50) + 'px',
        transform: 'rotate(' + (Math.random() * 360) + 'deg)',
        filter: 'hue-rotate(' + (Math.random() * 360) + 'deg)',
      })

      $('body').append($nextShape)
    }
  })
}

function Shapes(): ReactElement {
  useEffect(makeShapes, [])

  return (
    <div className="shapes">
      {colors.map(color =>
        shapes.map(shape => (
          <div
            key={`${shape}-${color}`}
            className="shape-container"
            style={{ backgroundImage: `url(../assets/shapes/midst-shape-${shape}-${color}.png)` }}
          >
            <img src={shapeImages[camelCase(`midstShape-${shape}-${color}`)]} />
          </div>
        ))
      )}
    </div>
  )
}

export default Shapes