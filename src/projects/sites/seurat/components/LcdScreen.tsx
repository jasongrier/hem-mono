import React, { ReactElement } from 'react'

interface IProps {
  content: string
}

const letterPatternsCompressed = 'oxxxxxo|xooooox|xooooox|xxxxxxx|xooooox|xooooox|xooooox=|xxxxxxo|xooooox|xooooox|xxxxxxo|xooooox|xooooox|xxxxxxo=|oxxxxxx|xoooooo|xoooooo|xoooooo|xoooooo|xoooooo|oxxxxxx=|xxxxxxo|xooooox|xooooox|xooooox|xooooox|xooooox|xxxxxxo=|xxxxxxx|xoooooo|xoooooo|xxxxooo|xoooooo|xoooooo|xxxxxxx=|xxxxxxx|xoooooo|xoooooo|xxxxooo|xoooooo|xoooooo|xoooooo=|oxxxxxo|xoooooo|xoooooo|xoooooo|xooooxx|xooooox|oxxxxxo=|xooooox|xooooox|xooooox|xxxxxxx|xooooox|xooooox|xooooox=|oooxooo|oooxooo|oooxooo|oooxooo|oooxooo|oooxooo|oooxooo=|oooooox|oooooox|oooooox|oooooox|xooooox|xooooox|oxxxxxo=|xooooox|xooooxo|xoooxoo|xxxxooo|xoooxoo|xooooxo|xooooox=|xoooooo|xoooooo|xoooooo|xoooooo|xoooooo|xoooooo|xxxxxxx=|xooooox|xxoooxx|xoxoxox|xooxoox|xooooox|xooooox|xooooox=|xooooox|xxoooox|xoxooox|xooxoox|xoooxox|xooooxx|xooooox=|oxxxxxo|xooooox|xooooox|xooooox|xooooox|xooooox|oxxxxxo=|xxxxxxo|xooooox|xooooox|xxxxxxo|xoooooo|xoooooo|xoooooo=|oxxxxxo|xooooox|xooooox|xooooox|xoxooxo|xooxxxo|oxxooxx=|xxxxxxo|xooooox|xooooox|xxxxxxo|xooooox|xooooox|xooooox=|oxxxxxx|xoooooo|xoooooo|oxxxxxo|oooooox|oooooox|xxxxxxo=|xxxxxxx|oooxooo|oooxooo|oooxooo|oooxooo|oooxooo|oooxooo=|xooooox|xooooox|xooooox|xooooox|xooooox|xooooox|oxxxxxo=|xooooox|xooooox|xooooox|xooooox|xooooox|oxoooxo|ooxxxoo=|xooooox|xooooox|xooooox|xooxoox|x x x x|xxoooxx|xooooox=|xooooox|oxoooxo|ooxoxoo|oooxooo|ooxoxoo|oxoooxo|xooooox=|xooooox|oxoooxo|ooxoxoo|oooxooo|oooxooo|oooxooo=|xxxxxxx|oooooxo|ooooxoo|oooxooo|ooxoooo|oxooooo|xxxxxxx'
const letterPatterns = letterPatternsCompressed.split('=').map(l => l.split('|'))
const letterKeys = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

function letter(letter: string) {
  const grid = []
  for (let r = 0; r < 4; r ++) {
    for (let c = 0; c < 3; c ++) {
      const glyph = letterPatterns[letterKeys.indexOf(letter)]
      grid.push(
        <div className={`
          lcd-screen__pixel
            lcd-screen__pixel--${glyph && glyph[r + c] ? 'on' : 'off'}
        `} />
      )
    }
  }
  return grid
}

function LcdScreen({ content }: IProps): ReactElement {
  return (
    <div className="lcd-screen">
      {content.split('').map(letter)}
    </div>
  )
}

export default LcdScreen
