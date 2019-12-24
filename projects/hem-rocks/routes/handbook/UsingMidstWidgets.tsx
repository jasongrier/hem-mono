import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Header, HandbookHeader, Footer } from '../../components/layout'
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
  <script src="midst-widget/midst-widget.js"></script>
  <link rel="stylesheet" href="midst-widget/midst-widget.css">

`

const divSnippet = `
  <div id="my-poem-1.midst.zip"></div>

`

function UsingMidstWidgets(): ReactElement {
  return (
    <div className="page internal-page using-midst-widgets">
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>

      <Header />

      <ProtectedContent>
        <HandbookHeader />

        <main>
          <h1>Using Midst Widgets</h1>
          <p>There are two Midst widgets. One is more for pro coders and has a lot of flexibility to be styled and in terms of where the files are hosted. The other is a "normal" IFrame widget, (like YouTube or Soundcloud) that novices can embed on their own pages and social media. The files for this widget are stored on the Midst platform.</p>
          <section>
            <h2>Widget #1: Midst Javascript Widget</h2>
            <ul>
              <li>Code-savvy version</li>
              <li>Complete control of styling via CSS</li>
              <li>Can display multiple Midst files on the same page without IFrames</li>
            </ul>
            <h3>Installation Instructions</h3>
            <ol>
              <li>Make sure your users have web worker support</li>
              <li>Download the Midst Javascript Widget <a href="http://static.hem.rocks/midst/midst-widget.zip">here</a></li>
              <li>Unzip the downloaded file and upload the entire folder to your server</li>
              <li>
                Add the following snippet to the <code>&lt;head&gt;</code> of your webpage:
                <pre>
                  { javascriptWidgetSnippet }
                </pre>
              </li>
              <li>Upload your .midst files to your server or anywhere accessible on the web</li>
              <li><sup>*</sup>Remember to ZIP your Midst files prior to uploading!</li>
              <li>Set <code>MIDST_WIDGET_FILES_URL</code> to wherever you uploaded your Midst files</li>
              <li>Replace <code>my-poem-1.midst.zip</code>, etc. with the name(s) of the Midst files</li>
              <li>Create a <code>&lt;div&gt;</code> element wherever on your webpage, for each file you'd like to display</li>
              <li>
                Give each div an <code>id</code> attribute, equal to the Midst file name that should be displayed there, for example:
                <pre>
                  { divSnippet }
                </pre>
              </li>
              <li>You're all set! You have complete control over the CSS styling, but be mindful not to break anything!</li>
              <li>Try the demo <a href="http://static.hem.rocks/midst/widget-demo/" target="_blank">here</a></li>
            </ol>
          </section>
          <section>
            <h2>Widget #2: Midst IFrame Widget</h2>
            <p>COMING SOON!</p>
          </section>
        </main>
      </ProtectedContent>

      <Footer />
    </div>
  )
}

export default UsingMidstWidgets
