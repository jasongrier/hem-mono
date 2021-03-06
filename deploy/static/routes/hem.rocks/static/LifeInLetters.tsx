import React, { ReactElement, SyntheticEvent, useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import { movieRequest, WebMoviePlayer } from '../../../../../lib/modules/web-movie'
import { setPlayerPlaylist, replacePlaylist, unpausePlayer, playTrack } from '../../../../../lib/modules/website-player'
import { SoundLibraryRefreshHeroine, HemRefreshHeroine, GrandPianoHeroine } from '../../../components/heroines'
import { MainContentList, getContentItemsFromList, getContentItemBySlug, contentItemToTrack } from '../../../modules/core/content'
import { assetHostHostname } from '../../../functions'
import { ReleasePhase } from '../../../components/layout'
import { BASE_SITE_TITLE } from '../../../config'
import { ProtectedContent } from '../../../modules/core/login'
import { RootState } from '../../../index'

function WebMovie(): ReactElement {
  const { allContentItems } = useSelector((state: RootState) => ({
    allContentItems: state.content.contentItems,
  }))

  const dispatch = useDispatch()

  const [canStart, setCanStart] = useState<boolean>(false)
  const [playing, setPlaying] = useState<boolean>(false)

  useEffect(function blackBody() {
    document.documentElement.style.backgroundColor = '#000'
  }, [])

  const onTriggerClick = useCallback(
    function onTriggerClickFn() {
      // const el = document.querySelector('.page-internal-web-movie')

      // if (el.requestFullscreen) {
      //   el.requestFullscreen()
      //   // @ts-ignore
      // } else if (el.webkitRequestFullscreen) {
      //   // @ts-ignore
      //   el.webkitRequestFullscreen()
      //   // @ts-ignore
      // } else if (el.msRequestFullscreen) {
      //   // @ts-ignore
      //   el.msRequestFullscreen()
      // }

      setCanStart(true)
    }, [],
  )

  function onMovieStart() {
    const trackItem = getContentItemBySlug(allContentItems, 'life-in-letters-demo')
    const track = contentItemToTrack(trackItem)

    dispatch(replacePlaylist(6, { name: 'Life in Letters Movie', tracks: [track] }))
    dispatch(setPlayerPlaylist(6))
    setPlaying(true)
    dispatch(playTrack(track))
  }

  const src = `${assetHostHostname()}/hem-rocks/content/images/web-movie/life-in-letters/index.json`

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-internal page-internal-web-movie">
        <ProtectedContent>
          <div className="page-internal-web-movie-container">
            <div
              className="page-internal-web-movie-trigger"
              onClick={onTriggerClick}
              style={{
                opacity: canStart ? 0 : 1,
              }}
            >
              <p>(click anywhere to start)</p>
            </div>

            <WebMoviePlayer
              canStart={canStart}
              onStart={onMovieStart}
              src={src}
              frameRate={3}
              startClip={3}
            >
              <div
                className="page-internal-web-movie-splash"
                style={{
                  opacity: playing ? 0 : 1,
                }}
              >
                <h2>Life in Letters: A fan vid</h2>
              </div>
            </WebMoviePlayer>
            <WebMoviePlayer
              canStart={canStart}
              src={src}
              frameRate={2}
              startClip={0}
            >
              <div
                className="page-internal-web-movie-splash"
                style={{
                  opacity: playing ? 0 : 1,
                }}
              >
                <h2>Life in Letters: A fan vid</h2>
              </div>
            </WebMoviePlayer>
          </div>
        </ProtectedContent>
      </div>
    </>
  )
}

export default WebMovie
