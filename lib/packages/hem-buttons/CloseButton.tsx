import React, { ReactElement, PropsWithChildren } from 'react'

interface IProps {
  onClick: () => void
  useFa?: boolean
}

const styleSheet = `
  .hem-close-button {
    width: 60px;
    height: 60px;
    cursor: pointer;
    background: #000;
  }

  .hem-close-button-icon {
    position: relative;
    width: 100%;
    height: 100%;
    transform: scale(0.8);
  }

  .hem-close-button span {
    position: absolute;
    display: block;
    top: 50%;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: #fff;
    transform-origin: center center;
  }

  .hem-close-button span:nth-child(1) {
    transform: rotate(45deg);
  }

  .hem-close-button span:nth-child(2) {
    transform: rotate(-45deg);
  }

  .hem-close-button .fa-icon {
    display: inline-block;
  }
`

interface IProps {
  onClick: () => void
}

function CloseButton({ onClick, useFa = false }: PropsWithChildren<IProps>): ReactElement {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styleSheet }} />
      <div
        className="hem-close-button"
        onClick={onClick}
      >
        { useFa && (
          <i className="fa-icon fas fa-times"></i>
        )}
        { !useFa && (
          <div className="hem-close-button-icon">
            <span></span>
            <span></span>
          </div>
        )}
      </div>
    </>
  )
}

export default CloseButton
