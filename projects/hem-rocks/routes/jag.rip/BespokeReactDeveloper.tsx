import React, { ReactElement, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Mustache from 'mustache'
import marked from 'marked'
import { assetHostHostname } from '../../functions'
import { getContentItemById, requestReadChunk } from '../../modules/core/content'
import { RootState } from '../../index'

function BespokeReactDeveloper(): ReactElement {
  const { chunkLog, contentItem } = useSelector((state: RootState) => ({
    chunkLog: state.content.chunkLog,
    contentItem: getContentItemById(state.content.contentItems, '353a8233-7926-4bfa-a858-36d09c357da8')
  }))

  const dispatch = useDispatch()

  useEffect(function preloadSiteText() {
    if (chunkLog.includes('site-texts')) return
    dispatch(requestReadChunk('site-texts'))
  }, [chunkLog])

  return (
    <div className="page page-bespoke-react-developer">
      { contentItem && (
        <div dangerouslySetInnerHTML={{
          __html: marked(
            Mustache.render(contentItem.description, { assetHost: assetHostHostname() })
          ),
        }} />
      )}
    </div>
  )
}

export default BespokeReactDeveloper
