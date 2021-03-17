import React, { ReactElement, useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { PlayableBoxActions } from '../../../components/layout'
import { MainContentList, contentItemToTrack, getContentItemsFromRawList, requestReadChunk } from '../../../modules/core/content'
import { TrackPlayPauseButton } from '../../../../../lib/modules/website-player'
import { LabelTimeline } from '../../../components/timeline'
import { BASE_SITE_TITLE } from '../../../config'
import { RootState } from '../../../index'

function Label(): ReactElement {
  const { allContentItems, chunkLog, currentProject } = useSelector((state: RootState) => ({
    allContentItems: state.content.contentItems,
    chunkLog: state.content.chunkLog,
    currentProject: state.content.currentProject,
  }))

  const dispatch = useDispatch()

  const [refreshTimeline, setRefreshTimeline] = useState(0)

  const { filter: currentFilter } = useParams() as any

  useEffect(function updateTimeline() {
    setRefreshTimeline(refreshTimeline + 1)
  }, [currentFilter])

  useEffect(function getChunks() {
    if (!chunkLog.includes('playlists')) {
      dispatch(requestReadChunk('playlists'))
    }
  }, [chunkLog])

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-label">
        <LabelTimeline refresh={refreshTimeline} />
        <h1>Label</h1>
        <MainContentList
          currentFilter={currentFilter || 'releases'}
          speciallyOrderedTags={['Releases', 'Events']}
          excludeTags={['Primary Format', 'New', 'Label Page', 'Format:Digital']}
          category="label"
        >
          { item => {
            const directFromArtist = item.externalLinkUrl && item.externalLinkText

            return (
              <>
                <PlayableBoxActions
                  item={item}
                  contentItems={allContentItems}
                  currentProject={currentProject}
                />
                { directFromArtist && (
                  <a
                    className="action-button action-button-wide"
                    href={item.externalLinkUrl}
                  >
                    { item.externalLinkText }
                  </a>
                )}
                { !directFromArtist && (
                  <button className="action-button">
                    {
                      item.isDigitalProduct
                        ? 'Download'
                        : 'Info'
                    }
                  </button>
                )}
              </>
            )
          }}
        </MainContentList>
      </div>
    </>
  )
}

export default Label
