import React, { ReactElement } from 'react'
import { Link, NavLink, Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ProductTile } from '../modules/products'
import { GrandPianoHeroineAlternate } from '../components/heroines'
import { RootState } from '../index'

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
        <h1 className="logo">
          <Link to="/">HEM</Link>
        </h1>
      </header>

      <div className="home-heroine">
        <GrandPianoHeroineAlternate />
      </div>

      <nav className="main-nav">
        <ul>
          <li>
            <NavLink to="/sound-library">Sound Library</NavLink>
          </li>
          <li>
            <NavLink to="/label">Label</NavLink>
          </li>
          <li>
            <NavLink to="/compilation">Compilation</NavLink>
          </li>
          <li>
            <NavLink to="/projects">Projects</NavLink>
          </li>
          <li>
            <NavLink to="/info">Info</NavLink>
          </li>
        </ul>
      </nav>

      <div className="pricing-banner" hidden>
        Pay what you can. All devices run in Ableton Live Lite
      </div>

      <div className="sub-heroine new-devices-heroine" hidden>
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

      <main className="home-content">
        <div className="tabs-content">
          <Switch>
            <Route path="/:tag?"
              render={props => {
                const allowedTags = ['sound-library', 'label', 'compilation', 'projects']
                const tagsToTitles = {
                  'sound-library': 'Sound Library',
                  'label': 'Label',
                  'compilation': 'Compilation',
                  'projects': 'Projects',
                  'info': 'Info',
                }

                let tag = props.match.params.tag

                if (!tag || !allowedTags.includes(tag)) {
                  tag = 'sound-library'
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
