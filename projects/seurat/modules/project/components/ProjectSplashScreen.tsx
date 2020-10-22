import React, { ReactElement, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { recentProjectsRequest, newProject, openProject } from '../'
import { RootState } from '../../../index'

function ProjectSplashScreen(): ReactElement {
  const { recentProjects } = useSelector((state: RootState) => ({
    recentProjects: state.project.recentProjects,
  }))

  const dispatch = useDispatch()

  useEffect(function init() {
    dispatch(recentProjectsRequest())
  }, [])

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
      <h2>Recent Projects</h2>
      <ul>
        { recentProjects.map(project => (
          <li key={project.id}>{ project.title }</li>
        ))}
      </ul>
    </div>
  )
}

export default ProjectSplashScreen
