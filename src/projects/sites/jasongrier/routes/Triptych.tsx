import React, { ReactElement, useState, useEffect } from 'react'

function randomFrameRate() {
  return Math.floor(Math.random() * 14 + 6)
}

function frameStack(count: number) {
  return new Array(count).fill(null)
}

function Triptych(): ReactElement {
  const [frameRates, setFrameRates] = useState([6, 6, 6])
  const [leftFrameNumber, setLeftFrameNumber] = useState(0)
  const [centerFrameNumber, setCenterFrameNumber] = useState(0)
  const [rightFrameNumber, setRightFrameNumber] = useState(0)

  // useEffect(() => {
  //   const shuffleFrameRatesInterval = setInterval(() => {
  //     setFrameRates([
  //       randomFrameRate(),
  //       randomFrameRate(),
  //       randomFrameRate(),
  //     ])
  //   }, 3000)

  //   return function destroy() {
  //     clearInterval(shuffleFrameRatesInterval)
  //   }
  // }, [])

  useEffect(() => {
    const leftProjectorInterval = setTimeout(() => {
      setLeftFrameNumber(leftFrameNumber > 83 ? 0 : leftFrameNumber +1)
    }, frameRates[0] * 12)

    return function destroy() {
      clearTimeout(leftProjectorInterval)
    }
  }, [leftFrameNumber])

  useEffect(() => {
    const centerProjectorInterval = setTimeout(() => {
      setCenterFrameNumber(centerFrameNumber > 128 ? 0 : centerFrameNumber + 1)
    }, frameRates[1] * 12)

    return function destroy() {
      clearTimeout(centerProjectorInterval)
    }
  }, [centerFrameNumber])

  useEffect(() => {
    const rightrojectorInterval = setTimeout(() => {
      setRightFrameNumber(rightFrameNumber > 93 ? 0 : rightFrameNumber + 1)
    }, frameRates[2] * 12)

    return function destroy() {
      clearTimeout(rightrojectorInterval)
    }
  }, [rightFrameNumber])

  return (
    <div className="triptych-page">
      <div className="triptych">
        <div className="triptych__panel triptych__panel--left">
          <div
            className="triptych__panel triptych__panel--left-overlay"
            style={{
              opacity: Math.random() < 0.2 ? 1 : 0
            }}
          >
            {frameStack(96).map((_, i) => (
              <img
                key={i}
                src={`http://hem.rocks/files/triptych/hall-inserts/IMG_${1229 + i}.jpg`}
                style={{
                  opacity: centerFrameNumber === i ? 1 : 0
                }}
              />
            ))}
          </div>
          {frameStack(129).map((_, i) => (
            <img
              key={i}
              src={`http://hem.rocks/files/triptych/hall/IMG_${1063 + i}.jpg`}
              style={{
                opacity: centerFrameNumber === i ? 1 : 0
              }}
            />
          ))}
        </div>
        <div className="triptych__panel triptych__panel--top">
          <div
            className="triptych__panel triptych__panel--top-overlay"
            style={{
              opacity: Math.random() < 0.3 ? 1 : 0.4
            }}
          >
            {frameStack(80).map((_, i) => (
              <img
                key={i}
                src={`http://hem.rocks/files/triptych/beauty/IMG_${1788 + i}.jpg`}
                style={{
                  opacity: rightFrameNumber === i ? 1 : 0
                }}
              />
            ))}
          </div>
          {frameStack(84).map((_, i) => (
            <img
              key={i}
              src={`http://hem.rocks/files/triptych/bees/IMG_${1869 + i}.jpg`}
              style={{
                opacity: rightFrameNumber === i ? 1 : 0
              }}
            />
          ))}
        </div>
        <div className="triptych__panel triptych__panel--bottom">
          {frameStack(84).map((_, i) => (
            <img
              key={i}
              src={`http://hem.rocks/files/triptych/water/IMG_${1529 + i}.jpg`}
              style={{
                opacity: leftFrameNumber === i ? 1 : 0
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Triptych
