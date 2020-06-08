import React, { ReactElement, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import { setPlayerPlaylist } from '../../../../lib/modules/player'
import { GrandPianoHeroine } from '../../components/heroines'
import { MainContentList, getContentItemsFromList } from '../../modules/content'
import { BASE_SITE_TITLE } from '../../config'
import { RootState } from '../../index'

function Home(): ReactElement {
  const { contentItems } = useSelector((state: RootState) => ({
    contentItems: state.content.contentItems,
  }))

  const dispatch = useDispatch()

  useEffect(function setPlaylistTab() {
    dispatch(setPlayerPlaylist(0))
  }, [])

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-home">
        <div className="main-heroine">
          <GrandPianoHeroine />
        </div>
        <MainContentList
          category="home-feature"
          items={getContentItemsFromList(contentItems, 'home-page-features')}
          shouldSetCurrentPlaylist={false}
          showCategoryOnContentBoxes={true}
        />
      </div>
    </>
  )
}

export default Home
