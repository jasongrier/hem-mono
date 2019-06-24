import { combineReducers } from 'redux'
import { reducer as appReducer } from '../app'
import { reducer as waveformReducer } from '../waveform'

const rootReducer = combineReducers({
  app: appReducer,
  waveform: waveformReducer,
})

export default rootReducer
