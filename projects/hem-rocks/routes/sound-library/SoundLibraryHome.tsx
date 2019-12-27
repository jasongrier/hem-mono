import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSelector } from 'react-redux'
import { Header, Footer, ArticlesGrid, PencilExtras } from '../../components/layout'
import { Planes, SneakyHero } from '../../components/ui'
import { RootState } from '../../store'
import { BASE_SITE_TITLE } from '../../config'

const pencilExtrasItems = {
  left: [
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
  const { articles } = useSelector((state: RootState) => ({
    articles: state.app.articles.filter(a => a.featured).slice(0, 12),
  }))

  return (
    <div className="page sound-library-home">
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>

      <Header />

      <SneakyHero>
        <div className="sound-library-home-hero">
          <div className="sound-library-home-hero-backdrop">
            <Planes />
          </div>
          <div className="sound-library-home-hero-content">
            <div className="sound-library-home-hero-blurb">
              <h1>Grand Piano</h1>
              <div>
                <h2>What's so great about it</h2>
                <ul>
                  <li>Great thing</li>
                  <li>Great thing</li>
                  <li>Great thing</li>
                  <li>Great thing</li>
                </ul>
                <button>Commit to it!</button>
                <button>Learn more</button>
              </div>
            </div>
          </div>
        </div>
      </SneakyHero>

      <PencilExtras items={pencilExtrasItems} />

      <ArticlesGrid
        articles={articles}
        className="bonus-hero"
        heading="Explore all the Grand Piano Packs"
        fourUp={true}
      />

      <ArticlesGrid
        articles={articles}
        heading="Latest News"
      />

      <Footer />
    </div>
  )
}

export default SoundLibraryHome
