import React, { ReactElement, PropsWithChildren, SyntheticEvent } from 'react'

interface IProps {
  playing: boolean
  onClick: (evt: SyntheticEvent<HTMLDivElement>) => void

  className?: string
  useFa?: boolean
}

const styleSheet = `
  .hem-play-pause-button {
    position: relative;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    cursor: pointer;
  }

  .hem-play-pause-button-icon {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
  }

  .hem-play-pause-button-icon::after {
    display: block;
    content: " ";
    width: 0px;
    height: 0px;
    border-top: 16px solid transparent;
    border-bottom: 16px solid transparent;
    border-left: 16px solid #fff;
    transform: scaleX(1.6) translateX(1.5px);
  }

  .hem-play-pause-button-icon span {
    display: none;
  }

  .hem-play-pause-button.hem-play-pause-button-playing .hem-play-pause-button-icon::after {
    display: none;
  }

  .hem-play-pause-button.hem-play-pause-button-playing .hem-play-pause-button-icon span {
    position: relative;
    display: block;
    width: 27px;
    height: 30px;
  }

  .hem-play-pause-button.hem-play-pause-button-playing .hem-play-pause-button-icon span::before {
    display: block;
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    width: 10px;
    height: 30px;
    background-color: #fff;
  }

  .hem-play-pause-button.hem-play-pause-button-playing .hem-play-pause-button-icon span::after {
    display: block;
    content: " ";
    position: absolute;
    top: 0;
    right: 0;
    width: 10px;
    height: 30px;
    background-color: #fff;
  }

  .hem-play-pause-button .fa-icon {
    display: inline-block;
  }

  .hem-play-pause-button-text {
    font-size: 0;
  }
`

function PlayPauseButton({ playing, onClick, className, useFa = false }: IProps): ReactElement {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styleSheet }} />
      <div
        className={`
          hem-play-pause-button
          ${ className }
          ${ playing ? 'hem-play-pause-button-playing' : '' }
          ${ useFa ? 'use-fa' : '' }
        `}
        onClick={onClick}
      >
        { useFa && playing && (
          <>
            <i className="fa-icon fas fa-pause" />
            <span className="hem-play-pause-button-text">Pause</span>
          </>
        )}
        { useFa && !playing && (
          <>
            <i className="fa-icon fas fa-play" />
            <span className="hem-play-pause-button-text">Play</span>
          </>
        )}
        { !useFa && (
          <div className="hem-play-pause-button-icon">
            <span></span>
          </div>
        )}
      </div>
    </>
  )
}

export default PlayPauseButton
