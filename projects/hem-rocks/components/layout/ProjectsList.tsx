import React, { ReactElement, useEffect, useState, useCallback } from 'react'
import $ from 'jquery'
import randomHexColor from 'random-hex-color'
import { ChevronButton } from '../../../../lib/components/buttons'
import { GenericProjectLogo, MidstLogo, SeuratLogo, SoundLibraryLogo } from '../svg'
import ProjectsListLogo from './ProjectsListLogo'

function createLogo(component, hoverColor, linkTo, title, transform) {
  return {
    component,
    hoverColor,
    linkTo,
    title,
    transform,
  }
}

const logos = [
  createLogo(MidstLogo, '#FF91AF', '/midst', 'Midst', 'translateX(-1px)'),
  createLogo(SoundLibraryLogo, '#0471a3', '/sound-library', 'Sound Library', 'scale(.7)'),
  createLogo(SeuratLogo, '#a30473', '/seurat', 'Seurat', 'scale(.6)'),
  createLogo(GenericProjectLogo, randomHexColor(), '/relineator', 'Relineator', 'scale(.6) translateX(4px)'),
  createLogo(GenericProjectLogo, randomHexColor(), '/luc', 'Luc: Structured Audio', 'scale(.6) translateX(4px)'),
  createLogo(GenericProjectLogo, randomHexColor(), '/foo', 'Another Project 1', 'scale(.6) translateX(4px)'),
  createLogo(GenericProjectLogo, randomHexColor(), '/foo', 'Another Project 2', 'scale(.6) translateX(4px)'),
  createLogo(GenericProjectLogo, randomHexColor(), '/foo', 'Another Project 3', 'scale(.6) translateX(4px)'),
  createLogo(GenericProjectLogo, randomHexColor(), '/foo', 'Another Project 4', 'scale(.6) translateX(4px)'),
  createLogo(GenericProjectLogo, randomHexColor(), '/foo', 'Another Project 5', 'scale(.6) translateX(4px)'),
  createLogo(GenericProjectLogo, randomHexColor(), '/foo', 'Another Project 6', 'scale(.6) translateX(4px)'),
  createLogo(GenericProjectLogo, randomHexColor(), '/foo', 'Another Project 7', 'scale(.6) translateX(4px)'),
]

function ProjectsList(): ReactElement {
  const [open, setOpen] = useState(false)

  // TODO: Collect this hook, and spacer element into a "SneakyBody" component
  // TODO: New build task: `npm run task npm-publish lib/my-package`
  // TODO: Publish SneakyBody, Displace, Dial, etc to NPM
  useEffect(() => {
    document.body.style.pointerEvents = 'none'
    return function cleanup() {
      document.body.style.pointerEvents = 'all'
    }
  }, [])

  const toggleOpen = useCallback(
    function toggleOpen() {
      setOpen(!open)
    }, [open],
  )

  const scrollDown = useCallback(
    function scrollDown() {
      document.getElementById('projects-list-scroll-target').scrollIntoView({ behavior: 'smooth' })
    }, [open],
  )

  return (
    <>
      <div className={`projects-list-spacer ${open ? 'projects-list-spacer-open' : ''}`} />

      <div className={`projects-list ${open ? ' projects-list-open' : ''} clearfix`}>
        <div className="projects-list-content">

          {logos.map(({ component, hoverColor, linkTo, title, transform }, index: number) => (
            <ProjectsListLogo
              index={index}
              hoverColor={hoverColor}
              key={title}
              linkTo={linkTo}
              logo={component}
              title={title}
              transform={transform}
            />
          ))}
        </div>

          <div className="projects-micronav">
            {!open && (
              <button onClick={toggleOpen}>
                more projects...
              </button>
            )}
            {open && (
              <>
                <button onClick={toggleOpen}>
                  back
                </button>
                <button onClick={scrollDown}>
                  even more...
                </button>
              </>
            )}
          </div>

          {open && (
            <>
              <div className="projects-list-scroll-down-button">
                <ChevronButton onClick={scrollDown} />
              </div>
              <div id="projects-list-scroll-target" />
            </>
          )}
      </div>
    </>
  )
}

export default ProjectsList
