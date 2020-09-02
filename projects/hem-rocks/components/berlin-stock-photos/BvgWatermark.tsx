import React, { ReactElement } from 'react'
import { assetHostHostname } from '../../functions'

interface IProps {
  width: number
}

const styleSheet = `
  .bvg-watermark {
    position: relative;
    overflow: hidden;
    opacity: 0.7;
  }

  .bvg-watermark .bb-gate-cluster {
    position: relative;
    float: left;
    width: 25%;
    height: 25%;
    margin-top: -50px;
    margin-bottom: 40px;
    box-sizing: border-box;
  }

  .bvg-watermark .bb-gate {
    position: absolute;
    width: 100%;
    height: 37%;
    box-sizing: border-box;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }

  .bvg-watermark .bb-gate-top {
    top: 0;
    left: 0;
  }

  .bvg-watermark .bb-gate-right {
    top: 0;
    left: 100%;
    transform: rotate(90deg);
    transform-origin: top left;
  }

  .bvg-watermark .bb-gate-bottom {
    bottom: 0;
    left: 0;
    transform: rotate(180deg);
    transform-origin: center;
  }

  .bvg-watermark .bb-gate-left {
    top: 100%;
    left: 0;
    transform: rotate(-90deg);
    transform-origin: top left;
  }
`

function BvgWatermark({ width }: IProps): ReactElement {
  const clusters = new Array(16).fill('')
  const assetHost = assetHostHostname()

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styleSheet }} />
      <div className="bvg-watermark">
        <div 
          className="bvg-gate-clusters"
          style={{
            width: width + 'px',
            height: width + 'px',
          }}
        >
          { clusters.map(() =>
            <div className="bb-gate-cluster">
              <div 
                className="bb-gate bb-gate-top" 
                style={{
                  backgroundImage: `url(${assetHost}/berlin-stock-photos/site/images/bvg.png)`,
                }}
              />
              <div 
                className="bb-gate bb-gate-right" 
                style={{
                  backgroundImage: `url(${assetHost}/berlin-stock-photos/site/images/bvg.png)`,
                }}
              />
              <div 
                className="bb-gate bb-gate-bottom" 
                style={{
                  backgroundImage: `url(${assetHost}/berlin-stock-photos/site/images/bvg.png)`,
                }}
              />
              <div 
                className="bb-gate bb-gate-left" 
                style={{
                  backgroundImage: `url(${assetHost}/berlin-stock-photos/site/images/bvg.png)`,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default BvgWatermark
