import React, { ReactElement, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import { map } from 'lodash'
import Mustache from 'mustache'
import marked from 'marked'
import { getContentItemById, requestReadChunk } from '../../modules/content'
import { assetHostHostname } from '../../functions'
import { BASE_SITE_TITLE } from '../../config'
import { RootState } from '../../index'
import { SoundLibrarySubnav } from '../../components/layout'

function WhatsNewInSL2(): ReactElement {
  const { chunkLog, contentItem, contentItems } = useSelector((state: RootState) => ({
    chunkLog: state.content.chunkLog,
    contentItems: state.content.contentItems,
    contentItem: getContentItemById(state.content.contentItems, '20813842-3935-4347-8d41-01e547f47a40')
  }))

  const dispatch = useDispatch()

  useEffect(function preloadSiteText() {
    if (chunkLog.includes('articles')) return
    dispatch(requestReadChunk('articles'))
  }, [chunkLog])

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-whats-new-in-sl-two">
        <SoundLibrarySubnav />
        <h1>{ contentItem?.title }</h1>
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

export default WhatsNewInSL2
