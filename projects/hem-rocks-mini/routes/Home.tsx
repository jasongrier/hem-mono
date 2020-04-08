import React, { ReactElement } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ProductTile } from '../modules/products'
import { MainNavItem, TopBar } from '../components'
import { GrandPianoHeroineAlternate } from '../components/heroines'
import { RootState } from '../index'

function Home(): ReactElement {
  const { currentTag, products, topBarCollapsed } = useSelector((state: RootState) => ({
    currentTag: state.app.currentTag,
    products: state.products.products,
    topBarCollapsed: state.app.topBarCollapsed,
  }))

  const dispatch = useDispatch()

  function getContentWithTag(collection: any[], tag: string) {
    return collection.filter(collectionItem => {
      return collectionItem.tags.includes(tag)
    })
  }

  function tagToTitle(tag: string): string {
    const dict = {
      'sound-library': 'Sound Library',
      'label': 'Label',
      // 'compilation': 'Compilation',
      'projects': 'Projects',
      'info': 'Info',
    }

    // @ts-ignore
    // TODO: How to fix index signature error?
    return dict[tag]
  }

  return (
    <div className="page page-home">
      <TopBar collapsed={topBarCollapsed} />

      <div className="home-heroine">
        <GrandPianoHeroineAlternate />
      </div>

      <nav className="main-nav">
        <ul>
          <MainNavItem
            currentTag={currentTag}
            name="Sound Library"
          />
          <MainNavItem
            currentTag={currentTag}
            name="Label"
          />
          <MainNavItem
            currentTag={currentTag}
            name="Projects"
          />
          <MainNavItem
            currentTag={currentTag}
            name="Info"
          />
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
                const allowedTags = ['sound-library', 'label', 'projects', 'info']

                let tag = props.match.params.tag

                if (!tag || !allowedTags.includes(tag)) {
                  tag = 'sound-library'
                }

                return (
                  <section className="tab-content">
                    <h1>{ tagToTitle(tag) }</h1>
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
