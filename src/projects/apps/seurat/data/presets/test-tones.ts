import { createCanvas } from '../../functions/canvas'
import { getSoundSize } from '../../functions/sounds'
import { testTones } from '../sounds'

export default createCanvas('test-tones', getSoundSize(testTones))
