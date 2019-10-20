import { createCanvas } from '../../functions/canvas'
import { getSoundSize } from '../../functions/sounds'
import { bells } from '../sounds'

export default createCanvas('bells', getSoundSize(bells))
