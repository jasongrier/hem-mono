import React, { ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { compact } from 'lodash'
import { ITrack, TrackPlayPauseButton} from '../../../../../lib/modules/website-player'
import { MainContentList, hasTag, contentItemToTrack, getContentItemsFromRawList } from '../../../modules/core/content'
import { PROJECT_CONFIGS } from '../../../config'
import { RootState } from '../../../index'

function Home(): ReactElement {
  const { contentItems } = useSelector((state: RootState) => ({
    contentItems: state.content.contentItems,
  }))

  const { filter: currentFilter }: any = useParams()

  return (
    <div className="page page-home">
      <Helmet>
        <title>{ PROJECT_CONFIGS['jag.rip'].HTML_HEAD_META.BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <MainContentList
        boxBipolarX={false}
        boxBipolarY={true}
        boxMinMarginX={0}
        boxMinMarginY={0}
        boxMarginRangeX={200}
        boxMarginRangeY={0}
        boxHotZoneTop={75}
        boxHotZoneBottom={350}
        boxWidth={500}
        boxHeight={400}
        boxRangeX={200}
        boxRangeY={20}
        category="general-content"
        additionalCategory="site-texts"
        prependTagLinks={[
          { title: 'Home', url: '/' },
        ]}
        appendTagLinks={compact([
          { title: 'Booking', url: '/booking' },
          // { title: 'About', url: '/about' },
          window.process?.env.ELECTRON_MONO_DEV
            ? { title: 'Admin', url: '/admin/list' }
            : null
        ])}
        currentFilter={currentFilter || 'home'}
        orderByOrder={true}
        shouldSetCurrentPlaylist={true}
        hideFilters={[
          'Blog',
          'Case Studies',
          'Consulting',
          'Home',
          'Mixes',
          'Productions',
          'Radio',
          'Tracks',
          'Web Work',
          'Websites',
        ]}
        extraBottomBoxes={[1]}
        speciallyOrderedTags={[
          'Music %26 Sound',
          'Photo %26 Film',
          'Installation %26 Live',
          'Creative Code',
          'Press',
          'Blog',
        ]}
      >
        {(item) => {
          let attachedTracks: ITrack[]

          if (
            hasTag(item, 'tracks')
            || hasTag(item, 'mixes')
            || hasTag(item, 'radio')
            || hasTag(item, 'interviews')
          ) {
            attachedTracks = [contentItemToTrack(item)]
          }

          else {
            attachedTracks = getContentItemsFromRawList(contentItems, item.attachments)
              .map(track =>
                contentItemToTrack(track)
              )
          }

          if (!attachedTracks || !attachedTracks.length) return <div />

          return (
            <TrackPlayPauseButton
              activeFor={attachedTracks}
              track={attachedTracks[0]}
            />
          )
        }}
      </MainContentList>
    </div>
  )
}

export default Home
