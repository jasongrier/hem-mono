import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { popupsReducer } from '../../lib/modules/popups'
import { App, appReducer } from './modules/app'
import { productsReducer } from './modules/products'
import { siteContentReducer } from './modules/site-content'

const rootReducer = combineReducers({
  app: appReducer,
  popups: popupsReducer,
  products: productsReducer,
  siteContent: siteContentReducer,
})

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  )
)

const Root = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(Root, document.getElementById('root'))

export type RootState = ReturnType<typeof rootReducer>

export default store
