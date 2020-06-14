import React, { ReactElement, useCallback, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addAnnotation } from '../index'
import { RootState } from '../../../index'

function App(): ReactElement {
  const { annotations } = useSelector((state: RootState) => ({
    annotations: state.app.annotations,
  }))

  const dispatch = useDispatch()

  const [ bodyOpen, setBodyOpen ] = useState<boolean>(false)

  useEffect(function test() {
    const { remote } = window.require('electron')
    const { join } = remote.require('path')
    const pathToMain = join(__dirname, '..', '..', '..', '..', '..', 'lib', 'electron', 'main')
    const {
      initWorker,
      playNote,
      sendControl,
      startPlaying,
      stopPlaying,
    } = remote.require(pathToMain)

    // initWorker('Breto')
  }, [])

  const addAnnotationOnClick = useCallback(
    function addAnnotationOnClickFn() {
      dispatch(addAnnotation({
        body: 'body',
        category: 'category',
        tags: 'tags',
        timestamp: 'timestamp',
        title: 'title',
      }))
    }, [],
  )

  const onSummaryClick = useCallback(
    function onSummaryClickFn() {
      setBodyOpen(true)
    }, [],
  )

  return (
    <div className="hem-application breto">
      <header>
        <button
          className="add-a-marker-button"
          onClick={addAnnotationOnClick}
        >
          Add an Annotation
        </button>
      </header>

      <main>
        <h1>Annotation title</h1>
        <p
          className="annotation-summary"
          onClick={onSummaryClick}
        >
          I'm baby beard fashion axe plaid gluten-free chia everyday carry kitsch mlkshk try-hard cliche...
        </p>
        <h2>Tags</h2>
        <p>foo, bar, baz</p>
      </main>

      <aside>
        <ul className="annotations-list">
          { annotations.map(annotation => (
            <li>{ annotation.title }</li>
          ))}
        </ul>
      </aside>

      <section className={`
        annotation-body
        ${ bodyOpen ? 'annotation-body-open' : '' }
      `}>
        I'm baby beard fashion axe plaid gluten-free chia everyday carry kitsch mlkshk try-hard cliche.
      </section>
    </div>
  )
}

export default App
