import React, { ReactElement, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Performer, PerformerMode } from '../../../../lib/classes'
import { flashLight } from '../../functions'
import { BASE_SITE_PAGE_TITLE } from '../../config'

let performer: Performer

function initDemo() {
  performer = new Performer({
    duration: 100,
    mode: 'blink',
    speed: 1,
    onTickCallback: () => flashLight('performer-divider-demo-light'),
  })
}

function start() {
  performer.start(64)
}

function stop() {
  performer.stop()
}

function cleanupDemo() {
  performer.destroy()
}

const modes: PerformerMode[] = [
  'blink',
  'shrink',
  'swell',
  'trill',
]

function PerformerDemo(): ReactElement {
  useEffect(() => {
    initDemo()

    return function cleanup() {
      cleanupDemo()
    }
  }, [])

  return (
    <main className='page performer-demo'>
      <Helmet>
        <title>{BASE_SITE_PAGE_TITLE} Performer Demo</title>
        <meta name="description" content="" />
      </Helmet>

      <h1>Performer Demo</h1>
      <p>A phrase synthesiser</p>

      <h2>Instructions</h2>
      <ul>
        <li>Click play</li>
        <li>The lights below should light according to the performer's mode</li>
        <li>Use the mode selector to switch between modes</li>
        <li>Use the speed selector to switch between speed</li>
      </ul>
      <p>
        <button
          onMouseDown={start}
          onMouseUp={stop}
        >
          PLAY
        </button>
      </p>
      {/* <p>
        <select
          value={mode}
          onChange={evt => setMode(parseInt(evt.target.value, 10))}
        >
          {modes.map((modeName, i) => (
            <option
              key={i}
              value={i}
            >
              {modeName}
            </option>
          ))}
        </select>
      </p> */}
      <p>
        A:
        <span
          className="studio__demo-light"
          id="performer-divider-demo-light"
        />
      </p>
    </main>
  )
}

export default PerformerDemo
