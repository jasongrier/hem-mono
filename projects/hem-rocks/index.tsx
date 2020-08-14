import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import { popupsReducer } from '../../lib/modules/popups'
import { playerReducer } from '../../lib/modules/website-player'
import { App, appReducer } from './modules/app'
import { loginReducer } from './modules/login'
import { cartReducer } from './modules/cart'
import { contentReducer } from './modules/content'
import { ProtectedContent } from './modules/login'
import './styles'

declare const window: any

const rootReducer = combineReducers({
  app: appReducer,
  cart: cartReducer,
  content: contentReducer,
  login: loginReducer,
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

import { createItemsSaga } from './modules/content'
sagaMiddleware.run(createItemsSaga)

import { readItemsSaga } from './modules/content'
sagaMiddleware.run(readItemsSaga)

import { updateItemsSaga } from './modules/content'
sagaMiddleware.run(updateItemsSaga)

import { deleteItemsSaga } from './modules/content'
sagaMiddleware.run(deleteItemsSaga)

import { addProductToCartSaga } from './modules/cart'
sagaMiddleware.run(addProductToCartSaga)

import { clearCartSaga } from './modules/cart'
sagaMiddleware.run(clearCartSaga)

import { removeProductFromCartSaga } from './modules/cart'
sagaMiddleware.run(removeProductFromCartSaga)

import { requestSaleSaga } from './modules/cart'
sagaMiddleware.run(requestSaleSaga)

import { submitSaleSaga } from './modules/cart'
sagaMiddleware.run(submitSaleSaga)

import { loginCheckSaga } from './modules/login'
sagaMiddleware.run(loginCheckSaga)

import { loginSaga } from './modules/login'
sagaMiddleware.run(loginSaga)

import { logoutSaga } from './modules/login'
sagaMiddleware.run(logoutSaga)

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
