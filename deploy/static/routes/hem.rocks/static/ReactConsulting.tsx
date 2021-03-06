import React, { ReactElement, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import Mustache from 'mustache'
import marked from 'marked'
import { getContentItemById, requestReadChunk } from '../../../modules/core/content'
import { assetHostHostname } from '../../../functions'
import { BASE_SITE_TITLE } from '../../../config'
import { RootState } from '../../../index'
import { SoundLibrarySubnav, MainContentBanner } from '../../../components/layout'

function ReactConsulting(): ReactElement {
  const { chunkLog, contentItem } = useSelector((state: RootState) => ({
    chunkLog: state.content.chunkLog,
    contentItem: getContentItemById(state.content.contentItems, '65439798-930f-4def-b1c9-b62ace49f9c6')
  }))

  const dispatch = useDispatch()

  useEffect(function preloadSiteText() {
    if (chunkLog.includes('site-texts')) return
    dispatch(requestReadChunk('site-texts'))
  }, [chunkLog])

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page react-consulting">
        <div className="main-content-section first-main-content-section">
          { contentItem && (
            <div dangerouslySetInnerHTML={{
              __html: marked(
                Mustache.render(contentItem.description, { assetHost: assetHostHostname() })
              ),
            }} />
          )}
        </div>
      </div>
    </>
  )
}

export default ReactConsulting
