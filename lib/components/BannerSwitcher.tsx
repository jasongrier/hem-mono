import React, { ReactElement, useEffect, useState } from 'react'
import produce from 'immer'
import uuid from 'uuid/v1'
import { map, compact } from 'lodash'

interface ISrcBanner {
  alt: string
  url: string
}

interface IBanner {
  alt: string
  id: string
  loaded: boolean
  url: string
}

interface IProps {
  banners: ISrcBanner[]
  rotate?: boolean
  rotateTime?: number
}

function srcBannerToBanner({ alt, url }: ISrcBanner): IBanner {
  return {
    alt,
    id: uuid(),
    loaded: false,
    url,
  }
}

function pickBanner(banners: IBanner[], currentBanner?: IBanner): IBanner {
  let banner = banners[Math.floor(Math.random() * banners.length)]

  if (
    !currentBanner
    || banner.id !== currentBanner.id
  ) {
    return banner
  }

  return pickBanner(banners, currentBanner)
}

function allLoaded(banners: IBanner[]) {
  return compact(map(banners, 'loaded')).length === banners.length
}

function BannerSwitcher({ banners: srcBanners, rotate, rotateTime }: IProps): ReactElement {
  if (srcBanners.length > 25) {
    throw new Error('BannerSwitcher only takes max 25 images')
  }

  const [currentBanner, setCurrentBanner] = useState<IBanner>(pickBanner(srcBanners.map(srcBannerToBanner)))

  const [banners, setBanners] = useState<IBanner[]>(
    srcBanners.map(({ alt, url }) => ({
      id: uuid(),
      alt: alt || '',
      loaded: false,
      url: url || '',
    }))
  )

  useEffect(function preloadBanners() {
    for (const banner of banners) {
      const image = new Image()

      image.addEventListener('load', function() {
        const i = parseInt(this.getAttribute('data-preload-index') || '0', 10)
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
        setCurrentBanner(pickBanner(srcBanners.map(srcBannerToBanner)))
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
