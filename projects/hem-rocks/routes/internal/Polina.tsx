import React, { ReactElement } from 'react'
import { FlipBook } from '../../../../lib/modules/flip-book'
import { assetHostHostname } from '../../functions'

const clouds1BasePath = assetHostHostname() + '/hem-rocks/content/flip-books/clouds-1/'
const clouds1Urls: string[] = []

for (let i = 1; i <= 664; i ++) {
  clouds1Urls.push(clouds1BasePath + 'IMG_' + i.toString().padStart(4, '0') + '.jpg')
}

const clouds2BasePath = assetHostHostname() + '/hem-rocks/content/flip-books/clouds-2/'
const clouds2Urls: string[] = []

for (let i = 9658; i <= 9739; i ++) {
  clouds2Urls.push(clouds2BasePath + 'IMG_' + i.toString().padStart(4, '0') + '.jpg')
}

const clouds3BasePath = assetHostHostname() + '/hem-rocks/content/flip-books/clouds-3/'
const clouds3Urls: string[] = []

for (let i = 9740; i <= 9999; i ++) {
  clouds3Urls.push(clouds3BasePath + 'IMG_' + i.toString().padStart(4, '0') + '.jpg')
}

function Polina(): ReactElement {
  return (
    <div className="page page-internal page-internal-polina">
      <h3>Banality</h3>
      <div>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/5LDHSBVZpzc"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/paQtSOIfBbw"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div>
        <h3>Cheesy overlay text. Great film though, and these are some of the best shots in it</h3>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/13dhEgvniTg"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div>
        <h3>Conceptually-armored eye candy... I like the "natural abstraction" but wish it wasn't CGI</h3>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/Zf9fy8P4ZIA"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div>
        <h3>Surrealism</h3>
      </div>
      <div>
        <h3>Great framing of faces talking about topics</h3>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/pHwdOU-wruc"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <h3>Another hobby of mine, flip book movies...</h3>
      <div className="flip-books clearfix">
        <FlipBook
          id="clouds-1"
          urls={clouds1Urls}
        />
        <FlipBook
          id="clouds-2"
          urls={clouds2Urls}
        />
        <FlipBook
          id="clouds-3"
          urls={clouds3Urls}
        />
      </div>
      <h3>A few fav Berlin pics</h3>
      <div></div>
      <h3>Sounds</h3>
      <div></div>
      <h3>Download and play the sounds</h3>
      <div></div>
      <h3>Conclusion</h3>
      <p>So, obviously a range of aesthetics here</p>
    </div>
  )
}

export default Polina
