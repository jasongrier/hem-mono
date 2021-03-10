import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { pausePlayer } from '../../../../../../lib/modules/website-player'
import { IContentItem, requestReadChunk, SiteText } from '../index'
import { RootState } from '../../../../index'
import { getContentItemsFromRawList } from '../functions'
import { PlayPauseButton } from '../../../../../../lib/packages/hem-buttons'

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
  const [currentFrame, setCurrentFrame] = useState<number>(0)

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

  const prevFrame = useCallback(
    function prevFrameFn() {
      setCurrentFrame(currentFrame - 1)
    }, [currentFrame],
  )

  const nextFrame = useCallback(
    function prevFrameFn() {
      setCurrentFrame(currentFrame + 1)
    }, [currentFrame],
  )

  if (!rootContentItem) return (<div />)

  return (
    <div className="exhibit-popup">
      <div className="exhibit-popup-navigation-arrows">
        {currentFrame > 0 && (
          <PlayPauseButton
            className="exhibit-popup-navigation-arrow-prev"
            onClick={prevFrame}
            playing={false}
          />
        )}
        {currentFrame < frames.length - 1 && (
          <PlayPauseButton
            className="exhibit-popup-navigation-arrow-next"
            onClick={nextFrame}
            playing={false}
          />
        )}
      </div>
      <div
        className="exhibit-popup-frames"
        style={{
          position: 'absolute',
          top: '0',
          left: '50%',
          marginLeft: (currentFrame * -1100) - 550  + 'px',
          width: (frames.length * 1100) + 'px',
          transition: 'all 500ms',
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
