import React, { ReactElement } from 'react'

interface IProps {
  onClick: () => void

  className?: string
  useFa?: boolean
}

const styleSheet = `
  .hem-next-button {
    width: 60px;
    height: 60px;
    cursor: pointer;
  }

  .hem-next-button-icon {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
  }

  .hem-next-button-icon::before,
  .hem-next-button-icon::after {
    display: block;
    content: " ";
  }

  .hem-next-button-icon::before {
    width: 0px;
    height: 0px;
    border-top: 18px solid transparent;
    border-bottom: 18px solid transparent;
    border-left: 18px solid #fff;
    transform: scaleX(1.3) scaleY(.9);
  }

  .hem-next-button-icon::after {
    width: 4px;
    height: 36px;
    background: #fff;
    transform: scaleY(.9);
  }

  .hem-next-button .fa-icon {
    display: inline-block;
  }
`

function NextButton({ onClick, className, useFa = true }: IProps): ReactElement {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styleSheet }} />
      <div
        className={`hem-next-button ${className}`}
        onClick={onClick}
      >
        { useFa && (
          <i className="fa-icon fas fa-step-forward"></i>
        )}
        { !useFa && (
          <div className="hem-next-button-icon" />
        )}
      </div>
    </>
  )
}

export default NextButton
