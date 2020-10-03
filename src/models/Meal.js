import sql from 'sql-template-strings'
import { connection as db } from '../database/index.js'

import Item from './Item'
import Product, { IngredientProduct } from './Product.js'
import * as CookingMethod from './CookingMethod.js'

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

    this.products = null
  }

  get isProduct () {
    if (this.products === null) {
      throw new Error('products are not fetched')
    }

    return this.products.length === 1 &&
      this.products[0].part === 1 &&
      this.cookingMethod === CookingMethod.RAW
  }

  async register () {
    try {
      await db.beginTransaction()

      const res = await db.execute(sql`
        INSERT INTO Meals (
          title,
          cookingMethod,
          measureUnit,
          density,
          specificEnergy,
          proteinsPct,
          fatsPct,
          carbohydratesPct,
          leftAmount
        )
        VALUES (
          ${this.title},
          ${this.cookingMethod},
          ${this.measureUnit},
          ${this.density},
          ${this.specificEnergy},
          ${this.proteinsPct},
          ${this.fatsPct},
          ${this.carbohydratesPct},
          0
        );
      `)

      this.id = res.insertId

      // push ingredients
      for (const product of this.products) {
        await product.pushToMeal(this.id)
      }

      await db.commitTransaction()
    } catch (e) {
      console.log('catched')
      console.log(e)
      await db.rollbackTransaction()
      throw e
    }
  }

  async loadProducts () {
    const res = await db.execute(sql`
      SELECT
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

        leftAmount,

        part
      FROM
        Products INNER JOIN MealIncludesProduct
          ON Products.id = MealIncludesProduct.productId
      WHERE mealId = ${this.id};
    `)

    this.products = res.rows.map(row => new IngredientProduct(
      new Product(
        row.id,

        row.title,
        row.barcode,
        row.batchAmount,
        row.measureUnit,
        row.density,

        row.specificEnergy,
        row.proteinsPct,
        row.fatsPct,
        row.carbohydratesPct,

        row.leftAmount
      ),

      row.part
    ))
  }

  static async getFromFridge () {
    const res = await db.execute(sql`
      SELECT *
      FROM Meals;
    `)

    const meals = res.rows.map(row => new Meal(
      row.id,

      row.title,
      row.cookingMethod,
      row.measureUnit,
      row.density,

      row.specificEnergy,
      row.proteinsPct,
      row.fatsPct,
      row.carbohydratesPct,

      row.leftAmount
    ))

    for (const meal of meals) {
      await meal.loadProducts()
    }

    return meals
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

  // todo async pushToEating (eatingId)
}
