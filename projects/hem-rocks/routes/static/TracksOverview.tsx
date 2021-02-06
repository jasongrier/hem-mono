import React, { ReactElement, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_SITE_TITLE } from '../../config'
import { TracksSubnav } from '../../components/layout'
import { TracksOverviewContentBox } from '../../components/layout'
import { hasCategory, hasTag, MainContentBox, requestReadChunk } from '../../modules/content'
import { RootState } from '../../'

function TracksOverview(): ReactElement {
  const { chunkLog, tracks, playlists } = useSelector((state: RootState) => ({
    chunkLog: state.content.chunkLog,
    tracks: state.content.contentItems.filter(i => hasCategory(i, 'tracks')),
    playlists: state.content.contentItems.filter(i => hasCategory(i, 'playlists')),
  }))

  const dispatch = useDispatch()

  useEffect(function getChunks() {
    if (!chunkLog.includes('tracks')) {
      dispatch(requestReadChunk('tracks'))
    }

    if (!chunkLog.includes('playlists')) {
      dispatch(requestReadChunk('playlists'))
    }
  }, [chunkLog])

  const rowTracks = tracks.filter(i =>
    hasTag(i, 'new-in-month')
    && !hasTag(i, 'mixes')
    && !hasTag(i, 'rare')
  )

  const rowPlaylists = playlists.filter(i => hasTag(i, 'new-in-month'))

  const rowRare = tracks.filter(i =>
    hasTag(i, 'new-in-month')
    && hasTag(i, 'rare')
  )

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-tracks-overview">
        <TracksSubnav />
        <div className="overview-page">
          <div className="overview-page-row">
            <h2>Tracks</h2>
            { rowTracks.map((track, i) =>
              <TracksOverviewContentBox
                allContentItems={tracks}
                contentItem={track}
                filter="all"
                index={i}
                tag="new-in-month"
              />
            )}
          </div>
          <div className="overview-page-row">
            <h2>Playlists</h2>
          </div>
          <div className="overview-page-row">
            <h2>Mixes</h2>
          </div>
          <div className="overview-page-row">
            <h2>Rare</h2>
          </div>
        </div>
      </div>
    </>
  )
}

export default TracksOverview
