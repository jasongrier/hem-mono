import React, { ReactElement, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSelector, useDispatch } from 'react-redux'
import { Header, Footer, ArticlesGrid, PencilExtras } from '../../components/layout'
import { Planes } from '../../components/art'
import { SneakyHero } from '../../components/ui'
import { indexRequested } from '../../modules/articles'
import { RootState } from '../../index'
import { BASE_SITE_TITLE } from '../../config'

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
  const { articles, grandPianoArticles } = useSelector((state: RootState) => ({
    articles: state.articles.articles.filter(a => {
      return (
        a.category === 'Sound Library'
        && a.subCategory !== 'Grand Piano'
      )
    }),
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
          <div className="sound-library-home-hero-backdrop">
            <Planes />
          </div>
          <div className="sound-library-home-hero-content">
            <div className="sound-library-home-hero-blurb">
              <h1>
                Grand Piano
              </h1>
              <div>
                <h2>Eight new packs for Ableton Live</h2>
                <ul>
                  <li>Multimic recording of a 9-foot grand</li>
                  <li>Five "prepared" pianos</li>
                  <li>Full range of percussive slaps and body strikes</li>
                  <li>Drones from bowing, mallet rolls, and electromagnet</li>
                  <li>Cluster catalogue, <i>including the full 88-key cluster chord</i></li>
                </ul>
                {/* <button className="standard-button">Commit to it!</button> */}
                <button className="standard-button">Listen &amp; Download</button>
              </div>
            </div>
          </div>
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

      <ArticlesGrid
        articles={articles}
        displaySubcategory={true}
        heading="All Packs"
      />

      <Footer />
    </div>
  )
}

export default SoundLibraryHome
