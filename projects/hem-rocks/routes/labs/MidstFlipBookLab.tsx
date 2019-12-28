import React, { ReactElement, useCallback } from 'react'
import { Helmet } from 'react-helmet'
import jsPDF from 'jspdf'
import moment from 'moment'
import striptags from 'striptags'
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
    const doc = new jsPDF()

    for (let i = 0; i < frames.length; i += 10) {
      const frame = frames[i]

      if (frame) {
        const convertedContent = striptags(frame.content.replace(/<\/p>/g, '</p>' + "\n"))
        const convertedTimestamp = moment(frame.timestamp).format('MM/DD/YYYY – mm:ss')

        doc.setFontSize(10)
        doc.text(convertedContent, 10, 10)
        doc.text(convertedTimestamp, 160, 10)
        doc.addPage()
      }
    }
    doc.save('prosperity-test-2.pdf')
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
