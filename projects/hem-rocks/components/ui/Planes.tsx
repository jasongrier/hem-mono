import React, { ReactElement, useEffect, useState } from 'react'

interface IPlane {
  rotateX: number
  rotateY: number
  rotateZ: number
  scale: number
}

interface ICoords {
  x: number
  y: number
  z: number
}

interface IProps {
  animationSpeed: number
  cameraPosition: ICoords
  lightPosition: ICoords
  sphereCount: 0
}

// TODO: Move to common
function Planes(): ReactElement {
  const [planes, setPlanes] = useState([] as IPlane[])

  useEffect(() => {
    const planes = []
    for (let i = 0; i < 10; i ++) {
      planes.push({
        rotateX: Math.random() * 90 - 45,
        rotateY: Math.random() * 90 - 45,
        rotateZ: Math.random() * 90 - 45,
        scale: Math.random() * 1,
      })
    }
    setPlanes(planes)
  }, [])

  const style = `
    .planes {
      position: relative;
      perspective: 100px;
      overflow: hidden;
      background: linear-gradient(to top,  #cccccc 0%, #e5e5e5 100%);
    }

    .planes-frame {
      position: absolute;
      top: -1000px;
      perspective: 100px;
    }

    .planes-plane {
      width: 800px;
      height: 400px;
      transform-style: preserve-3d;
      background: linear-gradient(to right,  #000000 0%, #e5e5e5 100%);
    }

    .planes-circle {
      display: block;
      position: absolute;
      top: 1200px;
      left: 0;
      background: black;
      border-radius: 100%;
      height: 1000px;
      width: 1000px;
      margin: 0;
      background: radial-gradient(circle at 100px 100px, #eee, #000);
    }
  `

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: style}} />
      <div className="planes">
        <div className="planes-frame">
          <figure className="planes-circle"></figure>

          {planes.map((plane, index) => (
            <div
              className="planes-plane"
              key={index}
              style={{
                transform: `
                  rotateX(${plane.rotateX}deg)
                  rotateY(${plane.rotateY}deg)
                  rotateZ(${plane.rotateZ}deg)
                  scale(${plane.scale})
                `
              }}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Planes
