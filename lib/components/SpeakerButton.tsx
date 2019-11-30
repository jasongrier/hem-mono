import React, { ReactElement } from 'react'

interface IProps {
  className: string
  muted: boolean
  setMuted: (muted: boolean) => void
}

const styleSheet = `
  .hem-speaker-button {
    position: relative;
    width: 60px;
    height: 60px;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .hem-speaker-button::after {
    display: block;
    content: " ";
    width: 0px;
    height: 0px;
    border-top: 14px solid transparent;
    border-bottom: 14px solid transparent;
    border-left: 14px solid #fff;
    transform: scaleX(1.4) translateX(-11px) rotate(180deg);
  }

  .hem-speaker-button::before {
    display: block;
    content: " ";
    width: 12px;
    height: 14px;
    background: #fff;
    transform: translateX(-7px);
  }

  .hem-speaker-button span {
    display: block;
    position: absolute;
    top: 24px;
    right: 19px;
    width: 2px;
    height: 12px;
    background-color: #fff;
    transform: rotate(45deg);
    transform-origin: center;
  }

  .hem-speaker-button span:nth-child(2) {
    transform: rotate(-45deg);
  }

  .hem-speaker-button span:nth-child(3) {
    display: none;
  }

  .hem-speaker-button.volume-up span {
    right: 22px;
    transform: rotate(0deg) scaleY(.7);
  }

  .hem-speaker-button.volume-up span:nth-child(2) {
    right: 16px;
    transform: rotate(0deg) scaleY(1.6);
  }
`

function SpeakerButton({ className, muted, setMuted }: IProps): ReactElement {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styleSheet }} />
      <div
        className={`
          hem-speaker-button
          ${muted ? 'volume-up' : ''}
          ${className}
        `}
        onClick={() => setMuted(!muted)}
      >
        <span></span>
        <span></span>
      </div>
    </>
  )
}

export default SpeakerButton
