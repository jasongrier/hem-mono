import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import { popupsReducer } from '../../lib/modules/popups'
import { playerReducer } from '../../lib/modules/website-player'
import { webMovieReducer } from '../../lib/modules/web-movie'
import { flipBooksReducer } from '../../lib/modules/flip-book'
import { App, appReducer } from './modules/core/app'
import { loginReducer } from './modules/core/login'
import { cartReducer } from './modules/core/cart'
import { contentReducer } from './modules/core/content'
import './styles/core'

declare const window: any

const rootReducer = combineReducers({
  app: appReducer,
  cart: cartReducer,
  content: contentReducer,
  flipBooks: flipBooksReducer,
  login: loginReducer,
  player: playerReducer,
  popups: popupsReducer,
  webMovie: webMovieReducer,
})

const sagaMiddleware = createSagaMiddleware()

const store = window.STORE = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware),
  )
)

import { appSaga } from './modules/core/app'
sagaMiddleware.run(appSaga)

import { nextTrackSaga } from '../../lib/modules/website-player'
sagaMiddleware.run(nextTrackSaga)

import { pausePlayerSaga } from '../../lib/modules/website-player'
sagaMiddleware.run(pausePlayerSaga)

import { playPlayerSaga } from '../../lib/modules/website-player'
sagaMiddleware.run(playPlayerSaga)

import { previousTrackSaga } from '../../lib/modules/website-player'
sagaMiddleware.run(previousTrackSaga)

import { seekPlayerSaga } from '../../lib/modules/website-player'
sagaMiddleware.run(seekPlayerSaga)

import { setPlayerInstanceSaga } from '../../lib/modules/website-player'
sagaMiddleware.run(setPlayerInstanceSaga)

import { trackEndedSaga } from '../../lib/modules/website-player'
sagaMiddleware.run(trackEndedSaga)

import { unpausePlayerSaga } from '../../lib/modules/website-player'
sagaMiddleware.run(unpausePlayerSaga)

import { createItemsSaga } from './modules/core/content'
sagaMiddleware.run(createItemsSaga)

import { readChunkSaga } from './modules/core/content'
sagaMiddleware.run(readChunkSaga)

import { readItemsSaga } from './modules/core/content'
sagaMiddleware.run(readItemsSaga)

import { updateItemsSaga } from './modules/core/content'
sagaMiddleware.run(updateItemsSaga)

import { deleteItemsSaga } from './modules/core/content'
sagaMiddleware.run(deleteItemsSaga)

import { addProductToCartSaga } from './modules/core/cart'
sagaMiddleware.run(addProductToCartSaga)

import { clearCartSaga } from './modules/core/cart'
sagaMiddleware.run(clearCartSaga)

import { removeProductFromCartSaga } from './modules/core/cart'
sagaMiddleware.run(removeProductFromCartSaga)

import { requestSaleSaga } from './modules/core/cart'
sagaMiddleware.run(requestSaleSaga)

import { submitSaleSaga } from './modules/core/cart'
sagaMiddleware.run(submitSaleSaga)

import { loginCheckSaga } from './modules/core/login'
sagaMiddleware.run(loginCheckSaga)

import { loginSaga } from './modules/core/login'
sagaMiddleware.run(loginSaga)

import { logoutSaga } from './modules/core/login'
sagaMiddleware.run(logoutSaga)

import { flipBooksSaga } from '../../lib/modules/flip-book'
sagaMiddleware.run(flipBooksSaga)

import { webMovieSaga } from '../../lib/modules/web-movie'
sagaMiddleware.run(webMovieSaga)

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
