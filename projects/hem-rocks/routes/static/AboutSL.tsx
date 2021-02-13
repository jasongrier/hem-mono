import React, { ReactElement, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import Mustache from 'mustache'
import marked from 'marked'
import { getContentItemById, requestReadChunk } from '../../modules/content'
import { assetHostHostname } from '../../functions'
import { BASE_SITE_TITLE } from '../../config'
import { RootState } from '../../index'
import { SoundLibrarySubnav, SoundLibraryBanner } from '../../components/layout'

function AboutSL(): ReactElement {
  const { chunkLog, contentItem } = useSelector((state: RootState) => ({
    chunkLog: state.content.chunkLog,
    contentItem: getContentItemById(state.content.contentItems, '93eee2a2-cbd1-43f4-9a0e-515d525c686a')
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
      <div className="page about-sl2 page-with-subnav page-with-banner">
        <SoundLibraryBanner />
        <SoundLibrarySubnav />
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

export default AboutSL
