import { isEmpty } from 'lodash'
import React, { ReactElement, useCallback, useState } from 'react'
import { Helmet } from 'react-helmet'
import jsPDF from 'jspdf'
import moment from 'moment'
import { FileUploader } from '../../../../lib/components'
import { Header, Footer } from '../../components/layout'
import { ProtectedContent } from '../../components/ui'
import { BASE_SITE_TITLE } from '../../config'

function MidstFlipBookLab(): ReactElement {
  const [fileName, setFileName] = useState('')

  const onFileNameChanged = useCallback(
    function onFileNameChanged(evt: any) {
      setFileName(evt.target.value)
    }, [],
  )

  const onUpload = useCallback(
    function onUpload(file: File) {
      const reader: any = new FileReader()

      reader.onload = function(evt: any) {
        try {
          const data = JSON.parse(reader.result)
          convertToPdf(data.editorTimelineFrames, fileName)
        }

        catch(err) {
          console.error(err)
        }
      }

      reader.readAsText(file)
    }, [fileName],
  )

  function convertToPdf(frames: any[], fileName) {
    const doc: any = new jsPDF()
    const docFileName = isEmpty(fileName) ? 'my-midst-flip-book' : fileName

    for (let i = 0; i < frames.length; i += 1) {
      const frame = frames[i]

      if (frame) {
        doc.setFontSize(10)
        doc.fromHTML(frame.content, 10, 10)
        doc.text(moment(frame.timestamp).format('MMMM D, YYYY – h:mm:ss A'), 155, 10)
        doc.addPage()
      }
    }

    doc.save(`${docFileName}.pdf`)
  }

  return (
    <div className="page internal-page midst-flip-book-lab">
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>

      <Header />

      <ProtectedContent>
        <main>
          <h1>Midst Flip Book Lab</h1>
          <section>
            <h2>Generate Midst flip books!</h2>
            <input
              className="midst-flip-book-lab-file-name-input"
              onChange={onFileNameChanged}
              type="text"
              value={fileName}
            />
            <FileUploader onUpload={onUpload} />
          </section>
        </main>
      </ProtectedContent>

      <Footer />
    </div>
  )
}

export default MidstFlipBookLab
