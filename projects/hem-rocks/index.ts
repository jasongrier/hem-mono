import React from 'react'
import ReactDOM from 'react-dom'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { composeWithDevTools } from 'redux-devtools-extension'
import { App } from './components'
import './static/assets/fonts/u8/u8.css'
import './styles'
import './tasks'

// Put together Reducers
import { reducer as articlesReducer } from './modules/articles'
import { reducer as loginReducer } from './modules/login'
import { reducer as miscReducer } from './modules/misc'
import { reducer as playerReducer } from './packages/website-player'
import { reducer as uiReducer } from './modules/ui'

const rootReducer = combineReducers({
  articles: articlesReducer,
  login: loginReducer,
  misc: miscReducer,
  player: playerReducer,
  ui: uiReducer,
})

// Put together the Store
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware),
  )
)

// Run the Sagas
import { indexSaga } from './modules/articles'
sagaMiddleware.run(indexSaga)

import { loginCheckSaga, loginSaga, logoutSaga } from './modules/login'
sagaMiddleware.run(loginCheckSaga)
sagaMiddleware.run(loginSaga)
sagaMiddleware.run(logoutSaga)

// Render the App
// TODO: All projects; root div id should be 'react-root'
ReactDOM.render(
  React.createElement(HelmetProvider, {},
    React.createElement(Provider, { store },
      React.createElement(BrowserRouter, {},
        React.createElement(App)
      )
    )
  ),
  document.getElementById('react-root')
)

// Export the store
export type RootState = ReturnType<typeof rootReducer>
export default store
