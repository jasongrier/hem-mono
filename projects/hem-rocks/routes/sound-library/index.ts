import { createDynamicImport } from '../../../../lib/functions'

export const SoundLibrary = createDynamicImport(() => import('./SoundLibrary'))
