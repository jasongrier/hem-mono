/**
 * **About Selection Transformations**
 *
 * These functions prevent a lot of duplicated code, and make it easier to understand
 * how the caret (cursor) is affected by typing, deleting, clicking, etc. in the editor.
 *
 * Some functions are meant to work with a single caret ––ie: no highlighted selected
 * text like when the user is doing cut/copy/paste. These functions will unselect any
 * selected text and should be used with caution. These functions will be marked with:
 *
 * `THIS TRANSFORMATION IS UNSELECTING`
 *
 * Also, these functions will assume condensed arguments for `currentLineNumber`
 * and `currentPosition`, rather than the start/end/start/end format from `ISelection`.
 */
import { ISelection } from '../../store/types'

/**
 * Transformation for when the user has pressed ENTER. There is no need for
 * `currentPosition` cause pressing ENTER always puts the caret at the start
 * of a line.
 *
 * THIS TRANSFORMATION IS UNSELECTING
 *
 * @param currentLineNumber
 */
const advanceLineAndReturn = (currentLineNumber: number): ISelection => ({
  startLine: currentLineNumber + 1,
  startPosition: 0,
  endLine: currentLineNumber + 1,
  endPosition: 0,
})

/**
 * Transformation for when the user has typed a character. Also used when they pressed
 * left/right arrow, but not at the beginning or end of a line. Defaults to forward.
 *
 * THIS TRANSFORMATION IS UNSELECTING
 *
 * @param currentLineNumber
 * @param currentPosition
 */
const changePosition = (
  currentLineNumber: number,
  currentPosition: number,
  direction: 'back' | 'forward' = 'forward',
): ISelection => ({
  startLine: currentLineNumber,
  startPosition: currentPosition + (direction === 'forward' ? 1 : -1),
  endLine: currentLineNumber,
  endPosition: currentPosition + (direction === 'forward' ? 1 : -1),
})

export {
  advanceLineAndReturn,
  changePosition,
}
