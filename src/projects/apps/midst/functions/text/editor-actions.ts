import { AnyAction } from 'redux'
import { ILine, ISelection } from '../../store/types'
import { insertLine, removeLine, updateLine } from '../../store/actions'
import splitDomString from './split-dom-string'
import spliceDomString from './splice-dom-string'
import { advanceLineAndReturn, changePosition } from './selection-transformations'

/**
 * Determine which editor action to dispatch based on the current
 * cursor position and which key was pressed.
 *
 * @param lines
 * @param selection
 * @param keyCode
 */
function editorActions(
  lines: ILine[],
  { startLine, startPosition, endLine, endPosition }: ISelection,
  keyCode: number
): AnyAction[] {

  lines = ([] as any).concat(lines)

  const actions: AnyAction[] = []

  if (
    startLine === endLine
    && endPosition === endPosition
  ) {
    const currentLineNumber = startLine
    const currentPosition = startPosition
    const currentLineContent = lines[currentLineNumber].content
    const currentLineRanges = lines[currentLineNumber].ranges

    if ( // Ignore arrow keys
      keyCode === 37
      || keyCode === 38
      || keyCode === 39
      || keyCode === 40
    ) {
      return actions
    }

    if (keyCode === 13 && currentPosition === currentLineContent.length - 1) {
      // Pressed enter at the end of the line, just append a new blank line
      const selection = advanceLineAndReturn(currentLineNumber)
      actions.push(insertLine(selection, currentLineRanges, ''))
    }

    else if (keyCode === 13 && startPosition === 0) {
      // Pressed enter at the beginning of the line, prepend a new blank line
      const selection = advanceLineAndReturn(currentLineNumber)
      actions.push(updateLine(selection, currentLineRanges, ''))
      actions.push(insertLine(selection, currentLineRanges, currentLineContent))
    }

    else if (keyCode === 13) {
      // Pressed enter in the middle of the line, split and redistribute the content
      const content = splitDomString(currentLineContent, currentPosition)
      const selection = advanceLineAndReturn(currentLineNumber)
      actions.push(updateLine(selection, currentLineRanges, content[0]))
      actions.push(insertLine(selection, currentLineRanges, content[1]))
    }

    else if (keyCode === 8 && startPosition === 0) {
      // Pressed delete at beginning of a line, move the current line
      // content on to the end of the previous line
      // actions.push(removeLine(currentLineNumber))
      // actions.push(actions.push(updateLine(
      //   lines[currentLineNumber - 1].content + currentLineContent,
      //   currentLineNumber - 1,
      //   null
      // )))
    }

    else if (keyCode === 8) {
      // Pressed delete in the middle or end of a line, just delete the previous character
      // actions.push(updateLine(
      //   spliceDomString(currentPosition, currentLineContent),
      //   currentLineNumber,
      //   null
      // ))
    }

    else {
      // TODO: Does this really return sth falsy for modifier keys??
      // TODO: Caps??
      const char = String.fromCharCode(keyCode)

      if (char) {
        // It's text, append it
        const selection = changePosition(currentLineNumber, currentPosition, 'forward')
        actions.push(updateLine(selection, currentLineRanges, currentLineContent + char))
      }
    }
  }

  else {
    if (keyCode === 13) {
      // Splice out selected content
    }

    else if (keyCode === 8) {
    }

    else {
    }
  }

  return actions
}

export default editorActions
