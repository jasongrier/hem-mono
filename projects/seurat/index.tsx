import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import { popupsReducer } from '../../lib/modules/popups'
import { playerReducer } from '../../lib/modules/website-player'

/**
 * API for Seurat.
 */

// ================================================================================
// External
// ================================================================================
import 'normalize.css'

// ================================================================================
// Framework
// ================================================================================
// import {bootstrap} from 'projekt/lib/public/bootstrap'

// ================================================================================
// Project
// ================================================================================
import './public/fonts/helvetica-neue/helvetica-neue.css'
import './public/fonts/u8/u8.css'
import {Seurat} from './components/SeuratPm'

// ================================================================================
// Init
// ================================================================================
// bootstrap(Seurat)

const Root = (
  <BrowserRouter>
    <Seurat />
  </BrowserRouter>
)

ReactDOM.render(Root, document.getElementById('root'))