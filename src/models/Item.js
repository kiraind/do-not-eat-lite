import toReadableNumber from '../utils/toReadableNumber.js'
import { MeasureUnit1000String, MeasureUnitString } from './MeasureUnit.js'

export default class Item {
  get readableLeftAmount () {
    if (this.leftAmount > 1000) {
      return toReadableNumber(this.leftAmount / 1000) + '\u00A0' + // nbsp
        MeasureUnit1000String[this.measureUnit]
    } else {
      return toReadableNumber(this.leftAmount) + '\u00A0' + // nbsp
      MeasureUnitString[this.measureUnit]
    }
  }

  get measureUnitString () {
    return MeasureUnitString[this.measureUnit]
  }

  toCalories (amount) {
    return this.specificEnergy / 100 * amount
  }
}
