import { ILine, ISelection } from '../../store/types'
import { insertLine, removeLine, updateLine } from '../../store/actions'
import spliceDomString from './splice-dom-string'

/**
 * Determine which editor action to dispatch based on the current
 * cursor position and which key was pressed.
 */
function editorAction(lines: ILine[], { startLine, startPosition, endLine, endPosition }: ISelection, keyCode: number) {
  // Work immutably...
  lines = [].concat(lines)

  if (
    startLine === endLine
    && endPosition === endPosition
  ) {
    const currentLineNumber = startLine
    const currentPosition = startPosition

    if (keyCode === 13) {
      return insertLine(currentLineNumber)
    }

    else if (keyCode === 8 && startPosition === 0) {
      return removeLine(startLine)
    }

    else if (keyCode === 8) {
      return updateLine(
        spliceDomString(currentPosition, lines[currentLineNumber].content),
        currentLineNumber,
        null
      )
    }

    else {
      return updateLine
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
}

export default editorAction
