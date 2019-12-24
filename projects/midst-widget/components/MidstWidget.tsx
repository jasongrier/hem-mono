import React, { ReactElement, useState, useEffect } from 'react'
import Midst from '../../midst-press/components/midst-player-hack/Midst'

const win = (window as any)
declare const zip: any
declare const SCRIPT_URL: string
declare const MIDST_WIDGET_FILES_URL: string

interface IProps {
  fileName: string
}

function MidstWidget({ fileName }: IProps): ReactElement {
  const [poemData, setPoemData] = useState()

  useEffect(() => {
    loadPoem()
  }, [])

  async function loadPoem() {
    const filesUrl = (
      typeof MIDST_WIDGET_FILES_URL === 'string'
        ? MIDST_WIDGET_FILES_URL
        : SCRIPT_URL + '/midst-widget'
    )
    const zipTest = await fetch(`${filesUrl}/${fileName}`)
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
    <div
      className="hem-application midst-widget"
      style={{
        backgroundImage: `url(${win.SCRIPT_URL}/static/assets/midst-loading.svg)`,
      }}
    >
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

export default MidstWidget
