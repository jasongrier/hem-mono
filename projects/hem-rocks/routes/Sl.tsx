import React, { ReactElement } from 'react'
import { useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'

function setHeroinePosition(position: number) {
  // This should be a Thunk
  // Trigger Slick carousel to the selected panel
  // Load global sound player with the preview sound #1 for this panel
}

function openSoundDownloadPopup(id: string, stack: boolean = false) {
  // TODO: Modal module
}

function Sl(): ReactElement {
  const dispatch = useDispatch()

  return (
    <div className="page sl">
      <Helmet>
        <title>HEM: Sound Library</title>
        <meta name="description" content="" />
      </Helmet>
      {/* TODO: Header component */}
      <header>
        {/* <Displace preset="black-diamond"> */}
          <h1>HEM</h1>
        {/* </Displace> */}
      </header>
      <main>
        {/* <Displace preset="skuespilhuset"> */}
          <header>
            <h2>New Packs</h2>
            <p>Four new packs for Ableton Live:</p>
          </header>
          <nav className="new-packs-carousel-nav">
            <ul>
              <li onClick={() => dispatch(setHeroinePosition(1))}>Grand Piano</li>
              <li onClick={() => dispatch(setHeroinePosition(3))}>Viola</li>
              <li onClick={() => dispatch(setHeroinePosition(4))}>Noise Reduction Artefacts</li>
              <li onClick={() => dispatch(setHeroinePosition(5))}>Seurat for Push</li>
            </ul>
          </nav>
          <div className="new-packs">
            {/* <Carousel> */}
              <div className="new-pack-panel">
                <h3>Grand Piano</h3>
                <p>Lorem ipsum dolor sit amet</p>
                <div className="new-pack-inset-image">
                  {/* TODO: Closeup of the top four dials */}
                  {/* <img src="" alt=""/> */}
                </div>
                <div className="new-pack-playlist">
                  <ul>
                    <li>Jeux</li>
                    <li>Pavan</li>
                    <li>Gibet</li>
                    <li>Lieb</li>
                    <li>Fantas</li>
                  </ul>
                </div>
                {/* TODO: Analytics event */}
                <button
                  className="new-pack-download"
                  onClick={() => dispatch(openSoundDownloadPopup('grand'))}
                >
                  Download
                </button>
              </div>
            {/* </Carousel> */}
          </div>
        {/* </Displace> */}
      </main>
      <footer>
        {/* TODO: Footer component */}
      </footer>
    </div>
  )
}

export default Sl
