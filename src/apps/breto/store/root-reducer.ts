import { combineReducers } from 'redux'
import { reducer as appReducer } from '../app'
import { reducer as projectReducer } from '../project'
import { reducer as waveformReducer } from '../waveform'

const rootReducer = combineReducers({
  app: appReducer,
  project: projectReducer,
  waveform: waveformReducer,
})

export default rootReducer
