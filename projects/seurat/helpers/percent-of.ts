export const  percentOf = (max, percent, reflect) => {
  return (max * (percent / 100)) - (reflect && percent !== 0 ? max / 2 : 0)
}
