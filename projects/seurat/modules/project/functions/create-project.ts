import uuid from 'uuid/v1'
import { IProject } from '../'

function createProject(title, fullPath): IProject {
  return {
    clips: [],
    files: [],
    fullPath,
    id: uuid(),
    sections: [],
    title,
  }
}

export default createProject
