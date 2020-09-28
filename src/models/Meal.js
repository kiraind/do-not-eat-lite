export default class Meal {
  constructor (
    id,

    title,
    cookingMethod,
    measureUnit,

    specificEnergy,
    proteinsPct,
    fatsPct,
    carbohydratesPct,

    leftAmount
  ) {
    this.id = id

    this.title = title
    this.cookingMethod = cookingMethod
    this.measureUnit = measureUnit

    this.specificEnergy = specificEnergy
    this.proteinsPct = proteinsPct
    this.fatsPct = fatsPct
    this.carbohydratesPct = carbohydratesPct

    this.leftAmount = leftAmount

    this._products = null
  }
}
