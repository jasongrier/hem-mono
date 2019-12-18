import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { CampaignMonitorForm } from '../../../lib/components'
import { Header } from '../components/layout'
import { BASE_SITE_TITLE } from '../config'

function Home(): ReactElement {
  return (
    <div className="page home">
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>

      <Header />

      <main>
        <section className="home-section-midst">
          <h1>
            <Link to="/midst">
              <img src="/static/assets/svg/midst_logo_mini.svg" alt="Midst"/>
              <span>Midst</span>
            </Link>
          </h1>
        </section>
        <section className="home-section-sl">
          <h1>
            <Link to="/sound-library">
              <img src="/static/assets/svg/sl_temp_logo.svg" alt="HEM Sound Library"/>
              <span>Sound Library</span>
            </Link>
          </h1>
        </section>
        <section className="home-section-seurat">
          <h1>
            <Link to="/seurat">
              <img src="/static/assets/svg/seurat_temp_logo.svg" alt="Seurat"/>
              <span>Seurat</span>
            </Link>
          </h1>
        </section>
      </main>
      <section className="mailing-list-pencil">
        <CampaignMonitorForm
          hasNameField={false}
          id="foo"
          placeholderText="Get updates in your inbox. Enter your email here"
        />
      </section>
      <section className="extra-links-pencil">
        <ul className="extra-links-left">
          <li>
            <Link to="/human-ear-music">Human Ear Music</Link>
          </li>
          <li>
            <Link to="/react-dev">React Development</Link>
          </li>
          <li>
            <Link to="/more-projects">More projects!</Link>
          </li>
        </ul>
        <ul className="extra-links-right">
          <li>
            <a href="#">info@hem.rocks</a>
          </li>
          <li>
            <a href="#">Facebook</a>
          </li>
          <li>
            <a href="#">Twitter</a>
          </li>
          <li>
            <a href="#">Instagram</a>
          </li>
        </ul>
      </section>
      <section className="news">
        <h2>Latest News</h2>
        <ul>
          <li>
            <h3>Midst Journal is Out Now</h3>
            <p>Lorem ipsum dolor sit amet</p>
          </li>
          <li>
            <h3>New packs for Ableton Live coming in 2020</h3>
            <p>Lorem ipsum dolor sit amet</p>
          </li>
          <li>
            <h3>Introducing: Seurat Desktop for Mac and iOS</h3>
            <p>Lorem ipsum dolor sit amet</p>
          </li>
          <li>
            <h3>Out Now: "About Repulsion" EP</h3>
            <p>Lorem ipsum dolor sit amet</p>
          </li>
        </ul>
        <div className="all-news-link">
          <Link to="/news">
            All news...
          </Link>
        </div>
      </section>
      <footer>
        &copy; 2020 HEM
      </footer>
    </div>
  )
}

export default Home
