import React from 'react'
import ReactDOM from 'react-dom'
import Prototype from './Prototype'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Prototype />, div)
  ReactDOM.unmountComponentAtNode(div)
})
