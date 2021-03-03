import React, { Dispatch, PropsWithChildren, ReactElement, SetStateAction, useRef, useState, useEffect } from 'react'
import $ from 'jquery'

interface IProps {
  controlled?: boolean
  onChange?: (open: boolean) => void
  open?: boolean
}

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
    transition: all 250ms;
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
    opacity: 0;
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

function HamburgerMenu({ controlled, children, open: controlledOpen, onChange }: PropsWithChildren<IProps>): ReactElement {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)

  useEffect(function escCloses() {
    const open = controlled ? controlledOpen : uncontrolledOpen

    function documentOnKeyDown(evt: any) {
      if (evt.keyCode === 27 && open) {
        if (controlled) {
          onChange && onChange(false)
        }

        else {
          setUncontrolledOpen(false)
        }
      }
    }

    document.addEventListener('keydown', documentOnKeyDown)

    return function cleanup() {
      document.removeEventListener('keydown', documentOnKeyDown)
    }
  }, [controlledOpen, uncontrolledOpen])

  useEffect(function allowLinksToClose() {
    const $menuLink = $(contentSel).find('a')

    $menuLink.on('click', (evt) => {
      if (evt.metaKey) return

      if (controlled) {
        onChange && onChange(false)
      }

      else {
        setUncontrolledOpen(false)
      }
    })

    return function cleanup() {
      $menuLink.off('click')
    }
  }, [])

  const open = controlled ? controlledOpen : uncontrolledOpen

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styleSheet }} />
      <div
        className={`
          hem-hamburger-menu-toggle
          ${open ? 'hem-hamburger-menu-toggle-open' : ''}
        `}
        onClick={() => {
          if (controlled) {
            onChange && onChange(!open)
          }

          else {
            setUncontrolledOpen(!open)
          }
        }}
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
