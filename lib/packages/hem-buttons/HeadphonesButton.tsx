import React, { ReactElement, PropsWithChildren } from 'react'

interface IProps {
  className?: string
  onClick: () => void
}

const styleSheet = `
  .hem-headphones-button {
    position: relative;
    width: 60px;
    height: 60px;
    background: rgba(0, 0, 0, .5);
    background: red;
    cursor: pointer;
  }

  .hem-headphones-button-icon {
    position: absolute;
    top: 2px;
    left: 10px;
    transform: scale(.8);
    transform-origin: center center;
  }

  .hem-headphones-button div {
    background-color: #fff;
  }

  .hem-headphones-button-left-ear-cup {
    position: absolute;
    top: 45px;
    left: 5px;
    width: 9px;
    height: 15px;
  }

  .hem-headphones-button-left-band {
    position: absolute;
    top: 10px;
    left: 0px;
    width: 3px;
    height: 45px;
  }

  .hem-headphones-button-top-band {
    position: absolute;
    top: 10px;
    left: 0;
    width: 45px;
    height: 3px;
  }

  .hem-headphones-button-right-band {
    position: absolute;
    top: 10px;
    left: 45px;
    width: 3px;
    height: 45px;
  }

  .hem-headphones-button-right-ear-cup {
    position: absolute;
    top: 45px;
    left: 34px;
    width: 9px;
    height: 15px;
  }
`

interface IProps {
  onClick: () => void
}

function HeadphonesButton({ className, onClick }: PropsWithChildren<IProps>): ReactElement {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styleSheet }} />
      <div
        className={`hem-headphones-button ${className}`}
        onClick={onClick}
      >
        <div className="hem-headphones-button-icon">
          <div className="hem-headphones-button-left-ear-cup" />
          <div className="hem-headphones-button-left-band" />
          <div className="hem-headphones-button-top-band" />
          <div className="hem-headphones-button-right-band" />
          <div className="hem-headphones-button-right-ear-cup" />
        </div>
      </div>
    </>
  )
}

export default HeadphonesButton
