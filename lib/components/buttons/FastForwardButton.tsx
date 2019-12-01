import React, { ReactElement } from 'react'

interface IProps {
  className: string
  onClick: () => void
}

const styleSheet = `
  .hem-fast-forward-button {
    position: relative;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .hem-fast-forward-button::before,
  .hem-fast-forward-button::after {
    display: block;
    content: " ";
    width: 0px;
    height: 0px;
    border-top: 16px solid transparent;
    border-bottom: 16px solid transparent;
    border-left: 16px solid #fff;
    transform: scaleX(1) translateX(1.5px);
  }

  .hem-fast-forward-button::before {
    transform: scaleX(1) translateX(1.5px);
  }

  .hem-fast-forward-button::after {
    transform: scaleX(1) translateX(3px);
  }
`

function FastForwardButton({ className, onClick }: IProps): ReactElement {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styleSheet }} />
      <div
        className={`
          hem-fast-forward-button
          ${className}
        `}
        onClick={onClick}
      />
    </>
  )
}

export default FastForwardButton
