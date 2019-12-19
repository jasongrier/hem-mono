import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'

function NewsList(): ReactElement {
  return (
    <div className="news-list">
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
        <li>
          <h3>Out Now: "About Repulsion" EP</h3>
          <p>Lorem ipsum dolor sit amet</p>
        </li>
        <li>
          <h3>Out Now: "About Repulsion" EP</h3>
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
    </div>
  )
}

export default NewsList
