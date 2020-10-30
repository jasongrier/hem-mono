import React, { ReactElement, useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import Scrollbars from 'react-scrollbars-custom'
import TrackPlayPauseButton from './TrackPlayPauseButton'
import { IAlbum } from '../index'

interface IProps {
  album: IAlbum
}

function Albums({ album }: IProps): ReactElement {
  const [moreMenuOpen, setMoreMenuOpen] = useState<boolean>(false)

  const moreOnClick = useCallback(
    function moreOnClickFn() {
      setMoreMenuOpen(!moreMenuOpen)
    }, [moreMenuOpen],
  )

  return (
    <div
      className="hem-player-albums-album"
      key={ album.id }
    >
      <div className="hem-player-albums-album-cover-art">
        <img src={ album.coverArt } alt=""/>
      </div>
      <div className="hem-player-albums-album-info">
        <h4>{ album.name }</h4>
        <h5>{ album.attribution }</h5>
        <p>{ album.date.split('.').pop() }</p>
      </div>
      <div className="hem-player-albums-album-controls-overlay">
        <div className="hem-player-albums-album-play-pause">
          <TrackPlayPauseButton track={album.tracks[0]} />
        </div>
        <div className="hem-player-albums-album-more">
          <i
            className="fa-icon fas fa-ellipsis-h hem-player-albums-album-more-icon"
            onClick={moreOnClick}
          />
          { moreMenuOpen && (
            <div className="hem-player-albums-album-more-menu">
              <div className="hem-player-albums-album-more-menu-item">Play</div>
              <div className="hem-player-albums-album-more-menu-item">Info</div>
              <div className="hem-player-albums-album-more-menu-item">Artist's Website</div>
              <div className="hem-player-albums-album-more-menu-item">Share</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Albums
