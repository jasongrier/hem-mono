import React, { ReactElement } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ProductTile } from '../modules/products'
import { RootState } from '../index'
import { MuteButton } from '../../../lib/modules/player'

function Home(): ReactElement {
  const { products } = useSelector((state: RootState) => ({
    products: state.products.products,
  }))

  function getContentWithTag(collection: any[], tag: string) {
    return collection.filter(collectionItem => {
      return collectionItem.tags.includes(tag)
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
        <div className="heroine-mute-button">
          <MuteButton />
        </div>
      </div>

      <div className="pricing-banner">
        Pay what you can. All devices run in Ableton Live Lite
      </div>

      <div className="sub-heroine new-devices-heroine">
        <h2>New Devices</h2>
        <div className="sub-heroine-columns">
          <div className="sub-heroine-column">
            {/* <ProductTile
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
            /> */}
          </div>
          <div className="sub-heroine-column">
            {/* <ProductTile
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
            /> */}
          </div>
          <div className="sub-heroine-column">
            {/* <ProductTile
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
            /> */}
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
        <div className="tabs-content">
          <Switch>
            <Route path="/:tag?"
              render={props => {
                const allowedTags = ['sl1', 'sl2', 'past-releases', 'archive']
                const tagsToTitles = {
                  'sl1': 'Sound Library 1',
                  'sl2': 'Sound Library 2',
                  'past-releases': 'Past Releases',
                  'archive': 'Archive',
                }

                let tag = props.match.params.tag

                if (!tag || !allowedTags.includes(tag)) {
                  tag = 'sl2'
                }

                return (
                  <section className="tab-content">
                    <h1>{ tagsToTitles[tag] }</h1>
                    {getContentWithTag(products, tag).map(product =>
                      <ProductTile
                        key={product.id}
                        product={product}
                      />
                    )}
                  </section>
                )
              }}
            />
          </Switch>
        </div>
      </main>
    </div>
  )
}

export default Home
