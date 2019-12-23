import React, { ReactElement, useState, useEffect } from 'react'
import Midst from '../../midst-press/components/midst-player-hack/Midst'

declare const MIDST_WIDGET_URL: string
declare const MIDST_WIDGET_FILES_URL: string

const zip = (window as any).zip
zip.workerScriptsPath = MIDST_WIDGET_URL + '/static/workers/'

interface IProps {
  fileName: string
}

function MidstPlayerStandalone({ fileName }: IProps): ReactElement {
  const [poemData, setPoemData] = useState()

  useEffect(() => {
    loadPoem(fileName)
  }, [])

  async function loadPoem(poemId: string) {
    const zipTest = await fetch(`${MIDST_WIDGET_FILES_URL}/${fileName}`)
    const reader = new zip.BlobReader(await zipTest.blob())

    zip.createReader(reader, (zipReader: any) => {
      zipReader.getEntries((entries: any) => {
        const writer = new zip.BlobWriter()
        entries[0].getData(writer, (blob: Blob) => {
          const reader = new FileReader()
          reader.addEventListener('loadend', (e: any) => {
            const data = JSON.parse(e.srcElement.result)
            setPoemData(data)
          })
          reader.readAsText(blob)
        })
      })
    }, (err: any) => {
      console.log(err)
    })
  }

  return (
    <div className="hem-application">
      { poemData &&
        <Midst
          activePlayer={true}
          isPlayer={true}
          MIDST_DATA_JS_KEY={fileName.replace(/^\.midst\.zip/, '')}
          MIDST_DATA_JS={poemData}
        />
      }
    </div>
  )
}

export default MidstPlayerStandalone
