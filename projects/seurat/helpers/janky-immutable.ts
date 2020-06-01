/**
 * Just another helper.
 */
export const jankyImmutable = (o) => {
  return JSON.parse(JSON.stringify(o))
}
