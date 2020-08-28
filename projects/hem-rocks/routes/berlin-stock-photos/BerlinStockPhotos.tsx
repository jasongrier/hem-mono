import React, { ReactElement, useEffect, useState, useCallback } from 'react'
import { NavLink, Link, useParams, useLocation } from 'react-router-dom'
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

  const [heroine, setHeroine] = useState<IContentItem>()

  useEffect(function initHeroine() {
    if (heroine) return
    if (!contentItems) return
    if (!contentItems.length) return
    
    const contentItem = sample(contentItems.filter(item => hasTag(item, 'best-of')))
    
    if (!contentItem) return
    
    setHeroine(contentItem)
  }, [contentItems, heroine])

  const { filter: currentFilter } = useParams()
  const { pathname } = useLocation()
  const assetHost = assetHostHostname()
  const isMoreTagsPage = pathname.includes('more-tags')

  return (
    <>
      <Helmet>
        <title>Berlin Stock Photos</title>
        <meta name="description" content="" />
      </Helmet>
      <div className={`
        page 
        berlin-stock-photos
        ${ isMoreTagsPage ? 'bsp-page' : '' }
      `}>
        <Header />
        
        {/* { isMoreTagsPage && (
          <h1>All Tags</h1>
        )} */}
        
        <main>
          { heroine && !isMoreTagsPage && (
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
              currentFilter={ currentFilter || 'best-of' }
              noSplatter={true}
              moreTagsLink={ isMoreTagsPage ? null : '/more-tags/filter/best-of' }
              noAll={ true }
              fixedFilters={ isMoreTagsPage ? null : [
                'Best Of',
                'Architecture',
                'Condom And Needle Vending Machines',
                'Cool Cars',
                'Coronatimes',
                'Currywurst',
                'Elon Musk',
                'Food Photography',
                'Free Shit',
                'Fucked Up Phone Booths',
                'Furtive Dumpsters',
                'German Words',
                'Green Depth',
                'Grit',
                'Guerilla Gardening',
                'Knitting',
                'Old Shit',
                'Pappelfuzz',
                'Parks',
                'Poignancy',
                'Sandy Soil',
                'Satellite Dishes',
                'Silver Paint',
                'Skyline',
                'Soviet Stuff',
                'Spaetis',
                'Swans',
                'Taped Up Boxes And Poles',
                'Trash Configurations',
                'Weeping Willow Trees',
                'Weirdness',
              ]}
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
