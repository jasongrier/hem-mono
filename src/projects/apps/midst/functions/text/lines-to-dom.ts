import { ILine } from '../../store/types'

function linesToDom(lines: ILine[]) {
  let domString = ''

  lines.forEach(line => {
    domString = domString + `<p>${line.content}</p>`

    line.ranges.forEach(range => {
      if (range.attribute === 'bold') {

      }

      else if (range.attribute === 'italic') {

      }

      else { // It's a font...

      }
    })
  })
}

export default linesToDom
