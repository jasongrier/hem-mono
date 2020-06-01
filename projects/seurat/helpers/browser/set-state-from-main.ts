export interface ISetStateFromMain {
  (field: string): (evt: any, data: any) => void
}

export const setStateFromMain = (field) => (evt, data) => {
  this.setState({[field]: data})
}
