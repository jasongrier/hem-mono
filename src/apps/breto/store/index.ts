import rootReducer from './root-reducer'

export type RootState = ReturnType<typeof rootReducer>

export { default as store } from './store'
