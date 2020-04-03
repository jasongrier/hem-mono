import React, { ReactElement } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { MediaContentList } from '../../../lib/components'
import { ProductTileA } from '../modules/products'
import { RootState } from '../index'
import { MuteButton } from '../../../lib/modules/player'

function Home(): ReactElement {
  const { products } = useSelector((state: RootState) => ({
    products: state.products.products,
  }))

  function getProductsWithTag(tag: string) {
    return products.filter(product => {
      product.tags.includes(tag)
    })
  }

  return (
    <div className="page page-home">
      <header className="top-bar">
        <h1>
          <Link to="/">HEM</Link>
        </h1>
      </header>

      <div className="heroine">
        <div className="grand-piano-heroine">
          <div className="grand-piano-heroine-banner">
            <div className="grand-piano-heroine-banner-image"></div>
            <div className="grand-piano-heroine-banner-description">
              <h2>Grand Piano</h2>
              <ul>
                <li>Feature 1</li>
                <li>Feature 2</li>
                <li>Feature 3</li>
                <li>Feature 4</li>
              </ul>
            </div>
          </div>
        </div>
        <button className="heroine-mute-button">
          <MuteButton />
        </button>
      </div>

      <div className="pricing-banner">
        Pay what you can. All devices run in Ableton Live Lite
      </div>

      <div className="sub-heroine new-devices-heroine">
        <h2>New Devices</h2>
        <div className="sub-heroine-columns">
          <div className="sub-heroine-column">
            <ProductTileA
              title="Seurat 2"
              featureList={[
                'Supports multiple Seurat devices per track for more complex patterns',
                'Generates both completely random and semi-random melodic patterns',
                'Works entirely in Live Lite', // TODO: Place  repeated string in config
              ]}
              imgSrc=""
              imgAlt=""
              productId=""
              videoPopUpId=""
            />
          </div>
          <div className="sub-heroine-column">
            <ProductTileA
              title="Chord Brush"
              featureList={[
                'Supports multiple Seurat devices per track for more complex patterns',
                'Generates both completely random and semi-random melodic patterns',
                'Works entirely in Live Lite', // TODO: Place  repeated string in config
              ]}
              imgSrc=""
              imgAlt=""
              productId=""
              videoPopUpId=""
            />
          </div>
          <div className="sub-heroine-column">
            <ProductTileA
              title="Voice Splitter"
              featureList={[
                'Takes a single melody line and passes it around to different instruments',
                'Can go note-by-note or according to various patterns',
                'Works entirely in Live Lite', // TODO: Place  repeated string in config
              ]}
              imgSrc=""
              imgAlt=""
              productId=""
              videoPopUpId=""
            />
          </div>
        </div>
      </div>

      <nav className="tabs-nav">
        <ul>
          <li>
            <Link to="/sl1">Sound Library 1</Link>
            <Link to="/sl2">Sound Library 2</Link>
            <Link to="/past-releases">Past Releases</Link>
            <Link to="/archive">Archive</Link>
          </li>
        </ul>
      </nav>

      <main>
        <Switch>
          <Route exact path="sl1">
            <MediaContentList content={getProductsWithTag('sl1')} />
          </Route>

          <Route exact path="sl2">
            <MediaContentList content={getProductsWithTag('sl2')} />
          </Route>

          <Route exact path="past-releases">
            <MediaContentList content={getProductsWithTag('past-releases')} />
          </Route>

          <Route exact path="archive">
            <MediaContentList content={getProductsWithTag('archive')} />
          </Route>
        </Switch>
      </main>
    </div>
  )
}

export default Home
