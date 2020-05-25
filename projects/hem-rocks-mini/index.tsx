import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import { popupsReducer } from '../../lib/modules/popups'
import { playerReducer } from '../../lib/modules/player'
import { App, appReducer } from './modules/app'
import { cartReducer } from './modules/cart'
import { contentReducer } from './modules/content'
import './styles'

declare const window: any

const rootReducer = combineReducers({
  app: appReducer,
  cart: cartReducer,
  content: contentReducer,
  player: playerReducer,
  popups: popupsReducer,
})

const sagaMiddleware = createSagaMiddleware()

const store = window.STORE = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware),
  )
)

import { requestActiveLiveStreamSaga } from './modules/app'
sagaMiddleware.run(requestActiveLiveStreamSaga)

import { mutePlayerSaga } from '../../lib/modules/player'
sagaMiddleware.run(mutePlayerSaga)

import { nextTrackSaga } from '../../lib/modules/player'
sagaMiddleware.run(nextTrackSaga)

import { pausePlayerSaga } from '../../lib/modules/player'
sagaMiddleware.run(pausePlayerSaga)

import { playPlayerSaga } from '../../lib/modules/player'
sagaMiddleware.run(playPlayerSaga)

import { previousTrackSaga } from '../../lib/modules/player'
sagaMiddleware.run(previousTrackSaga)

import { seekPlayerSaga } from '../../lib/modules/player'
sagaMiddleware.run(seekPlayerSaga)

import { trackEndedSaga } from '../../lib/modules/player'
sagaMiddleware.run(trackEndedSaga)

import { unmutePlayerSaga } from '../../lib/modules/player'
sagaMiddleware.run(unmutePlayerSaga)

import { unpausePlayerSaga } from '../../lib/modules/player'
sagaMiddleware.run(unpausePlayerSaga)

import { createItemsSaga } from './modules/content'
sagaMiddleware.run(createItemsSaga)

import { readItemsSaga } from './modules/content'
sagaMiddleware.run(readItemsSaga)

import { updateItemsSaga } from './modules/content'
sagaMiddleware.run(updateItemsSaga)

import { addProductToCartSaga } from './modules/cart'
sagaMiddleware.run(addProductToCartSaga)

import { clearCartSaga } from './modules/cart'
sagaMiddleware.run(clearCartSaga)

import { removeProductFromCartSaga } from './modules/cart'
sagaMiddleware.run(removeProductFromCartSaga)

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
