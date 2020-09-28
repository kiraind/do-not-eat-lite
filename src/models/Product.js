export default class Product {
  constructor (
    id,

    title,
    barcode,
    batchAmount,
    measureUnit,

    specificEnergy,
    proteinsPct,
    fatsPct,
    carbohydratesPct
  ) {
    this.id = id

    this.title = title
    this.barcode = barcode
    this.batchAmount = batchAmount
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
    batchAmount,
    measureUnit,

    specificEnergy,
    proteinsPct,
    fatsPct,
    carbohydratesPct,

    percentage
  ) {
    super(
      id,

      title,
      barcode,
      batchAmount,
      measureUnit,

      specificEnergy,
      proteinsPct,
      fatsPct,
      carbohydratesPct
    )

    this.percentage = percentage
  }
}
