declare const PDP_WIDGET_HIGH_INDEX_ADD_ON_PRODUCT: string

function getHighIndexOption() {
  const highIndexOption = JSON.parse(PDP_WIDGET_HIGH_INDEX_ADD_ON_PRODUCT)
  return {
    title: highIndexOption.title,
    price: highIndexOption.price / 100,
  }
}

export default getHighIndexOption