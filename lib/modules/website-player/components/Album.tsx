import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Scrollbars from 'react-scrollbars-custom'
import TrackPlayPauseButton from './TrackPlayPauseButton'
import { IAlbum } from '../index'

interface IProps {
  album: IAlbum
}

function Albums({ album }: IProps): ReactElement {
  const [moreMenuOpen, setMoreMenuOpen] = useState<boolean>(false)
  const [linkCopied, setLinkCopied] = useState<boolean>(false)

  useEffect(function resetLinkCopied() {
    if (!moreMenuOpen) {
      setLinkCopied(false)
    }
  }, [moreMenuOpen])

  const moreOnClick = useCallback(
    function moreOnClickFn() {
      setMoreMenuOpen(!moreMenuOpen)
    }, [moreMenuOpen],
  )

  const copyLinkOnClick = useCallback(
    function copyLinkOnClickFn() {
      const linkContent = document.getElementById('link-content-' + album.id)

      if (!linkContent) return

      // @ts-ignore
      linkContent.select()
      // @ts-ignore
      linkContent.setSelectionRange(0, 99999)

      document.execCommand('copy')
      // @ts-ignore
      setLinkCopied(true)

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
              <TrackPlayPauseButton
                className="hem-player-albums-album-more-menu-item"
                track={album.tracks[0]}
              />
              <div className="hem-player-albums-album-more-menu-item">
                <Link to={`/label/${album.id}`}>
                  Info
                </Link>
              </div>
              { album.attributionLink && (
                <div className="hem-player-albums-album-more-menu-item">
                  <Link to={album.attributionLink}>
                    Artist's Website
                  </Link>
                </div>
              )}

              <div className="hem-player-albums-album-more-menu-item-divider" />

              {/* <div className="hem-player-albums-album-more-menu-item">
                <span
                  className="fb-share-button"
                  data-href={`/label/${album.id}`}
                  data-layout="button_count"
                >
                  Facebook
                </span>
              </div>
              <div className="hem-player-albums-album-more-menu-item">
                <Link to={`/label/${album.id}`}>
                  Twitter
                </Link>
              </div> */}
              <div className="hem-player-albums-album-more-menu-item">
                <a
                  href="#"
                  onClick={copyLinkOnClick}
                >
                  { linkCopied ? 'Copied!' : 'Copy Link' }
                  <input
                    className="album-copy-link-content"
                    id={'link-content-' + album.id}
                    readOnly
                    value={`http://hem.rocks/label/${album.id}`}
                  />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Albums
