import React, { ReactElement, useEffect, useState } from 'react'
import { NavLink, Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux'
import ReactGA from 'react-ga'
import { sample, compact } from 'lodash'
import $ from 'jquery'
import 'slick-carousel'
import 'slick-carousel/slick/slick.css'
import { ElectronOnly } from '../../../../lib/components'
import { MainContentList } from '../../modules/content'
import { assetHostHostname } from '../../functions'
import { RootState } from '../../index'
import { hasCategory, hasTag } from '../../modules/content'

function BerlinStockPhotos(): ReactElement {
  const { contentItems } = useSelector((state: RootState) => ({
    contentItems: state.content.contentItems,
  }))

  useEffect(() => {
    if (!contentItems.length) return
    
    const sel = '.bsp-heroine'

    console.log('i inited')
    
    setTimeout(() => {

      // @ts-ignore
      $(sel).slick({
        autoplay: true,
        fade: true,
        pauseOnHover: false,
        nextArrow: 'adfasdf',
        prevArrow: 'adfasdf',
      })
    }, 500)

    return function cleanup() {
      // @ts-ignore
      $(sel).slick('unslick')
    }
  }, [contentItems])

  const { filter: currentFilter } = useParams()

  const bspItems = contentItems.filter(item => hasCategory(item, 'stock-photos'))
  const bspHeroines = compact([
    sample(bspItems),
    sample(bspItems),
    sample(bspItems),
    sample(bspItems),
    sample(bspItems),
  ])

  const assetHost = assetHostHostname()

  return (
    <>
      <Helmet>
        <title>Berlin Stock Photos</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page berlin-stock-photos">
        <header className="main-header">
          <h1>Berlin Stock Photos</h1>
          <nav>
            <ul>
              <li>
                <NavLink to="about">About</NavLink>
              </li>
              <li>
                <NavLink to="contact">Contact</NavLink>
              </li>
              <li>
                <NavLink to="random">Random Pic</NavLink>
              </li>
              <ElectronOnly>
                <li>
                  <NavLink to="admin/list">Admin</NavLink>
                </li>
              </ElectronOnly>
            </ul>
          </nav>
        </header>

        <main>
          <div className="bsp-heroine">
            { bspHeroines.map(contentItem => (
              <Link to={`/${contentItem.category}/${contentItem.slug}${currentFilter ? '/' + currentFilter : ''}`}>
                <img 
                  src={`${assetHost}/berlin-stock-photos/content/images/jpg-web/${contentItem.keyArt}`}
                  alt=""
                />
              </Link>
            ))}
          </div>

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
