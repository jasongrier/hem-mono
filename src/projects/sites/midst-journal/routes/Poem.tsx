import React, { ReactElement, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { loadPoemData } from '../store/actions'
import { IPoem } from '../store/types'
import Midst from '../components/midst-player-hack/Midst'

const win = window as any

interface IProps {
  match: any
}

function Poem({ match }: IProps): ReactElement {
  const { poems } = useSelector((state: RootState) => ({
    poems: state.app.poems.filter(poem => poem.hidden !== null),
  }))

  const dispatch = useDispatch()

  const el = useRef(null)

  useEffect(() => {
    const sliderFrame = (el as any).current.querySelector('.sliding-poems__frame')
    const currentPoemIndex = poems.findIndex(poem => poem.url === match.params.poemUrl)
    console.log(currentPoemIndex)
    if (currentPoemIndex > -1) {
      sliderFrame.style.left = `calc(100vw * -${currentPoemIndex})`
    }
  }, [match.params.poemUrl])

  useEffect(() => {
    dispatch(loadPoemData())
  }, [])

  return (
    <div
      className="poem-page"
      ref={el}
    >
      <section className="heroine heroine--normal">
        <div className="sliding-poems">
          <div
            className="sliding-poems__frame"
            style={{
              width: `${poems.length * 200}%`,
            }}
          >
            {poems.map((poem: IPoem) =>
              <div
                className="sliding-poems__poem"
                key={poem.poemId}
              >
                <Midst
                  isPlayer={true}
                  MIDST_DATA_JS_KEY={poem.data ? poem.poemId : null}
                  MIDST_DATA_JS={poem.data}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Poem
