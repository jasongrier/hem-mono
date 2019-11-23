import React, { ReactElement } from 'react'
import { Switch, Route } from 'react-router-dom'
// TODO: Use barrel files
import Home from '../routes/Home'
import ArpeggiatorDemo from '../routes/demos/ArpeggiatorDemo'
import ArrangerDemo from '../routes/demos/ArrangerDemo'
import ClockDividerDemo from '../routes/demos/ClockDividerDemo'
import FlipBookDemo from '../routes/demos/FlipBookDemo'
import MidiDemo from '../routes/demos/MidiDemo'

function App(): ReactElement {
  return (
    <div className="hem-application">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/demos/arpeggiator" component={ArpeggiatorDemo} />
        <Route exact path="/demos/arranger" component={ArrangerDemo} />
        <Route exact path="/demos/clock-divider" component={ClockDividerDemo} />
        <Route exact path="/demos/flip-book" component={FlipBookDemo} />
        <Route exact path="/demos/midi" component={MidiDemo} />
        {/* TODO: 404 page */}
      </Switch>
    </div>
  )
}

export default App
