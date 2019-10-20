import { createCanvas } from '../../functions/canvas'
import { getSoundSize } from '../../functions/sounds'
import { turntable } from '../sounds'

export default createCanvas('turntable', getSoundSize(turntable))
