import { createDynamicImport } from '../../../../lib/functions'

export const LabsHome = createDynamicImport(() => import('./LabsHome'))
export const MidstFlipBookLab = createDynamicImport(() => import('./MidstFlipBookLab'))
