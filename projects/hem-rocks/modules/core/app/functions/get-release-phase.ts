import { parse } from 'qs'
import { PROJECT_CONFIGS as UNTYPED_PROJECT_CONFIGS } from '../../../../config'

const PROJECT_CONFIGS = UNTYPED_PROJECT_CONFIGS as any

function getReleasePhase(currentProject: string): number {
  const params = parse(location.search)
  return (
    params['?releasePhase']
      ? parseInt(params['?releasePhase'] as string, 10)
      : PROJECT_CONFIGS[currentProject].RELEASE_PHASE
  )
}

export default getReleasePhase
