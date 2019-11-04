import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import $ from 'jquery'
import { RootState } from '../store'
import Midst from '../components/midst-player-hack/Midst'
import { IPoem } from '../store/types'

const win = window as any

interface IProps {
  match: any
}

interface IPoemImportData {
  url: string
  poemData: any // TODO: Should be IMidstPlayerFileData
}

// const poemImportData: IPoemImportData[] = [
//   {
//     url: 'a-shade-whiter',
//     poemData: win.poems[],
//   },{
//     url: 'alphabet-song',
//     poemData: require('../assets/poems/annelyse-gelman--alphabet-song'),
//   },{
//     url: 'pool',
//     poemData: require('../assets/poems/annelyse-gelman--pool'),
//   },{
//     url: 'prosperity',
//     poemData: require('../assets/poems/annelyse-gelman--prosperity'),
//   },{
//     url: 'untitled',
//     poemData: require('../assets/poems/untitled--hedgie-choi'),
//   },{
//     url: 'epilogue-in-summer',
//     poemData: require('../assets/poems/veronica-martin--epilogue-in-summer'),
//   }
// ]

async function getPoemData(poems: IPoem[]) {
  for (let i = 0; i < poems.length; i++) {
    try {
      // TODO: Gzip these on the server
      const nextPoemData = await $.getJSON(`http://midst.press/static-assets/journal-assets/dev-authors/${poems[i].authorId}/${poems[i].poemId}.midst`)
      setPoemData(poemData.concat[JSON.parse(nextPoemData)])
    }

    catch(err) {
      console.log(err)
    }
  }
}

function Poem({ match }: IProps): ReactElement {
  const { poems } = useSelector((state: RootState) => ({
    poems: state.app.poems,
  }))

  const [poemData, setPoemData] = useState([] as any)

  const el = useRef(null)

  let currentPoem: IPoem | undefined

  useEffect(() => {
    const sliderFrame = (el as any).current.querySelector('.sliding-poems__frame')
    currentPoem = poems.find(poem => poem.url === match.params.url)
    sliderFrame.style.left = `calc(100vw * -${currentPoem})`
  }, [match.params.url])

  useEffect(() => {
    getPoemData(poems)
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
              width: `${poemData.length * 200}%`,
            }}
          >
            {poemData.map((poem: IPoem) =>
              <div
                className="sliding-poems__poem"
                key={poem.url}
              >
                {currentPoem ?
                  <Midst
                    isPlayer={true}
                    MIDST_DATA_JS={win.poems[currentPoem.poemId]} // TODO: Make a getCurrentPoemKey() helper and do this string concatenation there
                  />
                  : <div />
                }
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Poem
