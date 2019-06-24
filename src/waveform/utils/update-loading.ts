import { store } from '../../store'
import { setWaveformLoading } from '../redux'

function updateLoading({ msg }: { msg: string }) {
  if (msg === 'loading') {
    store.dispatch(setWaveformLoading(true))
  }

  else if (msg === 'loaded') {
    store.dispatch(setWaveformLoading(false))
  }
}

export default updateLoading
