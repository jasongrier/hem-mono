/**
 * Just another helper.
 */
import {dashToPascal} from './dash-to-pascal'

export const dashToCamel = term => {
  const firstCap = dashToPascal(term)
  return firstCap.charAt(0).toLowerCase() + firstCap.slice(1)
}
