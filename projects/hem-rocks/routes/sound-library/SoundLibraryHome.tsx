import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSelector } from 'react-redux'
import { Header, Footer, ArticlesGrid, PencilExtras } from '../../components/layout'
import { Planes, SneakyHero } from '../../components/ui'
import { RootState } from '../../store'
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
  const { articles, comingSoonArticles, grandPianoArticles } = useSelector((state: RootState) => ({
    articles: state.app.articles.filter(a => a.featured).slice(0, 12),
    comingSoonArticles: state.app.articles.filter(a => a.subCategory === 'Coming Soon'),
    grandPianoArticles: state.app.articles.filter(a => a.subCategory === 'Grand Piano'),
  }))

  return (
    <div className="page sound-library-home">

      <div className="site-header-cover"></div>

      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>

      <Header subheading="Sound Library" />

      <SneakyHero>
        <div className="sound-library-home-hero">
          <div className="sound-library-home-hero-backdrop">
            <Planes />
          </div>
          <div className="sound-library-home-hero-content">
            <div className="sound-library-home-hero-blurb">
              <h1>Grand Piano</h1>
              {/* <div>
                <h2>What's so great about it</h2>
                <ul>
                  <li>Great thing</li>
                  <li>Great thing</li>
                  <li>Great thing</li>
                  <li>Great thing</li>
                </ul>
                <button>Commit to it!</button>
                <button>Learn more</button>
              </div> */}
            </div>
          </div>
        </div>
      </SneakyHero>

      <PencilExtras items={pencilExtrasItems} />

      <ArticlesGrid
        articles={grandPianoArticles}
        displaySubcategory={true}
        heading="Explore the Grand Piano Sounds"
        fourUp={true}
      />

      <ArticlesGrid
        articles={comingSoonArticles}
        heading="Coming Soon"
        fourUp={true}
      />

      <ArticlesGrid
        articles={articles}
        heading="All Packs"
      />

      <Footer />
    </div>
  )
}

export default SoundLibraryHome
