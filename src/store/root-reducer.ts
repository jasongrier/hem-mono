import { combineReducers } from 'redux'
import { reducer as appReducer } from '../app'
import { reducer as waveformReducer } from '../waveform'
import { reducer as sidebarReducer } from '../sidebar'

const rootReducer = combineReducers({
  app: appReducer,
  waveform: waveformReducer,
  sidebar: sidebarReducer,
})

export default rootReducer
