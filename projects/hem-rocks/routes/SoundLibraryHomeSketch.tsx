import React, { ReactElement } from 'react'
import { useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import { BASE_SITE_PAGE_TITLE } from '../config'

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

function SoundLibraryHome(): ReactElement {
  const dispatch = useDispatch()

  return (
    <div className="page sound-library-home">
      <Helmet>
        <title>{BASE_SITE_PAGE_TITLE} Sound Library</title>
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
          <nav className="carousel-nav">
            <ul>
              <li onClick={() => dispatch(setCarouselPosition('new-packs-heroine', 1))}>Grand Piano</li>
              <li onClick={() => dispatch(setCarouselPosition('new-packs-heroine', 3))}>Viola</li>
              <li onClick={() => dispatch(setCarouselPosition('new-packs-heroine', 4))}>Noise Reduction Artefacts</li>
              <li onClick={() => dispatch(setCarouselPosition('new-packs-heroine', 5))}>Seurat for Push</li>
            </ul>
          </nav>
          <div className="player-carousel">
            {/* <Carousel> */}
              <div className="player-carousel-panel">
                <h3>Grand Piano</h3>
                <p>Lorem ipsum dolor sit amet</p>
                <div className="player-carousel-inset-image">
                  {/* TODO: Closeup of the top four dials */}
                  {/* <img src="" alt=""/> */}
                </div>
                <div className="player-carousel-movie-wallpaper">
                  {/* TODO: This should be a flip book film and/or 3D CSS animation */}
                </div>
                <div className="player-carousel-player">
                  {/* TODO:
                    Starts as a speaker icon, waveform playing
                    First click turns up the volume and resets the track to zero
                    Next button skips to the next demo, without seeming to advance the carousel
                  */}
                  <div className="player-carousel-speaker-up-button"></div>
                  <div className="player-carousel-next-button"></div>
                  <div className="player-carousel-waveform"></div>
                </div>
                {/* TODO: Analytics event */}
                <button
                  className="player-carousel-download"
                  onClick={() => dispatch(openSoundDownloadPopup('grand'))}
                >
                  Download
                  {/* TODO: Popup with suggested price paywall and not-too-hidden "I can't pay" link */}
                </button>
              </div>
            {/* </Carousel> */}
            <div
              onClick={() => dispatch(advanceCarousel())}
              className="player-carousel-big-next-arrow"
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

export default SoundLibraryHome
