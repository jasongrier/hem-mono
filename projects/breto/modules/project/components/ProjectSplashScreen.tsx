import React, { ReactElement, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { newProject, openProject } from '../'
import { RootState } from '../../../index'

function ProjectSplashScreen(): ReactElement {
  const { currentProject } = useSelector((state: RootState) => ({
    currentProject: state.project.currentProject,
  }))

  const dispatch = useDispatch()

  const newProjectOnClick = useCallback(
    function openProjectOnClickFn() {
      dispatch(newProject())
    }, [],
  )

  const openProjectOnClick = useCallback(
    function openProjectOnClickFn() {
      dispatch(openProject())
    }, [],
  )

  return (
    <div className="project-splash-screen">
      <ul>
        <li>
          <button onClick={ openProjectOnClick }>
            <i className="fa-icon fas fa-folder-open"></i>
            Open Project
          </button>
        </li>
        <li>
        <button onClick={ newProjectOnClick }>
            <i className="fa-icon fas fa-plus-circle"></i>
            New Project
          </button>
        </li>
      </ul>
    </div>
  )
}

export default ProjectSplashScreen
