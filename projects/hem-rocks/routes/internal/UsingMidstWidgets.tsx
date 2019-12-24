import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Header, InternalHeader, Footer } from '../../components/layout'
import { ProtectedContent } from '../../components/ui'
import { BASE_SITE_TITLE } from '../../config'

const javascriptWidgetSnippet = `
  <script>
    var MIDST_WIDGET_FILES_URL = '/midst-files'
    var MIDST_WIDGET_FILES = [
      'my-poem-1.midst.zip',
      'my-poem-2.midst.zip',
      'my-poem-3.midst.zip',
    ]
  </script>
  <link rel="stylesheet" href="/midst-widget/midst-widget.css">
  <script src="/midst-widget/midst-widget.js"></script>
`

function UsingMidstWidgets(): ReactElement {
  return (
    <div className="page internal-page using-midst-widgets">
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>

      <Header />

      <ProtectedContent header="Enter password to view this content">
        <InternalHeader />

        <main>
          <h1>Using Midst Widgets</h1>
          <section>
            <h2>Widget #1: Midst Javascript Widget</h2>
            <p>Code-savvy version</p>
            <p>Complete control of styling via CSS</p>
            <p>Can display multiple files on the same page without iFrames</p>
            <h3>Installation Instructions</h3>
            <ol>
              <li>Make sure your users have web worker support</li>
              <li>Download the Midst Javascript Widget <a href="">here</a></li>
              <li>Unzip the downloaded file and upload the entire folder to your server</li>
              <li>
                Add the following snippet to the <code>&lt;head&gt;</code> of your webpage:
                <code dangerouslySetInnerHTML={{__html: javascriptWidgetSnippet}} />
              </li>
              <li>Upload your .midst files to your server or anywhere accessible on the web</li>
              <li><sup>*</sup>Remember to ZIP your Midst files prior to uploading!</li>
              <li>Set 'MIDST_WIDGET_FILES_URL' to wherever you uploaded your Midst files</li>
              <li>Replace <code>my-poem-1.midst.zip</code>, etc. with the name(s) of the Midst files</li>
              <li>Create a <code>&lt;div&gt;</code> element wherever on your webpage, for each file you'd like to display</li>
              <li>
                Give each div an <code>id</code> attribute, equal to the Midst file name that should be displayed there, for example:
                <code>&lt;div id="my-poem-1.midst.zip"&gt;&lt;&gt;</code>
              </li>
              <li>You're all set! You have complete control over the CSS styling, but be mindful not to break anything!</li>
              <li>Try the demo <Link to="/demos/midst-javascript-widget">here</Link></li>
            </ol>
          </section>
          <section>
            <h2>Widget #2: IFrame Midst Widget</h2>
            <p>Easily to embed in a page/profile</p>
          </section>
        </main>
      </ProtectedContent>

      <Footer />
    </div>
  )
}

export default UsingMidstWidgets
