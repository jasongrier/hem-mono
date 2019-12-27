import React, { ReactElement, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { init } from '../actions'

function WebsitePlayer(): ReactElement {
  const dispatch = useDispatch()

  useEffect(function initWebsitePlayer() {
    dispatch(init())
  }, [])

  return (
    <div className="website-player" />
  )
}

export default WebsitePlayer
