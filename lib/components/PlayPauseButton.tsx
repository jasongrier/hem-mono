import React, { ReactElement } from 'react'

interface IProps {
  className: string
  playing: boolean
  setPlaying: (playing: boolean) => void
}

const styleSheet = `
  .hem-play-pause-button {
    position: relative;
    width: 60px;
    height: 60px;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .hem-play-pause-button::after {
    display: block;
    content: " ";
    width: 0px;
    height: 0px;
    border-top: 16px solid transparent;
    border-bottom: 16px solid transparent;
    border-left: 16px solid #fff;
    transform: scaleX(1.6) translateX(1.5px);
  }

  .hem-play-pause-button span {
    display: none;
  }

  .hem-play-pause-button.playing::after {
    display: none;
  }

  .hem-play-pause-button.playing span {
    position: relative;
    display: block;
    width: 27px;
    height: 30px;
  }

  .hem-play-pause-button.playing span::before {
    display: block;
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    width: 10px;
    height: 30px;
    background-color: #fff;
  }

  .hem-play-pause-button.playing span::after {
    display: block;
    content: " ";
    position: absolute;
    top: 0;
    right: 0;
    width: 10px;
    height: 30px;
    background-color: #fff;
  }
`

function PlayPauseButton({ className, playing, setPlaying }: IProps): ReactElement {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styleSheet }} />
      <div
        className={`
          hem-play-pause-button
          ${playing ? 'playing' : ''}
          ${className}
        `}
        onClick={() => setPlaying(!playing)}
      >
        <span></span>
      </div>
    </>
  )
}

export default PlayPauseButton
