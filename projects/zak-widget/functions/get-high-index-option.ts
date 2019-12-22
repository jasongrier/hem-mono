declare const PDP_WIDGET_HIGH_INDEX_ADD_ON_PRODUCT: string

function getHighIndexOption() {
  const highIndexOption = JSON.parse(PDP_WIDGET_HIGH_INDEX_ADD_ON_PRODUCT)
  return highIndexOption && highIndexOption.title
}

export default getHighIndexOption
