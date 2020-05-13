import React, { ReactElement, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { BASE_SITE_TITLE } from '../config'

declare const Twitch: any

function Venue(): ReactElement {
  const [embed, setEmbed] = useState()
  const [player, setPlayer] = useState()

  useEffect(function init() {
    let embed = new Twitch.Embed('twitch-embed', {
      width: 854,
      height: 480,
      channel: 'hemrocks',
      layout: 'video',
      autoplay: false,
    })

    embed.addEventListener(Twitch.Embed.VIDEO_READY, function () {
      const player = embed.getPlayer()
      setPlayer(player)
    })

    setEmbed(embed)

    return function cleanup() {
      setEmbed(null)
      setPlayer(null)
      embed = null
    }
  }, [])

  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-venue">
        <h1>Venue</h1>
        <div id="twitch-embed"></div>
      </div>
    </>
  )
}

export default Venue
