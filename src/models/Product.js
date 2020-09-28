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
    carbohydratesPct,

    leftAmount
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

    this.leftAmount = leftAmount
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

    leftAmount,

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
      carbohydratesPct,

      leftAmount
    )

    this.percentage = percentage
  }
}
