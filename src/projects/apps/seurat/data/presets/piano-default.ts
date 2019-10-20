import { createCanvas } from '../../functions/canvas'
import { getSoundSize } from '../../functions/sounds'
import { piano } from '../sounds'

export default createCanvas('piano', getSoundSize(piano))
