import {map} from 'lodash'
import {createVirtualMidiPortInput, createVirtualMidiPortOutput, IOnMessageHandler} from './virtual-midi'

const midiAppFactory = (name: string, middlewareFactories: Array<(output) => IOnMessageHandler>) => {
  const output = createVirtualMidiPortOutput(name)
  const middlewares = map(middlewareFactories, fact => fact(output))
  createVirtualMidiPortInput(name, (deltaTime, message) => {
    for (const middleware of middlewares) {
      middleware(deltaTime, message)
    }
  })

  return output
}

export {midiAppFactory}