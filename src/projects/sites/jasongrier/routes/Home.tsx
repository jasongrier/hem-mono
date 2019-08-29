import React, { ReactElement } from 'react'

function Home(): ReactElement {
  return (
    <div className="home-page">
      <header>
        <h1>Jason Grier</h1>
        <nav>
          <ul>
            <li>Label</li>
            <li>Library</li>
            <li>Sound Art</li>
            <li>Technology</li>
            <li>Consulting</li>
          </ul>
        </nav>
      </header>
      <main>
        <section>
          <h1>News</h1>
          <ul>
            <li>Revolutionary Manœuvres, Copenhagen</li>
            <li>Dublab Radio, Los Angeles</li>
          </ul>
        </section>
        <section>
          <h1>Forthcoming</h1>
          <ul>
            <li>About Repulsion EP w/<a href="">Annelyse Gelman</a></li>
            <li>Midst Digital Writing Platform</li>
            <li>Sound Library 1.2</li>
          </ul>
        </section>
        <section>
          <h1>Listen</h1>
          <ul>
            <li>"Piano Solo" for BBC Radio 6 Music</li>
            <li>Mix for The Wire Magazine</li>
            <li>Mix for NTS Radio</li>
            <li>Interview with Gioconda Radio</li>
            <li>Interview with Deutschlandfunk Kultur</li>
          </ul>
        </section>
      </main>

      <footer>
        <nav>
          <ul>
            <li><a href="">About</a></li>
            <li><a href="">CV</a></li>
            <li><a href="">Press</a></li>
            <li><a href="">Bandcamp</a></li>
            <li><a href="">HEM</a></li>
            <li><a href="">Contact</a></li>
          </ul>
        </nav>
      </footer>
    </div>
  )
}

export default Home
