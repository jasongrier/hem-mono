/*
Over my head, I see the bronze butterfly,
Asleep on the black trunk,
Blowing like a leaf in green shadow.
Down the ravine behind the empty house,
The cowbells follow one another
Into the distances of the afternoon.
To my right,
In a field of sunlight between two pines,
The droppings of last year’s horses
Blaze up into golden stones.
I lean back, as the evening darkens and comes on.
A chicken hawk floats over, looking for home.
I have wasted my life.
*/

import React, { ReactElement, useState, useCallback, SyntheticEvent } from 'react'

function relineate(text: string) {
  const proseBlock = text.replace(/\r?\n|\r/g, ' ')
  const allWords = proseBlock.split(' ')

  let relineatedText = ''

  while (allWords.length) {
    for (let i = 0; i < Math.floor(Math.random() * 14 + 1); i++) {
      const word = allWords.shift()
      if (word) {
        relineatedText = relineatedText + word + ' '
      }
    }

    relineatedText = relineatedText + "\n\r"
  }

  return relineatedText
}

function App(): ReactElement {
  const [originalPoem, setOriginalPoem] = useState('')
  const [relineatedPoem, setRelineatedPoem] = useState('')

  const textareaOnChange = useCallback(
    function textareaOnChangeFn(evt: SyntheticEvent<HTMLTextAreaElement>) {
      setOriginalPoem(evt.currentTarget.value)
    }, [],
  )

  const relineateButtonOnClick = useCallback(
    function relineateButtonOnClickFn(evt: SyntheticEvent<HTMLButtonElement>) {
      setRelineatedPoem(relineate(originalPoem))
    }, [originalPoem],
  )

  return (
    <div className="hem-application relineator">
      <div className="relineator-header">
        <h1 className="logo">Relineator</h1>
        <button
          className="relineate-button"
          onClick={relineateButtonOnClick}
        >
            Relineate!
        </button>
      </div>
      <div className="relineator-poems">
        <div className="relineator-poem-before">
          <textarea
            rows={30}
            cols={100}
            onChange={textareaOnChange}
          />
        </div>
        <div className="relineator-poem-after">
          <pre>
            { relineatedPoem }
          </pre>
        </div>
      </div>
    </div>
  )
}

export default App
