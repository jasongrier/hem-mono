import React, { ReactElement } from 'react'

interface IProps {
  onClick: () => void
}

const styleSheet = `
  .hem-next-button {
    position: relative;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .hem-next-button::before,
  .hem-next-button::after {
    display: block;
    content: " ";
  }

  .hem-next-button::before {
    width: 0px;
    height: 0px;
    border-top: 18px solid transparent;
    border-bottom: 18px solid transparent;
    border-left: 18px solid #fff;
    transform: scaleX(1.3) scaleY(.9);
  }

  .hem-next-button::after {
    width: 4px;
    height: 36px;
    background: #fff;
    transform: scaleY(.9);
  }
`

function NextButton({ onClick }: IProps): ReactElement {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styleSheet }} />
      <div
        className="hem-next-button"
        onClick={onClick}
      />
    </>
  )
}

export default NextButton
