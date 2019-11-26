import React, { ReactElement } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

import {
  Home,
  NotFound,
} from '../routes'

import {
  ArpeggiatorDemo,
  ArrangerDemo,
  MetronomeDemo,
  Demos,
  FlipBookDemo,
  MidiDemo,
  NoiseReductionDemo,
  PerformerDemo,
} from '../routes/demos/'

import {
  Projects,
  Orion,
} from '../routes/projects'

function App(): ReactElement {
  return (
    <div className="hem-application">
      <header className="page-header">
        <h1>
          <Link to="/">HEM Studio</Link>
        </h1>
      </header>

      <Switch>
        <Route exact path="/" component={Home} />

        <Route exact path="/demos" component={Demos} />
        <Route exact path="/demos/arpeggiator" component={ArpeggiatorDemo} />
        <Route exact path="/demos/arranger" component={ArrangerDemo} />
        <Route exact path="/demos/metronome" component={MetronomeDemo} />
        <Route exact path="/demos/flip-book" component={FlipBookDemo} />
        <Route exact path="/demos/noise-reduction" component={NoiseReductionDemo} />
        <Route exact path="/demos/midi" component={MidiDemo} />
        <Route exact path="/demos/performer-demo" component={PerformerDemo} />

        <Route exact path="/projects" component={Projects} />
        <Route exact path="/projects/orion" component={Orion} />
        <Route component={NotFound} />
      </Switch>

      <footer className="page-footer">
        <hr/>
        <p>
          &copy; HEM 2020
        </p>
      </footer>
    </div>
  )
}

export default App
