import React, { ReactElement, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from 'lodash'
import Mustache from 'mustache'
import marked from 'marked'
import { assetHostHostname } from '../../../../../hem-rocks/functions'
import { getContentItemById, requestReadChunk } from '../'
import { RootState } from '../../../../index'

interface IComponents {
  contactForm?: () => ReactElement
  imageGallery?: (galleryId: string) => ReactElement
}

interface IProps {
  textItemId: string

  makeBlocks?: boolean
  render?: IComponents
}

function buildPayload() {
  return {
    assetHost: assetHostHostname()
  }
}

function buildBlockContent(block: string) {
  const blockContent = marked(
    Mustache.render(block, buildPayload()),
  )

  if (blockContent[0] !== '<') {
    return `<p>${ blockContent }</p>`
  }

  else {
    return blockContent
  }
}

function SiteText({
  textItemId,

  makeBlocks = true,
  render,
}: IProps): ReactElement {
  const { chunkLog, contentItem } = useSelector((state: RootState) => ({
    chunkLog: state.content.chunkLog,
    contentItem: getContentItemById(state.content.contentItems, textItemId),
  }))

  const dispatch = useDispatch()

  const [textBlocks, setTextBlocks] = useState<string[]>([])

  useEffect(function loadSiteTexts() {
    if (chunkLog.includes('site-texts')) return
    dispatch(requestReadChunk('site-texts'))
  }, [chunkLog])

  useEffect(function getParagraphs() {
    if (!contentItem) return
    if (!makeBlocks) return
    setTextBlocks(contentItem.description.split('\n\n'))
    dispatch(requestReadChunk('site-texts'))
  }, [contentItem])

  return (
    <div className="site-text-container">
      { makeBlocks && textBlocks.map((block, i) =>
        block.indexOf('{{ Component:ContactForm') > -1
          ? <div
              className="site-text-text-block site-text-text-component-block"
              key={i}
            >
              {render?.contactForm ? render.contactForm() : ''}
            </div>
          : <div
              className="site-text-text-block"
              dangerouslySetInnerHTML={{
                __html: buildBlockContent(block),
              }}
              key={i}
            />
      )}
      { makeBlocks && textBlocks.map((block, i) =>
        block.indexOf('{{ Component:ImageGallery') > -1
          ? <div
              className="site-text-text-block site-text-text-component-block"
              key={i}
            >
              { render?.imageGallery
                ? render.imageGallery(block.split(':')[2].split(' }}')[0])
                : ''
              }
            </div>
          : <div
              className="site-text-text-block"
              dangerouslySetInnerHTML={{
                __html: buildBlockContent(block),
              }}
              key={i}
            />
      )}
      { !makeBlocks && contentItem && (
        <p dangerouslySetInnerHTML={{
          __html: marked(
            Mustache.render(contentItem.description, {
              assetHost: assetHostHostname(),
            })
          ),
        }} />
      )}
    </div>
  )
}

export default SiteText
