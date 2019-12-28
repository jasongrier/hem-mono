import React, { ReactElement, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSelector, useDispatch } from 'react-redux'
import { Footer, Header, PencilExtras } from '../../components/layout'
import { SneakyHero } from '../../components/ui'
import { ArticlesGrid, indexRequested } from '../../modules/articles'
import { RootState } from '../../index'
import { BASE_SITE_TITLE } from '../../config'
import { GrandPianoHeroine } from './components'

const pencilExtrasItems = {
  left: [
    { text: 'HEM Home Page', type: 'internal', url: '/' },
    { text: 'About Sound Library', type: 'internal', url: '/about' },
    { text: 'View all packs', type: 'internal', url: '/articles' },
    { text: 'Made with SL', type: 'internal', url: '/media' },
  ],
  right: [
    { text: 'View the packs on ableton.com', type: 'external', url: 'http://google.com' },
    { text: 'Get support', type: 'external', url: 'http://google.com' },
  ],
}

function SoundLibraryHome(): ReactElement {
  const { grandPianoArticles } = useSelector((state: RootState) => ({
    grandPianoArticles: state.articles.articles.filter(a => a.subCategory === 'Grand Piano').sort((a, b) => a.order - b.order),
  }))

  const dispatch = useDispatch()

  useEffect(function fetchArticles() {
    dispatch(indexRequested('/'))
  }, [])

  return (
    <div className="page sound-library-home">

      <div className="site-header-cover"></div>

      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>

      <Header
        subheading="Sound Library"
        subheadingLink="/sound-library"
      />

      <SneakyHero>
        <div className="sound-library-home-hero">
          <GrandPianoHeroine />
        </div>
      </SneakyHero>

      <PencilExtras items={pencilExtrasItems} />

      <div className="multi-pack-explorer">
        <ArticlesGrid
          articles={grandPianoArticles}
          displaySubcategory={true}
          heading="Explore the Grand Piano Sounds"
          fourUp={true}
        >
          {/* <button className="standard-button download-all-button">Download All</button> */}
        </ArticlesGrid>
      </div>

      {/* <ArticlesGrid
        articles={articles}
        displaySubcategory={true}
        heading="All Packs"
      /> */}

      <Footer />
    </div>
  )
}

export default SoundLibraryHome
