import { ISelection, ILine } from '../../store/types'

/**
 * Takes an ISelection and applies it as IRanges in multiple ILines,
 * even if the ISelection crosses multiple lines.
 *
 * @param selection A selection object that includes position and line information, see ISelection
 * @param lines An array of lines, see ILine
 */
function selectionToRanges(selection: ISelection, lines: ILine[]): ILine[] {
  return []
}

export default selectionToRanges
