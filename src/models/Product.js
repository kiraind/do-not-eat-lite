import sql from 'sql-template-strings'
import { connection as db } from '../database/index.js'
import toReadableNumber from '../utils/toReadableNumber.js'
import Item from './Item.js'
import { MeasureUnit1000String, MeasureUnitString } from './MeasureUnit.js'

export default class Product extends Item {
  constructor (
    id,

    title,
    barcode,
    batchAmount,
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
    this.barcode = barcode
    this.batchAmount = batchAmount
    this.measureUnit = measureUnit
    this.density = density

    this.specificEnergy = specificEnergy
    this.proteinsPct = proteinsPct
    this.fatsPct = fatsPct
    this.carbohydratesPct = carbohydratesPct

    this.leftAmount = leftAmount
  }

  get readableBatchAmount () {
    if (this.batchAmount > 1000) {
      return toReadableNumber(this.batchAmount / 1000) + '\u00A0' + // nbsp
        MeasureUnit1000String[this.measureUnit]
    } else {
      return toReadableNumber(this.batchAmount) + '\u00A0' + // nbsp
      MeasureUnitString[this.measureUnit]
    }
  }

  static async getByBarcode (barcode) {
    const res = await db.execute(sql`SELECT * FROM Products WHERE barcode = ${barcode}`)

    if (res.rows.length === 0) {
      return null
    } else {
      return new Product(
        res.rows[0].id,

        res.rows[0].title,
        res.rows[0].barcode,
        res.rows[0].batchAmount,
        res.rows[0].measureUnit,
        res.rows[0].density,

        res.rows[0].specificEnergy,
        res.rows[0].proteinsPct,
        res.rows[0].fatsPct,
        res.rows[0].carbohydratesPct,

        res.rows[0].leftAmount ?? null
      )
    }
  }

  static async registerNew (
    title,

    barcode,
    batchAmount,
    measureUnit,
    density,

    specificEnergy,
    proteinsPct,
    fatsPct,
    carbohydratesPct
  ) {
    const res = await db.execute(sql`
      INSERT INTO Products (
        title,
        barcode,
        batchAmount,
        measureUnit,
        density,
        specificEnergy,
        proteinsPct,
        fatsPct,
        carbohydratesPct
      )
      VALUES (
        ${title},
        ${barcode},
        ${batchAmount},
        ${measureUnit},
        ${density},
        ${specificEnergy},
        ${proteinsPct},
        ${fatsPct},
        ${carbohydratesPct}
      )
    `)

    return new Product(
      res.insertId,
      title,
      barcode,
      batchAmount,
      measureUnit,
      density,
      specificEnergy,
      proteinsPct,
      fatsPct,
      carbohydratesPct,
      0
    )
  }
}

export class IngredientProduct extends Product {
  constructor (
    product,

    part
  ) {
    super(
      product.id,

      product.title,
      product.barcode,
      product.batchAmount,
      product.measureUnit,
      product.density,

      product.specificEnergy,
      product.proteinsPct,
      product.fatsPct,
      product.carbohydratesPct,

      product.leftAmount
    )

    this.part = part
  }
}

export class ProductItem extends Product {
  constructor (
    product,

    amount
  ) {
    super(
      product.id,

      product.title,
      product.barcode,
      product.batchAmount,
      product.measureUnit,
      product.density,

      product.specificEnergy,
      product.proteinsPct,
      product.fatsPct,
      product.carbohydratesPct,

      product.leftAmount
    )

    this.amount = amount
  }

  merge (other) {
    return new ProductItem(this, this.amount + other.amount)
  }

  async pushToEating (eatingId) {
    await db.execute(sql`
      INSERT INTO EatingIncludesMeal (
        eatingId,
        mealId,
        amount
      )
      SELECT 
        ${eatingId},
        mealId,
        ${this.amount}
      FROM MealIncludesProduct
      WHERE productId = ${this.id} AND part = 1;
    `)
  }
}
