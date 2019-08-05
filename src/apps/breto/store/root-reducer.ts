import { combineReducers } from 'redux'
import { reducer as appReducer } from '../app'
import { reducer as projectReducer } from '../app/components/project'
import { reducer as waveformReducer } from '../app/components/waveform'

const rootReducer = combineReducers({
  app: appReducer,
  project: projectReducer,
  waveform: waveformReducer,
})

export default rootReducer
