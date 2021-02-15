import React, { ReactElement, useEffect, useState } from 'react'
import produce from 'immer'
import uuid from 'uuid/v1'
import { map, compact } from 'lodash'

interface IProps {
  banners: Array<{
    alt: string
    url: string
  }>
  rotate?: boolean
  rotateTime?: number
}

interface IBanner {
  alt: string
  id: string
  loaded: boolean
  url: string
}

function pickBanner(banners, currentBanner?) {
  let banner = banners[Math.floor(Math.random() * banners.length)]

  if (!currentBanner || banner.id !== currentBanner.id) {
    return banner
  }

  return pickBanner(banners, currentBanner)
}

function allLoaded(banners) {
  return compact(map(banners, 'loaded')).length === banners.length
}

function BannerSwitcher({ banners: srcBanners, rotate, rotateTime }: IProps): ReactElement {
  if (srcBanners.length > 25) {
    throw new Error('BannerSwitcher only takes max 25 images')
  }

  const [currentBanner, setCurrentBanner] = useState<IBanner>(pickBanner(srcBanners))

  const [banners, setBanners] = useState<IBanner[]>(
    srcBanners.map(({ alt, url }) => ({
      id: uuid(),
      alt,
      loaded: false,
      url,
    }))
  )

  useEffect(function preloadBanners() {
    for (const banner of banners) {
      const image = new Image()

      image.addEventListener('load', function() {
        const i = this.getAttribute('data-preload-index')
        setBanners(produce(banners, (draftBanners) => {
          draftBanners[i].loaded = true
        }))
      })

      image.src = banner.url
    }
  }, [])

  useEffect(function rotateBanners() {
    if (allLoaded(banners)) {
      setTimeout(() => {
        setCurrentBanner(pickBanner(srcBanners))
      }, rotateTime)
    }
  }, [banners])

  return (
    <div className="hem-banner-switcher">
      <img
        alt={currentBanner.alt}
        src={currentBanner.url}
      />
    </div>
  )
}

export default BannerSwitcher
