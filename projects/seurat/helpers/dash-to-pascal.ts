/**
 * Just another helper.
 */
import {ucWords} from './uc-words'

export const dashToPascal = term => ucWords(term.replace(new RegExp('-', 'g'), ' ')).replace(new RegExp(' ', 'g'), '')
