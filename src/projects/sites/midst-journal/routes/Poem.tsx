import React, { ReactElement, useEffect, useRef, useState } from 'react'
import Midst from '../components/midst-player-hack/Midst'

interface IProps {
  match: any
}

interface IPoemImportData {
  slug: string
  poemData: any // TODO: Should be IMidstPlayerFileData
}

const poemImportData: IPoemImportData[] = [
  {
    slug: 'a-shade-whiter',
    poemData: require('../assets/poems/angelo-colavita--a-shade-whiter'),
  },{
    slug: 'alphabet-song',
    poemData: require('../assets/poems/annelyse-gelman--alphabet-song'),
  },{
    slug: 'pool',
    poemData: require('../assets/poems/annelyse-gelman--pool'),
  },{
    slug: 'prosperity',
    poemData: require('../assets/poems/annelyse-gelman--prosperity'),
  },{
    slug: 'untitled',
    poemData: require('../assets/poems/untitled--hedgie-choi'),
  },{
    slug: 'epilogue-in-summer',
    poemData: require('../assets/poems/veronica-martin--epilogue-in-summer'),
  }
]

function Poem({ match }: IProps): ReactElement {
  const el = useRef(null)

  useEffect(() => {
    const sliderFrame = (el as any).current.querySelector('.sliding-poems__frame')
    const currentPoem = poemImportData.findIndex(poem => poem.slug === match.params.slug)
    sliderFrame.style.left = `calc(100vw * -${currentPoem})`
  }, [match.params.slug])

  return (
    <div
      ref={el}
      className="poem-page"
    >
      <section className="heroine heroine--normal">
        <div className="sliding-poems">
          <div
            className="sliding-poems__frame"
            style={{
              width: `${poemImportData.length * 200}%`,
            }}
          >
            {poemImportData.map(poem =>
              <div
                className="sliding-poems__poem"
                key={poem.slug}
              >
                <Midst
                  isPlayer={true}
                  MIDST_DATA_JS={poem.poemData}
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
