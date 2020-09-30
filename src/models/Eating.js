import sql from 'sql-template-strings'
import { connection as db } from '../database/index.js'
import Meal, { MealItem } from './Meal.js'

export default class Eating {
  constructor (
    id,
    date,
    latitude,
    longitude,
    label
  ) {
    this.id = id
    this.date = date
    this.latitude = latitude
    this.longitude = longitude
    this.label = label

    this.meals = null
  }

  get kcal () {
    if (this.meals === null) {
      return NaN
    }

    return this.meals.reduce(
      (sum, meal) => sum + meal.toCalories(meal.amount),
      0
    )
  }

  static async registerNew (
    date,
    latitude,
    longitude,
    label
  ) {
    const res = await db.execute(sql`
      INSERT INTO Eatings (
        date,
        latitude,
        longitude,
        label
      )
      VALUES (
        ${date.toISOString()},
        ${latitude},
        ${longitude},
        ${label}
      )
    `)

    return new Eating(
      res.insertId,
      date,
      latitude,
      longitude,
      label
    )
  }

  async loadMeals () {
    const res = await db.execute(sql`
      SELECT
        id,

        title,
        cookingMethod,
        measureUnit,
        density,

        specificEnergy,
        proteinsPct,
        fatsPct,
        carbohydratesPct,

        leftAmount,

        --
        amount
      FROM
        Meals INNER JOIN EatingIncludesMeal
          ON Meals.id = EatingIncludesMeal.mealId
      WHERE
        EatingIncludesMeal.eatingId = ${this.id};
    `)

    this.meals = res.rows.map(row => new MealItem(
      new Meal(
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
      ),

      row.amount
    ))
  }

  static async getRecent (count, offset = 0) {
    const res = await db.execute(sql`
      SELECT
        id,
        date,
        latitude,
        longitude,
        label
      FROM Eatings
      ORDER BY
        date DESC
      LIMIT ${offset}, ${count};
    `)

    const eatings = res.rows.map(row => new Eating(
      row.id,
      new Date(row.date),
      row.latitude,
      row.longitude,
      row.label
    ))

    for (const eating of eatings) {
      await eating.loadMeals()
    }

    return eatings
  }
}
