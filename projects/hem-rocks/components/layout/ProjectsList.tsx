import React, { Dispatch, ReactElement, SetStateAction, useEffect, useState, useCallback } from 'react'
import randomHexColor from 'random-hex-color'
import { ChevronButton } from '../../../../lib/components/buttons'
import { GenericProjectLogo, MidstLogo, SeuratLogo, SoundLibraryLogo } from '../svg'
import ProjectsListLogo from './ProjectsListLogo'

interface IProps {
  hasResetButton?: boolean
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

function createLogo(component, hoverColor, linkTo, title, tipContent, transform) {
  return {
    component,
    hoverColor,
    linkTo,
    tipContent,
    title,
    transform,
  }
}

const logos = [
  createLogo(MidstLogo, '#FF91AF', '/midst', 'Midst',
    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse justo enim, pharetra mattis pretium vitae, pharetra vitae orci. Ut sit amet iaculis dui.</p><p>Suspendisse posuere nulla hendrerit lectus feugiat imperdiet. Nulla eu hendrerit ipsum. Pellentesque ac dictum diam, sed imperdiet augue. Phasellus sagittis nisl sit amet purus ultricies scelerisque.</p>',
  'translateX(-1px)'),

  createLogo(SoundLibraryLogo, '#0471a3', '/sound-library', 'Sound Library',
    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse justo enim, pharetra mattis pretium vitae, pharetra vitae orci. Ut sit amet iaculis dui.</p><p>Suspendisse posuere nulla hendrerit lectus feugiat imperdiet. Nulla eu hendrerit ipsum. Pellentesque ac dictum diam, sed imperdiet augue. Phasellus sagittis nisl sit amet purus ultricies scelerisque.</p>',
  'scale(.7)'),

  createLogo(SeuratLogo, '#a30473', '/seurat', 'Seurat',
    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse justo enim, pharetra mattis pretium vitae, pharetra vitae orci. Ut sit amet iaculis dui.</p><p>Suspendisse posuere nulla hendrerit lectus feugiat imperdiet. Nulla eu hendrerit ipsum. Pellentesque ac dictum diam, sed imperdiet augue. Phasellus sagittis nisl sit amet purus ultricies scelerisque.</p>',
  'scale(.6)'),

  createLogo(GenericProjectLogo, randomHexColor(), '/relineator', 'Relineator',
    'Bar',
  'scale(.6) translateX(4px)'),

  createLogo(GenericProjectLogo, randomHexColor(), '/luc', 'Luc: Structured Audio',
    'Bar',
  'scale(.6) translateX(4px)'),

  createLogo(GenericProjectLogo, randomHexColor(), '/foo', 'Another Project 1',
    'Bar',
  'scale(.6) translateX(4px)'),

  createLogo(GenericProjectLogo, randomHexColor(), '/foo', 'Another Project 2',
    'Bar',
  'scale(.6) translateX(4px)'),

  createLogo(GenericProjectLogo, randomHexColor(), '/foo', 'Another Project 3',
    'Bar',
  'scale(.6) translateX(4px)'),

  createLogo(GenericProjectLogo, randomHexColor(), '/foo', 'Another Project 4',
    'Bar',
  'scale(.6) translateX(4px)'),

  createLogo(GenericProjectLogo, randomHexColor(), '/foo', 'Another Project 5',
    'Bar',
  'scale(.6) translateX(4px)'),

  createLogo(GenericProjectLogo, randomHexColor(), '/foo', 'Another Project 6',
    'Bar',
  'scale(.6) translateX(4px)'),

  createLogo(GenericProjectLogo, randomHexColor(), '/foo', 'Another Project 7',
    'Bar',
  'scale(.6) translateX(4px)'),
]

function ProjectsList({
  hasResetButton = false,
  open: propsOpen = null,
  setOpen: setPropsOpen = null,
}: IProps): ReactElement {
  const [stateOpen, setStateOpen] = useState(false)
  const [chevronClicked, setChevronClicked] = useState(false)

  let open, setOpen
  if (propsOpen !== null && setPropsOpen !== null) {
    open = propsOpen
    setOpen = setPropsOpen
  }

  else {
    open = stateOpen
    setOpen = setStateOpen
  }

  // TODO: Collect this hook, and spacer element into a "SneakyBody" component
  // TODO: New build task: `npm run task npm-publish lib/my-package`
  // TODO: Publish SneakyBody, Displace, Dial, etc to NPM
  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0)
    }
    document.body.style.pointerEvents = 'none'
    return function cleanup() {
      document.body.style.pointerEvents = 'all'
    }
  }, [])

  useEffect(() => {
    if (!open) {
      document.getElementById('react-root').scrollIntoView({ behavior: 'smooth' })
    }
    document.addEventListener('scroll', bodyOnScroll)
    return function cleanup() {
      document.removeEventListener('scroll', bodyOnScroll)
    }
  }, [open])

  const bodyOnScroll = useCallback(
    function bodyOnScroll() {
      if (open) {
        setChevronClicked(true)
      }
    }, [open],
  )

  const openAndAddChevron = useCallback(
    function openAndAddChevron() {
      setOpen(true)
      setChevronClicked(false)
    }, [open],
  )

  const resetList = useCallback(
    function resetList() {
      setOpen(false)
      setChevronClicked(false)
      document.getElementById('projects-list-top-target').scrollIntoView({ behavior: 'smooth' })
    }, [],
  )

  const scrollDown = useCallback(
    function scrollDown() {
      document.getElementById('projects-list-scroll-target').scrollIntoView({ behavior: 'smooth' })
    }, [open],
  )

  const onChevronClicked = useCallback(
    function onChevronClicked() {
      scrollDown()
      setChevronClicked(true)
    }, [],
  )

  return (
    <>
      <div
        className={`projects-list-spacer ${open ? 'projects-list-spacer-open' : ''}`}
        id="projects-list-top-target"
      />

      <div className={`projects-list ${open ? ' projects-list-open' : ''} clearfix`}>
        <div className="projects-list-content">
          {logos.map(({
            component,
            hoverColor,
            linkTo,
            tipContent,
            title,
            transform
          }, index: number) => (
            <ProjectsListLogo
              hoverColor={hoverColor}
              index={index}
              key={title}
              linkTo={linkTo}
              logo={component}
              tipContent={tipContent}
              title={title}
              transform={transform}
            />
          ))}
        </div>
          <div className="projects-micronav">
            {!open && (
              <button onClick={openAndAddChevron}>
                more projects...
              </button>
            )}
            {open && hasResetButton && (
              <button onClick={resetList}>
                close
              </button>
            )}
          </div>

          {open && !chevronClicked && (
            <div className="projects-list-scroll-down-button">
              <ChevronButton onClick={onChevronClicked} />
            </div>
          )}

          <div id="projects-list-scroll-target" />
      </div>
    </>
  )
}

export default ProjectsList
