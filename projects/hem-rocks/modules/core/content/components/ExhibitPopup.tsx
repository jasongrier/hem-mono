import React, { ReactElement, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { pausePlayer } from '../../../../../../lib/modules/website-player'
import { IContentItem, requestReadChunk, SiteText } from '../index'
import { RootState } from '../../../../index'
import { getContentItemsFromRawList } from '../functions'
import { ChevronButton } from '../../../../../../lib/packages/hem-buttons'

interface IProps {
  rootContentItem: IContentItem | null
}

function ExhibitionPopup({ rootContentItem }: IProps): ReactElement {
  const { allContentItems, chunkLog } = useSelector((state: RootState) => ({
    allContentItems: state.content.contentItems,
    chunkLog: state.content.chunkLog,
  }))

  const dispatch = useDispatch()

  const [frames, setFrames] = useState<IContentItem[]>([])

  useEffect(function loadExhibitions() {
    if (chunkLog.includes('exhibits')) return
    dispatch(requestReadChunk('exhibits'))
  }, [chunkLog])

  useEffect(function loadSiteTexts() {
    if (chunkLog.includes('site-texts')) return
    dispatch(requestReadChunk('site-texts'))
  }, [chunkLog])

  useEffect(function init() {
    if (!rootContentItem) return
    if (!allContentItems) return
    if (!allContentItems.length) return

    dispatch(pausePlayer())
    setFrames(getContentItemsFromRawList(allContentItems, rootContentItem.attachments))
  }, [allContentItems])

  if (!rootContentItem) return (<div />)

  return (
    <div className="exhibit-popup">
      <div className="exhibit-popup-navigation-arrows">
        <ChevronButton
          className="exhibit-popup-navigation-arrow-prev"
        />
        <ChevronButton
          className="exhibit-popup-navigation-arrow-next"
        />
      </div>
      <div
        className="exhibit-popup-frames"
        style={{
          position: 'absolute',
          top: '0',
          left: '50%',
          marginLeft: '-550px',
          width: (frames.length * 1100) + 'px',
        }}
      >
        {
          frames.map(frame => (
            <div className="exhibit-popup-frame">
              <h2>{ frame.title }?</h2>
              <SiteText textItemId={frame.id} />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default ExhibitionPopup
