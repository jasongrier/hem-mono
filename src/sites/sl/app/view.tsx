import React, { ReactElement } from 'react'
import { One } from './components'
import { Two } from './components'
import './style.css'

function AppView(): ReactElement {
  return (
    <div>
      <header className="site-header">
        <h1>HEM<span>SL</span></h1>
      </header>
      <main>
        <nav>
          <section className="sl-one">
            <One />
          </section>
          <section className="sl-two">
            <Two />
          </section>
        </nav>
      </main>
      <footer>
        <small>&copy; 2019–2020 HEM IVS</small>
      </footer>
    </div>
  )
}

export default AppView
