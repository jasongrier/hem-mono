import React, { ReactElement, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Mustache from 'mustache'
import marked from 'marked'
import { assetHostHostname } from '../../../../../hem-rocks/functions'
import { getContentItemById, requestReadChunk } from '../'
import { RootState } from '../../../../index'

interface IProps {
  textItemId: string

  renderContactForm?: () => ReactElement
}

function ReactJavascriptConsulting({ textItemId, renderContactForm }: IProps): ReactElement {
  const { chunkLog, contentItem } = useSelector((state: RootState) => ({
    chunkLog: state.content.chunkLog,
    contentItem: getContentItemById(state.content.contentItems, textItemId),
  }))

  const dispatch = useDispatch()

  const [textBlocks, setTextBlocks] = useState<string[]>([])

  useEffect(function preloadSiteText() {
    if (chunkLog.includes('site-texts')) return
    dispatch(requestReadChunk('site-texts'))
  }, [chunkLog])

  useEffect(function getParagraphs() {
    if (!contentItem) return
    setTextBlocks(contentItem.description.split('\n\n'))
    dispatch(requestReadChunk('site-texts'))
  }, [contentItem])

  return (
    <div className="site-text-container">
      { textBlocks.map(block =>
        block.indexOf('{{ Component:ContactForm') > -1
          ? renderContactForm ? renderContactForm() : <div />
          : <div dangerouslySetInnerHTML={{
              __html: marked(
                Mustache.render(block, {
                  assetHost: assetHostHostname(),
                })
              ),
            }} />
      )}
  </div>
  )
}

export default ReactJavascriptConsulting
