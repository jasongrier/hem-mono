import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import App from './components/App'
// import sequencer from './workers/sequencer.worker'
import './index.css'

export const worker = new Worker('./workers/sequencer.worker.js')

worker.addEventListener('message', function(e) {
  console.log('Message from Worker: ' + e.data)
})

const Root = (
  <Provider store={store}>
    <App />
  </Provider>
)

export default Root
