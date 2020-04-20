import React, { ReactElement, useState } from 'react'
import { useSelector } from 'react-redux'
import { HeadphonesButton } from '../../../../../lib/packages/hem-buttons'
import { PlayPauseButton } from '../../../../../lib/modules/player'
import { RootState } from '../../../index'

interface IProps {
  minified: boolean
}

function PlayerBar({ minified }: IProps): ReactElement {
  const { playing } = useSelector((state: RootState) => ({
    playing: state.player.playing,
  }))

  const [expanded, setExpanded] = useState(false)

  return (
    <div className={`
      player-bar
      ${ playing ? 'player-bar-playing' : '' }
      ${ expanded ? 'player-bar-expanded' : '' }
    `}>
      <PlayPauseButton />
      <HeadphonesButton
        onClick={() => setExpanded(!expanded)}
      />
    </div>
  )
}

export default PlayerBar
