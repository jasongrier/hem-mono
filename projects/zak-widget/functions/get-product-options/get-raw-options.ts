declare const PDP_WIDGET_PRODUCT_OPTIONS_WITH_VALUES: string

function getRawOptions() {
  return JSON.parse(PDP_WIDGET_PRODUCT_OPTIONS_WITH_VALUES)
}

export default getRawOptions
