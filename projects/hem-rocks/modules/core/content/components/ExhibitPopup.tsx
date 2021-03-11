import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Scrollbars from 'react-scrollbars-custom'
import { pausePlayer } from '../../../../../../lib/modules/website-player'
import { IContentItem, requestReadChunk, SiteText } from '../index'
import { RootState } from '../../../../index'
import { getContentItemsFromRawList } from '../functions'
import { PlayPauseButton } from '../../../../../../lib/packages/hem-buttons'
import { assetHostHostname } from '../../../../functions'

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
  const [currentFrame, setCurrentFrame] = useState<number>(1)

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
    <div className={`
      exhibit-popup
      exhibit-${ rootContentItem.slug }
    `}>
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
          width: '20000px',
          transition: 'all 250ms',
        }}
      >
        <div className={`
          exhibit-popup-frame
          exhibit-popup-frame-${0}
        `}>
          <Scrollbars
            createContext={true}
            noScroll={true}
            noScrollX={true}
          >
            <div
              className="exhibit-popup-frame-content"
              style={{ backgroundImage: `url(${assetHostHostname()}/${rootContentItem.project}/content/images/key-art/${rootContentItem.keyArt})`}}
            >
              <div className="site-text-container">
                <div className="site-text-text-block site-text-text-component-block">
                  <h1>
                    The Catalogue<br />
                    as a<br />
                    Work of Art
                  </h1>
                </div>
                <div className="site-text-text-block site-text-text-component-block">
                  <p>
                    A brief survey of ways in which artists have turned the act of cataloguing into an act of the sublime. What happens when the very act of creating a catalogue is, itself, a mode of artistic practice?
                  </p>
                </div>
              </div>
            </div>
          </Scrollbars>
        </div>
        <div className={`
          exhibit-popup-frame
          exhibit-popup-frame-${1}
        `}>
          <Scrollbars
            createContext={true}
            noScroll={true}
            noScrollX={true}
          >
            <div
              className="exhibit-popup-frame-content"
              // style={{ backgroundImage: `url(${assetHostHostname()}/${rootContentItem.project}/content/images/key-art/${rootContentItem.keyArt})`}}
            >
              <div className="site-text-container">
                <div className="site-text-text-block site-text-text-component-block">
                  <p>
                    <i>
                      Every passion borders on the chaotic, but the collector's passion borders on the chaos of memories.
                      <br />
                      <br />
                      — Walter Benjamin
                    </i>
                  </p>
                </div>
              </div>
            </div>
          </Scrollbars>
        </div>
        <div className={`
          exhibit-popup-frame
          exhibit-popup-frame-${2}
        `}>
          <Scrollbars
            createContext={true}
            noScroll={true}
            noScrollX={true}
          >
            <div
              className="exhibit-popup-frame-content"
              // style={{ backgroundImage: `url(${assetHostHostname()}/${rootContentItem.project}/content/images/key-art/${rootContentItem.keyArt})`}}
            >
              <div className="site-text-container">
                <div className="site-text-text-block site-text-text-component-block">
                  <h2>
                    Gathering,<br />
                    Collecting,<br />
                    Assembling
                  </h2>
                </div>
                <div className="site-text-text-block site-text-text-component-block">
                  <p>
                    Arranging combinations for the purpose of revealing a truth that can only emerge from the aggregate of multiple sources. Gestures of organizing with and within a body, with and within the hands caressing beloved fractures and divining balances and placements by touch and smell. The librarian sniffing the aisles and aisles of books, the harmonist tracking the folding and unfolding of chords lapping each others' overtone halos, and so on.
                  </p>
                </div>
              </div>
            </div>
          </Scrollbars>
        </div>
        <div className={`
          exhibit-popup-frame
          exhibit-popup-frame-${3}
        `}>
          <Scrollbars
            createContext={true}
            noScroll={true}
            noScrollX={true}
          >
            <div
              className="exhibit-popup-frame-content"
              // style={{ backgroundImage: `url(${assetHostHostname()}/${rootContentItem.project}/content/images/key-art/${rootContentItem.keyArt})`}}
            >
              <div className="site-text-container">
                <div className="site-text-text-block site-text-text-component-block">
                  <h2>Toy universes</h2>
                </div>
                <div className="site-text-text-block site-text-text-component-block">
                  <p>
                    Exhaustive, performative, captivating, catalogues can be more complete than the daunting completeness of the larger world. Toy universe, safe zone, and zone where risk is mapped onto various forms of adulation and obsession, the "catalogue-for-catalogue's sake" transmutes the "mild boredom of order"<sup>(1)</sup> into a form of exaltation.
                  </p>
                </div>
              </div>
            </div>
          </Scrollbars>
        </div>
        <div className={`
          exhibit-popup-frame
          exhibit-popup-frame-${4}
        `}>
          <Scrollbars
            createContext={true}
            noScroll={true}
            noScrollX={true}
          >
            <div
              className="exhibit-popup-frame-content"
              // style={{ backgroundImage: `url(${assetHostHostname()}/${rootContentItem.project}/content/images/key-art/${rootContentItem.keyArt})`}}
            >
              <div className="site-text-container">
                <div className="site-text-text-block site-text-text-component-block">
                  <h2>Two paths</h2>
                </div>
                <div className="site-text-text-block site-text-text-component-block">
                  <p>
                    It can be said that catalogue-works break down into two distinct types: Type I, in which a catalogue is a conceptual framing which contains other objects (including other works of art), and Type II, in which a work of art performs cataloguing within or _as_ itself.
                  </p>
                </div>
                <div className="site-text-text-block site-text-text-component-block">
                  <p>
                    One is a work <i>on</i> a body of bodies for the purpose of making a space, a place, or a world. It is dioramic and searches for completeness within a kind of inscription. The other is work <i>within and by</i> a body, a labor performance in which the the act of collation, sorting, analysis, and contemplation is done by/for/in a <i>reaching body</i> which searches for completeness outside of itself.
                  </p>
                </div>
              </div>
            </div>
          </Scrollbars>
        </div>
        <div className={`
          exhibit-popup-frame
          exhibit-popup-frame-${5}
        `}>
          <Scrollbars
            createContext={true}
            noScroll={true}
            noScrollX={true}
          >
            <div
              className="exhibit-popup-frame-content"
              // style={{ backgroundImage: `url(${assetHostHostname()}/${rootContentItem.project}/content/images/key-art/${rootContentItem.keyArt})`}}
            >
              <div className="site-text-container">
                <div className="site-text-text-block site-text-text-component-block">
                  <h2>Examples</h2>
                </div>
              </div>
            </div>
          </Scrollbars>
        </div>
        {/* {
          frames.map((frame, i) => (
            <div className={`
              exhibit-popup-frame
              exhibit-popup-frame-${i}
            `}>
              <Scrollbars
                createContext={true}
                noScroll={i === 1}
                noScrollX={true}
              >
                <div
                  className="exhibit-popup-frame-content"
                  style={
                    i === 0
                      ? { backgroundImage: `url(${assetHostHostname()}/${rootContentItem.project}/content/images/key-art/${rootContentItem.keyArt})`}
                      : { backgroundImage: `url(${assetHostHostname()}/${rootContentItem.project}/content/images/key-art/${frame.keyArt})`}
                >
                  <SiteText textItemId={frame.id} />
                </div>
              </Scrollbars>
            </div>
          ))
        } */}
      </div>
    </div>
  )
}

export default ExhibitionPopup
