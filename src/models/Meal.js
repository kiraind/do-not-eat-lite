import Item from './Item'

export default class Meal extends Item {
  constructor (
    id,

    title,
    cookingMethod,
    measureUnit,
    density,

    specificEnergy,
    proteinsPct,
    fatsPct,
    carbohydratesPct,

    leftAmount
  ) {
    super()

    this.id = id

    this.title = title
    this.cookingMethod = cookingMethod
    this.measureUnit = measureUnit
    this.density = density

    this.specificEnergy = specificEnergy
    this.proteinsPct = proteinsPct
    this.fatsPct = fatsPct
    this.carbohydratesPct = carbohydratesPct

    this.leftAmount = leftAmount

    this._products = null
  }
}

export class MealItem extends Meal {
  constructor (meal, amount) {
    super(
      meal.id,

      meal.title,
      meal.cookingMethod,
      meal.measureUnit,
      meal.density,

      meal.specificEnergy,
      meal.proteinsPct,
      meal.fatsPct,
      meal.carbohydratesPct,

      meal.leftAmount
    )

    this.amount = amount
  }

  merge (other) {
    return new MealItem(this, this.amount + other.amount)
  }
}
