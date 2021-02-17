import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { BASE_SITE_PAGE_TITLE } from '../config'

function About(): ReactElement {
  return (
    <div className="about-page">
      <Helmet>
        <title>{BASE_SITE_PAGE_TITLE} About</title>
        <meta name="description" content="" />
      </Helmet>

      <section className="heroine heroine--normal">
        <h2>About</h2>
        <p>What if you could watch your favorite poet write?</p>
        <p>
          Midst is a new digital journal publishing poems in the form of interactive timelapses, giving readers and writers unprecedented access to the creative process.
        </p>
        <p>
          Midst shows you the finished poem by default—just like any other journal—but then allows you to hit play and “rewind” to find out exactly how it was written: blank page to final draft, and every edit in between.
        </p>
        {/* <p>More at the <a href="http://midst.press/faq">FAQ</a>.</p> */}
        <br />

        <h2>Who</h2>

        <p>
          Founder + Director: <a href="http://www.annelysegelman.com">Annelyse Gelman</a><br />
          Lead Software Engineer: <a href="http://hem.rocks">Jason Gillis-Grier</a><br />
        </p>

        <br />

        <h2>Why</h2>

        <p>
          We hope Midst will make poetry more accessible for everyone. By seeing how a poem is made, readers can understand that writing and editing are parallel processes; that writing is often nonlinear; that making poems is not a matter of intentionally obfuscating or ‘dressing up’ simple ideas in fancy/symbolic language; that poems do not emerge fully-formed and perfect from a writer’s mind, but are crafted through the act of writing itself. We hold no particular aesthetic allegiance, but we believe that poetry is a process, a way of thinking in language, engaging with language, attending to language. Poems are events. Poems are for everyone. Though Midst is intended to be an educational resource for poetry, there is no right or wrong way to make a poem; we’re excited about Midst’s potential to showcase some of the ways writers are going about it.
        </p>

        <br />

        <h2>Contact</h2>

        <p>👋: team@midst.press</p>
        <p>

          <a
            className="twitter-logo-in-text sm"
            href="http://twitter.com/midstpoetry"
          />
          <a href="http://twitter.com/midstpoetry"></a>
          <a
            className="instagram-logo-in-text sm"
            href="https://www.instagram.com/midstpoetry/"
          />
          <a href="http://instagram.com/midstpoetry"></a>
          </p>
        <br />

        <br />

        <h2>Thanks</h2>

        <p>
          <a href="https://bretanthonyjohnston.com/">Bret Anthony Johnston</a> is our advisor. <a href="http://www.chloescheffe.github.io/">Chloe Scheffe</a> made our logo and our shapes. Our <a href="http://www.patreon.com/midstpoetry">patrons</a> and <a href="https://ko-fi.com/midst">donors</a> keep Midst free and public and help us pay our contributors!
        </p>
      </section>
    </div>
  )
}

export default About
