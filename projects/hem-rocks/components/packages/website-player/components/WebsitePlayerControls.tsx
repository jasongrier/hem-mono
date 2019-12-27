import React, { ReactElement, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import { Slider } from '../../../../../../lib/components'
import { NextButton, PlayPauseButton, PreviousButton } from '../../../../../../lib/components/buttons'
import { RootState } from '../../../../store'
import { togglePlaying } from '../actions'

interface IProps {
  expanded?: boolean | null
}

function WebsitePlayerControls({ expanded: forceExpanded = null }: IProps): ReactElement {
  const { playing } = useSelector((state: RootState) => ({
    playing: state.player.playing,
  }))

  const dispatch = useDispatch()

  const expanded = typeof forceExpanded === 'boolean' ? forceExpanded : playing

  const style = `
    .website-player-controls {
      position: relative;
      width: 40px;
      height: 40px;
      overflow: hidden;
    }

    .website-player-controls-expanded {
      width: calc(100vw - 80px);
      height: 40px;
    }

    .website-player-controls .hem-play-pause-button {
      float: left;
      width: 40px;
      height: 40px;
      background: #000;
      box-sizing: border-box;
    }

    .website-player-controls .hem-play-pause-button .hem-play-pause-button-icon {
      transform: scale(0.8);
    }

    .website-player-controls-expanded-controls {
      position: absolute;
      top: 0;
      left: 40px;
      width: 0;
      height: 40px;
      transition: width 250ms;
      background: #222;
      box-sizing: border-box;
    }

    .website-player-controls-expanded .website-player-controls-expanded-controls {
      width: calc(100vw - 120px);
    }

    .website-player-controls-expanded-controls .hem-slider,
    .website-player-controls-expanded-controls .hem-previous-button,
    .website-player-controls-expanded-controls .hem-next-button {
      float: left;
    }

    .website-player-controls-expanded-controls .hem-previous-button,
    .website-player-controls-expanded-controls .hem-next-button {
      width: 35px;
      height: 40px;
    }

    .website-player-controls-expanded-controls .hem-next-button-icon {
      transform: scale(0.7);
    }

    .website-player-controls-expanded-controls .hem-slider {
      width: 0;
      height: 40px;
      border: 0;
      transition: width 250ms;
    }

    .website-player-controls-expanded  .website-player-controls-expanded-controls .hem-slider {
      width: calc(100vw - 120px - 70px);
    }

    .website-player-current-info {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 9999;
      width: 100%;
      height: 40px;
      line-height: 40px;
      opacity: 0;
      transition: opacity 250ms;
      user-select: none;
    }

    .website-player-controls-playing .website-player-current-info {
      opacity: 1;
    }
  `

  const onPlayButtonClicked = useCallback(
    function onPlayButtonClicked() {
      dispatch(togglePlaying())
    }, [],
  )

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />
      <div className={classnames({
        'website-player-controls': true,
        'website-player-controls-playing': playing,
        'website-player-controls-expanded': expanded,
      })}>
        <PlayPauseButton
          onClick={onPlayButtonClicked}
          playing={playing}
        />

        <div className="website-player-controls-expanded-controls">
          <div className="website-player-current-info">
            Now Playing: Foo bar bazzimus qux | <Link to="#">read more</Link>
          </div>
          <Slider
            id="website-player-progress-slider"
            onChange={() => {}}
            value={0.5}
          />
          <PreviousButton
            onClick={onPlayButtonClicked}
          />
          <NextButton
            onClick={onPlayButtonClicked}
          />
        </div>
      </div>
    </>
  )
}

export default WebsitePlayerControls
