import React, { ReactElement, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { find } from 'lodash'
import { imagesRequest, registerFlipBook } from '../index'

interface IProps {
  // TODO: All projects, separate alphabetized required props from optionals, lint
  id: string
  urls: string[]

  loop?: boolean
  autoplay?: boolean
  speed?: number
}

const styleSheet = `
  .hem-flip-book {
    position: relative;
    background-color: #ddd;
  }

  .hem-flip-book img {
    position: absolute;
    top: 0;
    left: 0;
  }

  .hem-flip-book-loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
  }

  .hem-flip-book-loading-bar-track {
    position: relative;
    width: 50%;
    height: 5px;
  }

  .hem-flip-book-loading-bar {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    min-width: 5px;
    height: 5px;
    border-radius: 3px;
    background-color: #000;
  }
`

function FlipBook({
  id,
  urls,

  autoplay = true,
}: IProps): ReactElement {
  const { flipBookState } = useSelector((state: any) => ({
    flipBookState: find(state.flipBooks.flipBooks, { id })
  }))

  const dispatch = useDispatch()

  useEffect(function register() {
    if (flipBookState) return
    if (!id) return
    dispatch(registerFlipBook(id, autoplay))
  }, [id])

  useEffect(function load() {
    if (!id) return
    dispatch(imagesRequest(id, urls))
  }, [id])

  const loaded = flipBookState?.frames?.length === urls.length

  return (
    <div
      className="hem-flip-book"
      id={id}
    >
      <style dangerouslySetInnerHTML={{ __html: styleSheet }} />
      { !loaded && (
        <>
          <div className="hem-flip-book-loading">
            <div className="hem-flip-book-loading-bar-track">
              <div
                className="hem-flip-book-loading-bar"
                style={{
                  width: ((flipBookState?.loaded || 0) * 50) + '%'
                }}
              />
            </div>
          </div>
        </>
      )}
      { loaded && flipBookState.frames?.map((src: string, frame: number) => (
        <img
          key={src}
          src={src}
          style={{ opacity: flipBookState.currentFrame === frame ? 1 : 0 }}
        />
      ))}
    </div>
  )
}

export default FlipBook
