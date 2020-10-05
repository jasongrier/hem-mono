import { IProject } from '../'

function createProject(title, fullPath): IProject {
  return {
    clips: [],
    files: [],
    fullPath,
    title,
  }
}

export default createProject
