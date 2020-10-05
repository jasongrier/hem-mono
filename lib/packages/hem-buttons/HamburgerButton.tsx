import React, { ReactElement, PropsWithChildren } from 'react'

interface IProps {
  onClick: () => void
  useFa?: boolean
}

const styleSheet = `
  .hem-hamburger-button {
    display: flex;
    width: 60px;
    height: 60px;
    cursor: pointer;
    justify-content: center;
    align-items: center;
  }

  .hem-hamburger-button-icon {
    position: relative;
    width: 20px;
    height: 20px;
  }

  .hem-hamburger-button span {
    display: block;
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #000;
    background: #fff;
  }

  .hem-hamburger-button span:nth-child(1) {
    top: 0;
  }

  .hem-hamburger-button span:nth-child(2) {
    top: 50%;
    margin-top: -1px;
  }

  .hem-hamburger-button span:nth-child(3) {
    bottom: 0;
  }

  .hem-hamburger-button .fa-icon {
    display: inline-block;
  }
`

interface IProps {
  onClick: () => void
}

function HamburgerButton({ onClick, useFa = true }: PropsWithChildren<IProps>): ReactElement {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styleSheet }} />
      <div
        className="hem-hamburger-button"
        onClick={onClick}
      >
        { useFa && (
          <i className="fa-icon fas fa-window-maximize"></i>
        )}
        { !useFa && (
          <div className="hem-hamburger-button-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
      </div>
    </>
  )
}

export default HamburgerButton
