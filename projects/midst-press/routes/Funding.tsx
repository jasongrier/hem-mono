import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import DonorWall from '../components/DonorWall'
import { BASE_SITE_PAGE_TITLE } from '../config'

function Funding(): ReactElement {
  return (
    <div className="funding-page">
      <Helmet>
        <title>{BASE_SITE_PAGE_TITLE} Funding</title>
        <meta name="description" content="" />
      </Helmet>

      <section className="heroine heroine--normal">
        <h2>Funding</h2>

        <h2 className="emoji-heading no-space">🌱</h2>

        <p>
          Midst's journal will always be free to the public.
        </p>

        <p>
          We hope to continue to grow and to share diverse new work from contemporary writers, serving as a growing library of poetry-as-process. We currently have two "staff" members (Annelyse Gelman and Jason Gillis-Grier), both volunteers, and each contributor is currently paid $50. Midst's financial future is uncertain, but we believe transparency is important to build a healthy, thriving literary community where people trust each other. We hope you'll consider a one-time or monthly donation to help us continue our work!
        </p>

        <p>
          All contributions directly support Midst's future, including paying for commissions, web hosting, design, app development, and more.
        </p>

        <h2 className="emoji-heading">💵</h2>

        <p>
          <a
            className="patreon-logo-in-text"
            href="http://patreon.com/midstpoetry"
          /> Join Midst's<a href="http://www.patreon.com/midstpoetry">Patreon</a> page as a monthly donor and receive sneak-peeks, previews, and special perks, starting at $3/month.
        </p>

        <p>
          <a
            className="ko-fi-logo-in-text"
            href="https://ko-fi.com/midst"
          />
          You can also give a Fee-free, one-time donation of any amount <a href="https://ko-fi.com/midst">here</a>.
        </p>

        <h2 className="emoji-heading">🙌</h2>

        <p>
          Other inquiries: annelysegelman@gmail.com.
        </p>

        <DonorWall>
          <h2>Special thanks to the Genesis program and to our <a href="http://www.patreon.com/midstpoetry">Patrons</a>:</h2>
        </DonorWall>
      </section>
    </div>
  )
}

export default Funding
