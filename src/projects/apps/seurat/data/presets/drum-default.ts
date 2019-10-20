import { createCanvas } from '../../functions/canvas'
import { getSoundSize } from '../../functions/sounds'
import { drum } from '../sounds'

export default createCanvas('drum', getSoundSize(drum))
