export const arrayToHslaObj = (arr, mergeIn = {}) => Object.assign({}, {
    h: arr[0],
    s: arr[1],
    l: arr[2],
    a: arr[3],
  },
  mergeIn,
)

export const arrayToHslaCss = (arr, mergeIn = {}) => {
  const obj = arrayToHslaObj(arr, mergeIn)
  return `hsla(${obj.h}, ${obj.s}%, ${obj.l}%, ${obj.a})`
}
