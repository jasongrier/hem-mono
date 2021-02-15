import React, { ReactElement, useEffect } from 'react'

interface IProps {
  bannerUrls: string[]
}

function BannerSwitcher({ bannerUrls }: IProps): ReactElement {
  useEffect(function preloadBanners() {

  }, [])

  return (
    <div className="hem-banner-switcher">
    </div>
  )
}

export default BannerSwitcher
