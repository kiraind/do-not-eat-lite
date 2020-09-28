export default class Product {
  constructor (
    id,

    title,
    barcode,
    measureUnit,

    specificEnergy,
    proteinsPct,
    fatsPct,
    carbohydratesPct
  ) {
    this.id = id

    this.title = title
    this.barcode = barcode
    this.measureUnit = measureUnit

    this.specificEnergy = specificEnergy
    this.proteinsPct = proteinsPct
    this.fatsPct = fatsPct
    this.carbohydratesPct = carbohydratesPct
  }
}

export class PresentProduct extends Product {
  constructor (
    id,

    title,
    barcode,
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
      barcode,
      measureUnit,

      specificEnergy,
      proteinsPct,
      fatsPct,
      carbohydratesPct
    )

    this.amount = amount
  }
}
