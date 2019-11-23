import React, { ReactElement, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dial } from '../../../lib/components'
import { PlaybackEngine } from '../../../lib/classes'
import { RootState } from '../store'

const playback = PlaybackEngine.getInstance()

interface IProps {
  id: string
}

function SlSoundPlayer({ id }: IProps): ReactElement {
  let { pack } = useSelector((state: RootState) => ({
    pack: state.app.slSounds.find(sound => sound.id === id)
  }))

  const dispatch = useDispatch()

  const { title, presets } = pack

  const [currentPreset, setCurrentPreset] = useState(presets[0].id)

  return (
    <div className="sl-sound-player">
      <header>
        <span>HEM SL | </span>
        <span>{ title }</span>
        <div className="sl-sound-player__preset-selector">
          <ul>
            {presets.map(({ id, title }) => {
              <li
                className={`
                  sl-sound-player__preset
                  ${currentPreset === id ? 'sl-sound-player__preset--selected' : ''}
                `}
                key={id}
                onClick={() => {
                  // dispatch(setCurrentSlSound())
                  setCurrentPreset(id)
                }}
              >
                { title }
              </li>
            })}
          </ul>
        </div>
      </header>
      <div className="sl-sound-player__controls">
        <Dial
          // TODO: Update the playback engine
          onChange={() => {}}
          // TODO: Update the state
          onChangeDone={() => {}}
          value={}
        />
      </div>
    </div>
  )
}

export default SlSoundPlayer
