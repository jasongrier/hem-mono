import React, { ReactElement, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { flatten, find, findIndex } from 'lodash'
import { BASE_SITE_TITLE } from '../../../config'
import { TracksSubnav } from '../../../components/layout'
import { TracksOverviewContentBox, MainContentBanner } from '../../../components/layout'
import { hasCategory, requestReadChunk, IContentItem, hasProperty, getContentItemsFromRawList, contentItemToTrack, getContentItemsFromList } from '../../../modules/core/content'
import { RootState } from '../../../index'
import { replacePlaylist, setPlayerPlaylist } from '../../../../../lib/modules/website-player'

interface IRow {
  title: string
  items: IContentItem[]
}

function getRowItems(items: IContentItem[], property: string) {
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
  const { currentProject, chunkLog, allTracksItems, allPlaylistsItems, playerPlaylists } = useSelector((state: RootState) => ({
    playerPlaylists: state.player.playlists,
    chunkLog: state.content.chunkLog,
    currentProject: state.content.currentProject,
    allTracksItems: state.content.contentItems.filter(i => hasCategory(i, 'tracks')),
    allPlaylistsItems: state.content.contentItems.filter(i => hasCategory(i, 'playlists')),
  }))

  const dispatch = useDispatch()

  const [rows, setRows] = useState<IRow[]>([])
  const [pagePlaylistSet, setPagePlaylistSet] = useState<boolean>(false)

  useEffect(function getChunks() {
    if (!chunkLog.includes('tracks')) {
      dispatch(requestReadChunk('tracks'))
    }

    if (!chunkLog.includes('playlists')) {
      dispatch(requestReadChunk('playlists'))
    }
  }, [chunkLog])

  useEffect(function loadRows() {
    if (!chunkLog.includes('tracks')) return
    if (!chunkLog.includes('playlists')) return
    if (!allTracksItems.length) return
    if (!allPlaylistsItems.length) return

    if (rows.length > 0) return

    setRows([
      { title: 'Tracks', items: getRowItems(allTracksItems, 'in-overview-tracks')},
      { title: 'Playlists', items: getRowItems(allPlaylistsItems, 'in-overview-playlists')},
    ])
  }, [chunkLog, allTracksItems, allPlaylistsItems, rows])

  useEffect(function loadPagePlaylistRows() {
    if (!chunkLog.includes('tracks')) return
    if (!chunkLog.includes('playlists')) return
    if (!allTracksItems.length) return
    if (!allPlaylistsItems.length) return
    if (!currentProject) return
    if (!rows.length) return
    if (pagePlaylistSet) return

    const tracksRow = find(rows, { title: 'Tracks' })
    const playlistsRow = find(rows, { title: 'Playlists' })

    if (!tracksRow) return
    if (!playlistsRow) return

    const pagePlaylistIndex = findIndex(playerPlaylists, { name: 'On this page' })
    const selectedPlaylistIndex = findIndex(playerPlaylists, { name: 'Selected playlist' })

    if (pagePlaylistIndex > -1) {
      const pagePlaylistTracks = tracksRow.items
        .map(i => contentItemToTrack(i))
        .concat(
          flatten(playlistsRow.items.map(
            p =>
              getContentItemsFromRawList(allTracksItems, p.attachments)
                .map(i => contentItemToTrack(i))
          ))
        )

      dispatch(replacePlaylist(pagePlaylistIndex, { name: 'On this page', tracks: pagePlaylistTracks, linkTo: '#' }))
      setPagePlaylistSet(true)
    }

    if (playerPlaylists[selectedPlaylistIndex]?.tracks.length) {
      dispatch(setPlayerPlaylist(selectedPlaylistIndex))
    }

    else if (pagePlaylistIndex > -1) {
      dispatch(setPlayerPlaylist(pagePlaylistIndex))
    }

    else {
      dispatch(setPlayerPlaylist(0))
    }

  }, [chunkLog, allTracksItems, allPlaylistsItems, pagePlaylistSet, playerPlaylists, rows, currentProject])

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
          { rows.map(({ title, items }) => (
            <div
              className="overview-page-row"
              key={title}
            >
              <h2>{ title }</h2>
              <div className="overview-page-row-items">
                { items.map((item, i) =>
                  <TracksOverviewContentBox
                    key={item.id}
                    allTracksItems={allTracksItems}
                    contentItem={item}
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
