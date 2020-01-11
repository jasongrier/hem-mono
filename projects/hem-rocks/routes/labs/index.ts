import { createDynamicImport } from '../../../../lib/functions'

export const LabsHome = createDynamicImport(() => import('./LabsHome'))
export const MidstFlipBookLab = createDynamicImport(() => import('./MidstFlipBookLab'))
export const RoomTest = createDynamicImport(() => import('./RoomTest'))
export const FileTaskRunner = createDynamicImport(() => import('./FileTaskRunner'))
