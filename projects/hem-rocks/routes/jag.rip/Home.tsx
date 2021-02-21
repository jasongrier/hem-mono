import React, { ReactElement } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { compact } from 'lodash'
import { ITrack, TrackPlayPauseButton} from '../../../../lib/modules/website-player'
import { MainContentList, hasTag, contentItemToTrack, getContentItemsFromRawList } from '../../modules/core/content'
import { PROJECT_CONFIGS } from '../../config'
import { RootState } from '../../index'

function Home(): ReactElement {
  const { contentItems } = useSelector((state: RootState) => ({
    contentItems: state.content.contentItems,
  }))

  const { pathname }: any = useLocation()
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
        boxHotZoneTop={-100}
        boxHotZoneBottom={250}
        boxWidth={500}
        boxHeight={350}
        boxRangeX={200}
        boxRangeY={20}
        category="projects"
        additionalCategory="site-texts"
        prependTagLinks={[
          { title: 'Home', url: '/' },
        ]}
        appendTagLinks={compact([
          { title: 'About', url: '/about' },
          window.process?.env.ELECTRON_MONO_DEV
            ? { title: 'Admin', url: '/admin/list' }
            : null
        ])}
        currentFilter={currentFilter || 'home'}
        orderByOrder={pathname === '/'}
        shouldSetCurrentPlaylist={true}
        hideFilters={[
          'Home',
          'Websites',
          'Consulting',
          'Productions',
          'Case Studies',
          'Mixes',
          'Tracks',
          'Radio',
        ]}
        excludeFromAll={['Consulting']}
        linkTo={contentItem => `home/${contentItem.slug}`}
        speciallyOrderedTags={[
          'Music %26 Sound',
          'Photo %26 Film',
          'Installation %26 Live',
          'Text',
          'Code',
          'Press',
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
