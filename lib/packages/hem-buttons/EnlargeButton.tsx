import React, { ReactElement, PropsWithChildren } from 'react'

interface IProps {
  className?: string
  onClick?: () => void
}

const styleSheet = `
  .hem-enlarge-button {
    position: relative;
    width: 60px;
    height: 60px;
    box-sizing: border-box;
    border: 5px solid #fff;
    cursor: pointer;
  }

  .hem-enlarge-button::before {
    display: block;
    position: absolute;
    top: 5px;
    right: 5px;
    width: 30px;
    height: 30px;
    box-sizing: border-box;
    border: 6px solid #fff;
    border-bottom: 0;
    border-left: 0;
    content: " ";
  }
  
  .hem-enlarge-button::after {
    display: block;
    position: absolute;
    top: 5px;
    right: 3.5px;
    width: 6px;
    height: 40px;
    transform: rotate(45deg);
    transform-origin: top center;
    background-color: #fff;
    content: " ";
  }
`

function EnlargeButton({ className, onClick }: PropsWithChildren<IProps>): ReactElement {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styleSheet }} />
      <div
        className={`hem-enlarge-button ${className}`}
        onClick={onClick}
      >
        <div className="hem-enlarge-button-icon" />
      </div>
    </>
  )
}

export default EnlargeButton
