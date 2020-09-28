export default class Meal {
  constructor (
    id,

    title,
    cookingMethod,
    measureUnit,

    specificEnergy,
    proteinsPct,
    fatsPct,
    carbohydratesPct
  ) {
    this.id = id

    this.title = title
    this.cookingMethod = cookingMethod
    this.measureUnit = measureUnit

    this.specificEnergy = specificEnergy
    this.proteinsPct = proteinsPct
    this.fatsPct = fatsPct
    this.carbohydratesPct = carbohydratesPct

    this._products = null
  }
}

export class PresentMeal extends Meal {
  constructor (
    id,

    title,
    cookingMethod,
    measureUnit,

    specificEnergy,
    proteinsPct,
    fatsPct,
    carbohydratesPct,

    amount
  ) {
    super(
      id,

      title,
      cookingMethod,
      measureUnit,

      specificEnergy,
      proteinsPct,
      fatsPct,
      carbohydratesPct
    )

    this.amount = amount
  }
}
