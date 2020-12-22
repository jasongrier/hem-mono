import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import DonorList from '../components/DonorList'
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
      </section>

      <h2>🌱</h2>

      <p>
        Midst's journal will always be free to the public.<br />

        We hope to continue to grow and to share diverse new work from contemporary writers, serving as a growing library of poetry-as-process. We currently have two "staff" members (Annelyse Gelman and Jason Gillis-Grier), both volunteers, and each contributor is currently paid $50. Midst's financial future is uncertain, but we believe transparency is important to build a healthy, thriving literary community where people trust each other. We hope you'll consider a one-time or monthly donation to help us continue our work!<br />

        All contributions directly support Midst's future, including paying for commissions, web hosting, design, app development, and more.<br />
      </p>

      <h2>💵</h2>

      [2 columns: left has logos, right has descriptions]

      [patreon logo w/ link] <p>Join Midst's<a href="http://www.patreon.com/midstpoetry"> Patreon</a> page as a monthly donor and receive sneak-peeks, previews, and special perks, starting at $3/month.<br /></p>

      [ko-fi logo with link]  <p>You can also give a Fee-free, one-time donation of any amount <a href="https://ko-fi.com/midst">here</a>. <br />
      Other inquiries: annelysegelman@gmail.com.</p>

      <h2>🙌</h2>

      <div>
        <h2>Special thanks to the Genesis program and to our <a href="http://www.patreon.com/midstpoetry">Patrons</a>:</h2>
        <DonorList />
      </div>
    </div>
  )
}

export default Funding
