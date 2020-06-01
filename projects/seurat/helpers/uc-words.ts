/**
 * Just another helper.
 */
export const ucWords = str => str.replace(/(^[a-z])|( [a-z])/g, letter => letter.toUpperCase())
