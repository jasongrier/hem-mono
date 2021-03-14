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
  const [currentFrame, setCurrentFrame] = useState<number>(9)

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
        {currentFrame < 12 && (
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
                    What happens when the very process of creating a catalogue is, itself, a mode of artistic practice? A brief survey of ways in which artists have turned the act of cataloguing into an act of the sublime.
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
              // style={{ backgroundImage: `url(${assetHostHostname()}/${rootContentItem.project}/content/images/key-art/candles.jpg)`}}
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
                  <h2>Catalogue dreams</h2>
                </div>
                <div className="site-text-text-block site-text-text-component-block">
                  <p>To dream is to both reveal and coerce the real. To catalogue for catalogue's sake —to catalogue with specific the desire to both unveil and encapsulate a _corpus_— is a particular kind of dream-work. It is a world shaped by a feverish dream with delusional constancy; one with total influence on itself and throughout itself; both introverted and imperial; engendering and defiant. For this reason it dazzles.</p>
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
                  <h2>Two labors</h2>
                </div>
                <div className="site-text-text-block site-text-text-component-block">
                  <p>
                    It can be said that catalogue-works break down into two distinct types: Type I, in which a catalogue is a conceptual framing which contains other objects (including other works of art), and Type II, in which a work of art performs cataloguing within or _as_ itself.
                  </p>
                </div>
                <div className="site-text-text-block site-text-text-component-block">
                  <p>
                    One is a work <i>on</i> a body of bodies for the purpose of making a space, a place, or a world. It is dioramic and searches for completeness within a kind of inscription, a place where one can do nothing but play.
                  </p>
                  <p>
                    The other is work <i>within and by</i> a body, a labor performance in which the the act of collation, sorting, analysis, and contemplation is done by/for/in a <i>reaching body</i> which searches for completeness outside of itself.
                  </p>
                </div>
              </div>
            </div>
          </Scrollbars>
        </div>
        <div className={`
          exhibit-popup-frame
          exhibit-popup-frame-${6}
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
        <div className={`
          exhibit-popup-frame
          exhibit-popup-frame-${7}
        `}>
          <Scrollbars
            createContext={true}
            noScroll={true}
            noScrollX={true}
          >
            <div
              className="exhibit-popup-frame-content"
              style={{ backgroundImage: `url(${assetHostHostname()}/${rootContentItem.project}/content/images/key-art/mary-lou-williams.jpg)`}}
            >
              <div className="site-text-container">
                <div className="site-text-text-block site-text-text-component-block">
                  <h2>Catalogue<br />and legends</h2>
                </div>
                <div className="site-text-text-block site-text-text-component-block">
                  <p>Somewhere during the mid-20th century emerged the "concept album". For the first time, the collection took precedence over the individual items in the collection. The listener's attention was directed to the cohesiveness of the whole and the interrelationships and qualities of the parts gave rise to a deeper statement.</p>
                </div>
                <div className="site-text-text-block site-text-text-component-block">
                  <p>Jazz pianist Mary-Lou Williams' 1963 opus "Black Christ of the Andes" is one of the most ambitious and conceptually resonant examples. In the form of a Catholic mass, avant-garde, post-bop, and devotional motifs are carefully arranged to move the listener through an epic narrative about the legend of St Martin de Porres.</p>
                </div>
              </div>
            </div>
          </Scrollbars>
        </div>
        <div className={`
          exhibit-popup-frame
          exhibit-popup-frame-${8}
        `}>
          <Scrollbars
            createContext={true}
            noScroll={true}
            noScrollX={true}
          >
            <div
              className="exhibit-popup-frame-content"
              style={{ backgroundImage: `url(${assetHostHostname()}/${rootContentItem.project}/content/images/key-art/agnes-martin.jpg)`}}
            >
              <div className="site-text-container">
                <div className="site-text-text-block site-text-text-component-block">
                  <h2>Catalogue and<br />spirit</h2>
                </div>
                <div className="site-text-text-block site-text-text-component-block">
                  <p>Agnes Martin described her series "On a Clear Day" as shift from joy to happiness. The 30 meticulous prints of subtle grids produces a monumental sense of contemplation. But unlike her previous works, which exemplify "joy", ecstasy and elation, "On a Clear Day" represents a state where the sublime becomes routine; suffuses all of one's days in the form of happiness.</p>
                  <p>This subtle but powerful distinction between joy and happiness is perhaps where the catalogue-as-artwork finds its inner self. The sense of the peacefulness of regularity excited by careful inspection of variety within the subtle, combined with the expansiveness of the experience of the grander study.</p>
                </div>
              </div>
            </div>
          </Scrollbars>
        </div>
        <div className={`
          exhibit-popup-frame
          exhibit-popup-frame-${9}
        `}>
          <Scrollbars
            createContext={true}
            noScroll={true}
            noScrollX={true}
          >
            <div
              className="exhibit-popup-frame-content"
              style={{ backgroundImage: `url(${assetHostHostname()}/${rootContentItem.project}/content/images/key-art/utility.jpg)`}}
            >
              <div className="site-text-container">
                <div className="site-text-text-block">
                  <h2>Catalogue and<br />utility</h2>
                </div>
                <div className="site-text-text-block">
                  <p>
                    In 2018, Australian collective Utility produced a collection of bespoke arpeggios for electronic music producers and DJ's. Named "Nexus Destiny" after a ubiquitous EDM software plugin, the project explores the boundaries between originality, authorship, and re-use.
                  </p>
                  <p>
                    They take a both critical and celebratory perspective on a modern musical culture which revolves around archives or databases. Utility demonstrates that an archive of banal presets can be animated within and as a creative framework of its own.
                  </p>
                </div>
              </div>
            </div>
          </Scrollbars>
        </div>
        <div className={`
          exhibit-popup-frame
          exhibit-popup-frame-${10}
        `}>
          <Scrollbars
            createContext={true}
            noScroll={true}
            noScrollX={true}
          >
            <div
              className="exhibit-popup-frame-content"
              style={{ backgroundImage: `url(${assetHostHostname()}/${rootContentItem.project}/content/images/key-art/demonstration-disc.jpg)`}}
            >
              <div className="site-text-container">
                <div className="site-text-text-block">
                  <h2>Catalogue and<br />quilting</h2>
                </div>
                <div className="site-text-text-block">
                  <p>
                    The HEM Sound Library (produced by Jason Grier from 2017 to the present) is a sweeping take on sonic, artistic, and perceptual labor. It is intended to be both a tool for soundmakers as well as a meditation on the extra-musical.
                  </p>
                </div>
                <div className="site-text-text-block">
                  <p>
                    Sound objects are deployed like patches on a quilt, within sound packs that, themselves are miniature catalogues of their own. And like a quilt, SL is a compendium of materials: Curated scraps of edited-out mistakes, a grizzled old piano with rusted strings, cosy at-home sessions on the rug, musty secondhand store vinyl, and the audio waste discarded by noise-reduction algorithms.
                  </p>
                </div>
                {/* <div className="site-text-text-block">
                  <p>
                    Like Nexus Destiny, HEM SL also flirts with utilitarianism; promoted commercially via Ableton, and with a number of musicians already using the sounds in their own compositions. It even includes a "Demonstration Disc" which, itself, doubles as a proper album release.
                  </p>
                </div> */}
              </div>
            </div>
          </Scrollbars>
        </div>
        <div className={`
          exhibit-popup-frame
          exhibit-popup-frame-${11}
        `}>
          <Scrollbars
            createContext={true}
            noScroll={true}
            noScrollX={true}
          >
            <div
              className="exhibit-popup-frame-content"
              style={{ backgroundImage: `url(${assetHostHostname()}/${rootContentItem.project}/content/images/key-art/august-harp.png)`}}
            >
              <div className="site-text-container">
                <div className="site-text-text-block site-text-text-component-block">
                  <h2>Catalogue and<br />performance</h2>
                </div>
                <div className="site-text-text-block site-text-text-component-block">
                  <p>James Tenney's composition "August Harp" calls for a harpist to improvise on a simple motif and to "continue as long as any variation seems possible".</p>
                </div>
                <div className="site-text-text-block site-text-text-component-block">
                  <p>Here, the performer creates an intervallic catalogue within and as the performance itself. This catalogue-work is both a projection of the performing body, and of its own schematization in the score.</p>
                </div>
              </div>
            </div>
          </Scrollbars>
        </div>
        <div className={`
          exhibit-popup-frame
          exhibit-popup-frame-${12}
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
                  <h2>Links &amp; citations</h2>
                  <ul>
                    <li>
                      <a href="https://www.kulturkaufhaus.de/de/detail/ISBN-9781328470232/Benjamin-Walter/Illuminations">
                        Epigraph and (1) from "Illuminations" by Walter Benjamin
                      </a>
                    </li>
                    <li>
                      <a href="https://www.npr.org/2017/08/07/541822331/shocking-omissions-mary-lou-williams-choral-masterpiece-black-christ-of-the-ande">Mary Lou Williams on NPR</a>
                    </li>
                    <li>
                      <a href="https://www.guggenheim.org/audio/track/agnes-martin-on-a-clear-day-1973">Agnes Martin at The Guggenheim</a>
                    </li>
                    <li>
                      <a href="http://unprojects.org.au/un-extended/dear-un/interview-utility/">Utility on un Magazine</a>
                    </li>
                    <li>
                      <a href="https://www.ableton.com/en/blog/jason-grier-demonstration-disc/">HEM SL on Ableton</a>
                    </li>
                    <li>
                      <a href="https://blogthehum.com/2016/05/31/james-tenneys-postal-pieces/">James Tenney's "Postal Pieces" on The Hum</a>
                    </li>
                    <li>
                      <a href="http://jag.rip">
                        Text by Jason Grier
                      </a>
                    </li>
                  </ul>
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
