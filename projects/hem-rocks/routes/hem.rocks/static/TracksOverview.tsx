import React, { ReactElement, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BASE_SITE_TITLE } from '../../../config'
import { TracksSubnav } from '../../../components/layout'
import { TracksOverviewContentBox, MainContentBanner } from '../../../components/layout'
import { hasCategory, requestReadChunk, IContentItem, hasProperty } from '../../../modules/core/content'
import { RootState } from '../../../index'

function getRow(items: IContentItem[], property: string) {
  return items.filter(i =>
    hasProperty(i, property)
    && i.published
    && i.project === 'hem.rocks'
  )
    .slice(0, 5)
    .sort((a, b) =>
      parseInt(a.order, 10) - parseInt(b.order, 10)
    )
}

function TracksOverview(): ReactElement {
  const { chunkLog, allTracks, allPlaylists } = useSelector((state: RootState) => ({
    chunkLog: state.content.chunkLog,
    allTracks: state.content.contentItems.filter(i => hasCategory(i, 'tracks')),
    allPlaylists: state.content.contentItems.filter(i => hasCategory(i, 'playlists')),
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

  const rows = [
    { title: 'Tracks', tracks: getRow(allTracks, 'in-overview-tracks')},
    { title: 'Playlists', tracks: getRow(allPlaylists, 'in-overview-playlists')},
  ]

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-tracks page-tracks-overview page-with-subnav page-with-banner">
        <MainContentBanner
          headline="Tracks for<br>April 2021"
        />
        <TracksSubnav />
        <div className="overview-page">
          { rows.map(({ title, tracks }) => (
            <div
              className="overview-page-row"
              key={title}
            >
              <h2>{ title }</h2>
              <div className="overview-page-row-items">
                { tracks.map((track, i) =>
                  <TracksOverviewContentBox
                    key={track.id}
                    allContentItems={allTracks}
                    contentItem={track}
                    filter="all"
                    index={i}
                    tag="in-overview-tracks"
                  />
                )}
              </div>
              <Link to="tracks">See all &gt;</Link>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default TracksOverview
