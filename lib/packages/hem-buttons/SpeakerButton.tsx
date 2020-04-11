import React, { ReactElement } from 'react'

interface IProps {
  muted: boolean
  onClick: () => void

  crossedState?: 'muted' | 'unmuted'
}

const styleSheet = `
  .hem-speaker-button {
    position: relative;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 1;
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
    width: 2px;
    height: 12px;
    background-color: #fff;
  }

  .hem-speaker-button span {
    right: 22px;
    transform: scaleY(.7);
  }

  .hem-speaker-button span:nth-child(2) {
    right: 16px;
    transform: scaleY(1.6);
  }

  .hem-speaker-button.crossed span {
    top: 24px;
    right: 19px;
    transform: rotate(45deg);
    transform-origin: center;
  }

  .hem-speaker-button.crossed span:nth-child(2) {
    transform: rotate(-45deg);
  }

  .hem-speaker-button.crossed span:nth-child(3) {
    display: none;
  }
`

function SpeakerButton({ muted, onClick, crossedState = 'unmuted' }: IProps): ReactElement {
  let crossedClassName

  if (
    crossedState === 'muted' && muted
    || crossedState === 'unmuted' && !muted
  ) {
    crossedClassName = 'crossed'
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styleSheet }} />
      <div
        className={`
          hem-speaker-button
          ${crossedClassName}
        `}
        onClick={onClick}
      >
        <span></span>
        <span></span>
      </div>
    </>
  )
}

export default SpeakerButton
