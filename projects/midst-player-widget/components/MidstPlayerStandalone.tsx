import React, { ReactElement, useState, useEffect } from 'react'
import Midst from '../../midst-press/components/midst-player-hack/Midst'

const zip = (window as any).zip
zip.workerScriptsPath = '/static/workers/'

interface IProps {
  poemId: string
}

function MidstPlayerStandalone({ poemId }: IProps): ReactElement {
  const [poemData, setPoemData] = useState()

  useEffect(() => {
    loadPoem(poemId)
  }, [])

  async function loadPoem(poemId: string) {
    const zipTest = await fetch(`http://static.hem.rocks/portfolio-annelysegelman-com/midst-files/${poemId}.midst.zip`)
    const reader = new zip.BlobReader(await zipTest.blob())

    zip.createReader(reader, zipReader => {
      zipReader.getEntries(entries => {
        const writer = new zip.BlobWriter()
        entries[0].getData(writer, blob => {
          const reader = new FileReader()
          reader.addEventListener('loadend', (e: any) => {
            const data = JSON.parse(e.srcElement.result)
            setPoemData(data)
          })
          reader.readAsText(blob)
        })
      })
    }, err => {
      console.log(err)
    })
  }

  return (
    <div className="hem-application">
      { poemData &&
        <Midst
          activePlayer={true}
          isPlayer={true}
          MIDST_DATA_JS_KEY={poemId}
          MIDST_DATA_JS={poemData}
        />
      }
    </div>
  )
}

export default MidstPlayerStandalone
