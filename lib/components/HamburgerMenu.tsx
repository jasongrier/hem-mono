import React, { PropsWithChildren, ReactElement, useRef, useState, useEffect } from 'react'
import $ from 'jquery'

interface IProps {}

const contentSel = '.hem-hamburger-menu-content'

const styleSheet = `
  .hem-hamburger-menu-toggle {
    position: fixed;
    width: 30px;
    height: 25px;
    cursor: pointer;
  }

  .hem-hamburger-menu-toggle span {
    display: block;
    width: 100%;
    height: 3px;
    margin-bottom: 7px;
    background-color: #000;
  }

  .hem-hamburger-menu-toggle-open {
    width: 19.5px;
  }

  .hem-hamburger-menu-toggle-open span:nth-child(1) {
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    transform: rotate(45deg);
    transform-origin: top left;
  }

  .hem-hamburger-menu-toggle-open span:nth-child(2) {
    display: none;
  }

  .hem-hamburger-menu-toggle-open span:nth-child(3) {
    position: absolute;
    top: 0;
    right: 0;
    width: 30px;
    transform: rotate(-45deg);
    transform-origin: top right;
  }

  ${contentSel} {
    display: none;
  }

  .hem-hamburger-menu-content-open {
    display: block;
    position: fixed;
  }
`

function HamburgerMenu({ children }: PropsWithChildren<IProps>): ReactElement {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const $menuLink = $(contentSel).find('a')

    $menuLink.on('click', () => setOpen(false))

    return function cleanup() {
      $menuLink.off('click')
    }
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styleSheet }} />
      <div
        className={`
          hem-hamburger-menu-toggle
          ${open ? 'hem-hamburger-menu-toggle-open' : ''}
        `}
        onClick={() => setOpen(!open)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={`
        hem-hamburger-menu-content
        ${open ? 'hem-hamburger-menu-content-open' : ''}
      `}>
        { children }
      </div>
    </>
  )
}

export default HamburgerMenu
