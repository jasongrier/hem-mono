import React, { ReactElement, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { VenueSubnav } from '../../components/layout'
import { BASE_SITE_TITLE } from '../../config'

declare const Twitch: any

function VenueStage(): ReactElement {
  const [embed, setEmbed] = useState()
  const [player, setPlayer] = useState()

  useEffect(function init() {
    let embedInstance = new Twitch.Embed('twitch-embed', {
      width: 854,
      height: 480,
      channel: 'hemrocks',
      layout: 'video-with-chat',
      autoplay: true,
    })

    embedInstance.addEventListener(Twitch.Embed.VIDEO_READY, function () {
      const player = embedInstance.getPlayer()
      setPlayer(player)
    })

    setEmbed(embed)

    return function cleanup() {
      setEmbed(undefined)
      setPlayer(undefined)
      embedInstance = undefined
    }
  }, [])

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-venue">
        <h1>Main Stage</h1>

        <VenueSubnav />

        <div id="twitch-embed" />
      </div>
    </>
  )
}

export default VenueStage
