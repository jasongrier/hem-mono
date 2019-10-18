import { AnyAction } from 'redux'
import moment from 'moment'
import uuid from 'uuid/v1'
import store from '../../store'

// TODO: Move all this stuff to a worker?!
// TODO: This stuff eventually has to dispatch a new ITimelineFrame not a new line batch!!

interface IBufferedAction {
  uuid: string
  action: AnyAction
}

let actionBuffer: IBufferedAction[] = []
let flushedActionIds: string[] = []
let idleTimer: number
let idleTimeLimit = 1000
let lastRun: number
let maxBufferSize = 100 // TODO: Tweak this. (Can it be 1000?!)

/**
 * The model will change per keystroke, and each keystroke can potentially dispatch
 * multiple actions, causing the typing-feel to become erratic. So we buffer the changes
 * here, and later release them when either a) it seems like the user is idle, or b)
 * when the buffer has grown too large to replay within a reasonable span of time.
 *
 * @param {redux.AnyAction} action - Some Redux action.
 */
function bufferEditorActions(actions: AnyAction[]) {
  clearTimeout(idleTimer)

  actionBuffer = actionBuffer.concat(actions.map(action => ({
    uuid: uuid(),
    action,
  })))

  console.log(actions.length)

  if (actionBuffer.length > maxBufferSize) { // It's an emergency, just replay now.
    flushActionBuffer()
  }

  else { // Wait till it's convenient.
    setTimeout(() => { // TODO: See if lodash.debounce is more crispy.
      if (moment.now() > lastRun + 1000) {
        flushActionBuffer()
      }
    }, idleTimeLimit)
  }
}

/**
 * Flush the action buffer, essentially doing a `git apply` to the application state.
 * This is a VERY expensive operation, and needs to be done quickly (ie: don't let the
 * buffer grow too large) but also tastefully (ie: wait for _n_ milliseconds of inactivity).
 *
 * TODO: This will entail some kind of reconciliation, to make sure the rendered text fits
 * the model. See: https://medium.engineering/why-contenteditable-is-terrible-122d8a40e480
 *
 * TODO: This may also entail cancelability, unfortunately. :/ Kommt Zeit, kommt Rat.
 */
function flushActionBuffer() {
  // 1) Immutably grab the actions to be replayed
  const outputBuffer = JSON.parse(JSON.stringify(actionBuffer))

  // 2) Keep track of which actions got replayed
  flushedActionIds = Object.keys(outputBuffer)

  // 3) Replay the buffer
  outputBuffer.map(store.dispatch)

  // 4) Remove the replayed actions from the buffer.
  // (We use uuid's rather than `Array.slice` in case typing has occurred during replay.)
  actionBuffer = actionBuffer.filter(bufferedAction =>
    flushedActionIds.indexOf(bufferedAction.uuid) === -1
  )

  // 5) To keep the user from "rabbit footing" the buffer, we empty it max every _n_ ms.
  lastRun = moment.now()
}

export default bufferEditorActions
