import sql from 'sql-template-strings'
import { connection as db } from '../database/index.js'

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
        res.rows[0].proteinsPct,
        res.rows[0].specificEnergy,
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
      specificEnergy,
      proteinsPct,
      fatsPct,
      carbohydratesPct,
      0
    )
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
