import React, { ReactElement, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from 'lodash'
import Mustache from 'mustache'
import marked from 'marked'
import { assetHostHostname } from '../../../../../hem-rocks/functions'
import { getContentItemById, IContentItem, requestReadChunk } from '../'
import { RootState } from '../../../../index'

interface IComponents {
  contactForm?: () => ReactElement
  imageGallery?: (galleryId: string) => ReactElement
}

interface IProps {
  textItemId: string

  render?: IComponents
  textItemField?: keyof IContentItem
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

  render,
  textItemField = 'description',
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
    const fieldValue = contentItem[textItemField]
    if (typeof fieldValue !== 'string') return
    setTextBlocks(fieldValue.split('\n\n'))
    dispatch(requestReadChunk('site-texts'))
  }, [contentItem])

  return (
    <div className="site-text-container">
      { textBlocks.map((block, i) => {
        if (block.indexOf('{{ Component') > -1) {
          return (
            <div
              className="site-text-text-block site-text-text-component-block"
              key={i}
            >
              {(() => {
                if (block.indexOf('{{ Component:ContactForm') > -1) {
                  return render?.contactForm ? render.contactForm() : ''
                }

                else if (block.indexOf('{{ Component:ImageGallery') > -1) {
                  return render?.imageGallery ? render.imageGallery(block.split(':')[2].split(' }}')[0]) : ''
                }
              })()}
            </div>
          )
        }

        else {
          return (
            <div
              className="site-text-text-block"
              dangerouslySetInnerHTML={{
                __html: buildBlockContent(block),
              }}
              key={i}
            />
          )
        }
      })}
    </div>
  )
}

export default SiteText
