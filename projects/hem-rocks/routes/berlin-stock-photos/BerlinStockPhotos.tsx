import React, { ReactElement, useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux'
import ReactGA from 'react-ga'
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
    const sel = '.bsp-heroine'

    // @ts-ignore
    $(sel).slick({
      autoplay: true,
      fade: true,
      pauseOnHover: false,
      nextArrow: 'adfasdf',
      prevArrow: 'adfasdf',
    })

    return function cleanup() {
      // @ts-ignore
      $(sel).slick('unslick')
    }
  }, [])

  const { filter: currentFilter } = useParams()

  const bspItems = contentItems.filter(item => hasCategory(item, 'berlin-stock-photos'))
  const bspHeroines = bspItems.filter(item => hasTag(item, 'bsp-heroine'))

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
            <img src="http://placekitten.com/1440/957" alt=""/>
            <img src="http://placekitten.com/1440/957" alt=""/>
            <img src="http://placekitten.com/1440/957" alt=""/>
            <img src="http://placekitten.com/1440/957" alt=""/>
          </div>

          <div className="bsp-content">
            <MainContentList
              category="sound-library"
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
              <NavLink to="">Facebook</NavLink>
              <NavLink to="">Twitter</NavLink>
            </li>
          </ul>
          </nav>
          <div>
            &copy; 2020—2021 Berlin Stock Photos, OÜ
          </div>
        </footer>
      </div>
    </>
  )
}

export default BerlinStockPhotos
