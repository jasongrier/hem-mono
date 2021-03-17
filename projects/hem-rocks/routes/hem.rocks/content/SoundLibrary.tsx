import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { Link, NavLink, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { MainContentList, contentItemToTrack, getContentItemsFromRawList } from '../../../modules/core/content'
import { TrackPlayPauseButton } from '../../../../../lib/modules/website-player'
import { BASE_SITE_TITLE } from '../../../config'
import { SoundLibrarySubnav, PlayableBoxActions } from '../../../components/layout'
import { RootState } from '../../../index'

function SoundLibrary(): ReactElement {
  const { allContentItems, currentProject } = useSelector((state: RootState) => ({
    allContentItems: state.content.contentItems,
    currentProject: state.content.currentProject,
  }))

  const { filter: currentFilter }: any = useParams()

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-sound-library page-with-subnav page-with-banner">
        <SoundLibrarySubnav />
        <MainContentList
          buttonText="Download"
          category="sound-library"
          currentFilter={currentFilter || 'all'}
          excludeFromAll="Midi Devices"
          orderByOrder={true}
          noAll={false}
          shouldSetCurrentPlaylist={true}
          speciallyOrderedTags={['Featured']}
          excludeTags={['Home Features']}
        >
          { item => (
            <PlayableBoxActions
              item={item}
              contentItems={allContentItems}
              currentProject={currentProject}
            />
          )}
        </MainContentList>
      </div>
    </>
  )
}

export default SoundLibrary
