import React, { ReactElement, useEffect, useState, useCallback } from 'react'
import { NavLink, Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux'
import ReactGA from 'react-ga'
import { sample, compact } from 'lodash'
import $ from 'jquery'
import 'slick-carousel'
import 'slick-carousel/slick/slick.css'
import { NextButton } from '../../../../lib/packages/hem-buttons'
import { MainContentList, IContentItem } from '../../modules/content'
import { Header } from '../../components/berlin-stock-photos'
import { assetHostHostname } from '../../functions'
import { RootState } from '../../index'
import { hasCategory, hasTag } from '../../modules/content'

function BerlinStockPhotos(): ReactElement {
  const { contentItems } = useSelector((state: RootState) => ({
    contentItems: state.content.contentItems.filter(item => hasCategory(item, 'stock-photos')),
  }))

  const [heroine, setHeroine] = useState<IContentItem>(null)

  useEffect(function initHeroine() {
    setHeroine(sample(contentItems))
  }, [])

  const { filter: currentFilter } = useParams()

  const onRandomPhotoClick = useCallback(
    function onRandomPhotoClickFn() {
      setHeroine(sample(contentItems))
    }, [contentItems],
  )

  const assetHost = assetHostHostname()

  return (
    <>
      <Helmet>
        <title>Berlin Stock Photos</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page berlin-stock-photos">
        <Header onRandomPhotoClick={onRandomPhotoClick} />
        <main>
          { heroine && (
            <div className="bsp-heroine">
              <Link to={`/${heroine.category}/${heroine.slug}${currentFilter ? '/' + currentFilter : ''}`}>
                <img 
                  src={`${assetHost}/berlin-stock-photos/content/images/jpg-web/${heroine.keyArt}`}
                  alt=""
                />
              </Link>
            </div>
          )}

          <div className="bsp-content">
            <MainContentList
              category="stock-photos"
              currentFilter={currentFilter}
              noSplatter={true}
            />
          </div>
        </main>

        <footer>
          <nav>
          <ul>
            <li>
              <NavLink to="">Instagram</NavLink>
            </li>
            <li>
              <NavLink to="">Facebook</NavLink>
            </li>
            <li>
              <NavLink to="">Twitter</NavLink>
            </li>
          </ul>
          </nav>
          <p>
            &copy; 2020—2021 Berlin Stock Photos, OÜ
          </p>
        </footer>
      </div>
    </>
  )
}

export default BerlinStockPhotos
