import { last } from 'lodash'
import React, { ReactElement, useCallback } from 'react'
import { Helmet } from 'react-helmet'
import jsPDF from 'jspdf'
import moment from 'moment'
import { FileUploader } from '../../../../lib/components'
import { Header, Footer } from '../../components/layout'
import { ProtectedContent } from '../../components/ui'
import { BASE_SITE_TITLE } from '../../config'

function MidstFlipBookLab(): ReactElement {
  const onUpload = useCallback(
    function onUpload(file: File) {
      const reader: any = new FileReader()

      reader.onload = function(evt: any) {
        try {
          const data = JSON.parse(reader.result)
          convertToPdf(data.editorTimelineFrames)
        }

        catch(err) {
          console.error(err)
        }
      }

      reader.readAsText(file)
    }, [],
  )

  function convertToPdf(frames: any[]) {
    const doc: any = new jsPDF()

    for (let i = 0; i < frames.length; i += 8) {
      const frame = frames[i]

      if (frame) {
        doc.setFontSize(10)
        doc.fromHTML(frame.content, 10, 10)
        doc.text(moment(frame.timestamp).format('MM/DD/YYYY – mm:ss'), 160, 10)
        doc.addPage()
      }
    }

    doc.save('prosperity-test-3.pdf')
  }

  return (
    <div className="page internal-page demos-home">
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
            <FileUploader onUpload={onUpload} />
          </section>
        </main>
      </ProtectedContent>

      <Footer />
    </div>
  )
}

export default MidstFlipBookLab
