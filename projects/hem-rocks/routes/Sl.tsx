import React, { ReactElement } from 'react'
import { useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'

function setCarouselPosition(id: string, position: number) { // Redux Thunk Action
  // Trigger Slick carousel to the selected panel
  // Load global sound player with the preview sound #1 for this panel
}

function advanceCarousel() { // Redux Thunk Action
  // Same as above...
}

function openSoundDownloadPopup(id: string, stack: boolean = false) { // Redux Action
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
              <li onClick={() => dispatch(setCarouselPosition('new-packs-heroine', 1))}>Grand Piano</li>
              <li onClick={() => dispatch(setCarouselPosition('new-packs-heroine', 3))}>Viola</li>
              <li onClick={() => dispatch(setCarouselPosition('new-packs-heroine', 4))}>Noise Reduction Artefacts</li>
              <li onClick={() => dispatch(setCarouselPosition('new-packs-heroine', 5))}>Seurat for Push</li>
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
                <div className="new-pack-movie-wallpaper">
                  {/* TODO: This should be a flip book film and/or 3D CSS animation */}
                </div>
                <div className="new-pack-play">
                  {/* TODO:
                    Starts as a speaker icon, waveform playing
                    First click turns up the volume and resets the track to zero
                    Next button skips to the next demo, without seeming to advance the carousel
                  */}
                  <div className="new-pack-speaker-up-button"></div>
                  <div className="new-pack-next-button"></div>
                  <div className="new-pack-waveform"></div>
                </div>
                {/* TODO: Analytics event */}
                <button
                  className="new-pack-download"
                  onClick={() => dispatch(openSoundDownloadPopup('grand'))}
                >
                  Download
                  {/* TODO: Popup with suggested price paywall and not-too-hidden "I can't pay" link */}
                </button>
              </div>
            {/* </Carousel> */}
            <div
              onClick={() => dispatch(advanceCarousel())}
              className="new-packs-big-next-arrow"
            />
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
