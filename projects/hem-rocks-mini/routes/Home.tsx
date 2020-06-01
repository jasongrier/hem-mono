import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { GrandPianoHeroine } from '../components/heroines'
import { Helmet } from 'react-helmet'
import { MainContentList, hasTag } from '../modules/content'
import { BASE_SITE_TITLE } from '../config'
import { RootState } from '../index'

function Home(): ReactElement {
  const { contentItems } = useSelector((state: RootState) => ({
    contentItems: state.content.contentItems,
  }))

  const featuredItems = contentItems.filter(item => hasTag(item, 'home-feature'))

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
          items={featuredItems}
          showCategoryOnContentBoxes={true}
        />
      </div>
    </>
  )
}

export default Home
