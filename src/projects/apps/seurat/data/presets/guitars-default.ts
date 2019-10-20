import { createCanvas } from '../../functions/canvas'
import { getSoundSize } from '../../functions/sounds'
import { guitars } from '../sounds'

export default createCanvas('guitars', getSoundSize(guitars))
