interface Window {
  env: any
  require: any
}

interface IAction { // TODO: Use Redux.AnyAction
  type: string
  payload: any
}
