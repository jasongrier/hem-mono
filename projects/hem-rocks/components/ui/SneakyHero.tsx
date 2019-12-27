import React, { PropsWithChildren, ReactElement, useEffect } from 'react'
import classnames from 'classnames'

interface IProps {
  className?: string
  defaultStyles?: boolean
  spacerClassName?: string
}

function SneakyHero({ children, className, defaultStyles = true, spacerClassName }: PropsWithChildren<IProps>): ReactElement {
  // TODO: New build task: `npm run task npm-publish lib/my-package`
  // TODO: Prep: No redux just yet, or else state boldly that Redux needs to be separately installed. Use the defaultStyles pattern. Use the controlled/uncontrolled autoswitch pattern
  // TODO: NPM steps: Manually place component in lib/packages, create a package.json there with only the needed deps, React goes in dev dependencies, no Redux, create a .d.ts and doc blocks, docs generator, tests and code coverage, prettier, readme file, license file, (lint for all this), and bundle with ROLLUP, then what??
  // TODO: https://codeburst.io/deploy-react-component-as-an-npm-library-d396efc25122
  // TODO: Publish sneaky-hero, Displace, Dial, etc to NPM
  useEffect(() => {
    document.body.style.pointerEvents = 'none'
    return function cleanup() {
      document.body.style.pointerEvents = 'all'
    }
  }, [])

  const style = `
    .sneaky-hero-spacer {
      width: 100vw;
    }

    .sneaky-hero {
      position: fixed;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100vw;
    }

    .default-sneaky-hero-spacer {
      height: 80vh;
    }

    .default-sneaky-hero {
      display: flex;
      top: 0;
      height: 80vh;
      justify-content: center;
      align-items: center;
    }

    .default-sneaky-hero .sneaky-hero-content {
      width: 1024px;
      margin: 0 auto;
    }

    @media screen and (max-width: 1023px) {
      .default-sneaky-hero .sneaky-hero-content {
        width: 768px;
        margin: 0 auto;
      }
    }

    @media screen and (max-width: 767px) {
      .sneaky-hero-spacer {
        display: none
      }

      .sneaky-hero {
        position: static;
      }

      .default-sneaky-hero {
        height: auto;
      }

      .default-sneaky-hero .sneaky-hero-content {
        width: 100vw;
        margin: 0;
      }
    }
  `

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }}/>
      <div className={classnames({
        spacerClassName: spacerClassName || className,
        'sneaky-hero-spacer': true,
        'default-sneaky-hero-spacer': defaultStyles,
      })} />
      <div className={classnames({
        className,
        'sneaky-hero': true,
        'default-sneaky-hero': defaultStyles,
      })}>
        <div className="sneaky-hero-content">
          { children }
        </div>
      </div>
    </>
  )
}

export default SneakyHero
