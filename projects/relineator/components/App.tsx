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
      <div className="relineator-header" />
      <div className="relineator-poems">
        <div className="relineator-poem-before">
          <textarea
            placeholder="Paste your poem here..."
            onChange={textareaOnChange}
          />
          <button
            className="relineate-button"
            onClick={relineateButtonOnClick}
          >
            Relineate!
          </button>
        </div>
        <div className="relineator-poem-after">
          <pre>
            { relineatedPoem }
          </pre>
        </div>
      </div>




      {/* <div className="about">
        Relineator! is a tool for automatically re-lineating poems.<br />
        Brought to you by Zoe Bursztajn-Illingworth &amp; the UT Austin Digital Writing &amp; Research Lab. ♥
      </div> */}






                      <div id="myModal" class="full reveal" data-reveal></div>
                      <script>
                      $("#myTrigger").on("click",function(e) {
                        e.preventDefault();
                        $("#myModal")
                          .html('<object width="100%" height="100%" type="text/html" data="http://textmechanic.com" ></object>')
                          .foundation("open");
                    
                      });
                      </script>


                   <div class="open-modal">
                     <a data-open="aboutModal">
                          link to open the modal
                    </div>
                    
                    <div class="reveal" id="aboutModal" data-reveal>

       
                       inside the modal   about the relineator blah blah

                      <button class="close-button" data-close aria-label="Close modal" type="button">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
            
                    

    </div>
  )
}

export default App
