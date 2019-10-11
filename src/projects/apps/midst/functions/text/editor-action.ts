import { INSERT_LINE, REMOVE_LINE, UPDATE_LINE, ISelection } from '../../store/types'

/**
 * Determine which editor action to dispatch based on the current
 * cursor position and which key was pressed.
 */
function editorAction(selection: ISelection, keyCode: number) {
  /**
   * If all values in the selection are the same:
   *  If the selection start is 0 and delete was pressed then
   *  remove the current line and add its content to the end
   *  of the previous line (REMOVE_LINE, UPDATE_LINE)
   *  etc...
   */
}

export default editorAction
