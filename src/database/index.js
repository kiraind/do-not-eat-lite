import sql from 'sql-template-strings'

import Connection from './Connection.js'

export const connection = new Connection('do-not-eat-lite.db')

export async function init () {
  // Table of eatings
  await connection.execute(sql`
    CREATE TABLE IF NOT EXISTS Eatings (
      id        INTEGER PRIMARY KEY AUTOINCREMENT,
      date      TEXT NOT NULL,
      latitude  REAL,
      longitude REAL,
      label     INTEGER NOT NULL
    )
  `)

  // Table of of known meals
  await connection.execute(sql`
    CREATE TABLE IF NOT EXISTS Meals (
      id               INTEGER PRIMARY KEY AUTOINCREMENT,

      title            TEXT NOT NULL,
      cookingMethod    INTEGER NOT NULL,
      measureUnit      INTEGER NOT NULL,

      specificEnergy   REAL NOT NULL,
      proteinsPct      REAL NOT NULL,
      fatsPct          REAL NOT NULL,
      carbohydratesPct REAL NOT NULL
    )
  `)

  // n-n relation Eatings-Meals
  await connection.execute(sql`
    CREATE TABLE IF NOT EXISTS EatingIncludesMeal (
      eatingId INTEGER NOT NULL,
      mealId   INTEGER NOT NULL,
      amount   REAL NOT NULL,

      FOREIGN KEY(eatingId) REFERENCES Eatings(id),
      FOREIGN KEY(mealId) REFERENCES Meals(id)
    )
  `)

  // Table of known products
  await connection.execute(sql`
    CREATE TABLE IF NOT EXISTS Products (
      id               INTEGER PRIMARY KEY AUTOINCREMENT,

      title            TEXT NOT NULL,
      barcode          TEXT,
      batchAmount      REAL,
      measureUnit      INTEGER NOT NULL,

      specificEnergy   REAL NOT NULL,
      proteinsPct      REAL NOT NULL,
      fatsPct          REAL NOT NULL,
      carbohydratesPct REAL NOT NULL
    )
  `)

  // n-n relation Meals-Products
  await connection.execute(sql`
    CREATE TABLE IF NOT EXISTS MealIncludesProduct (
      mealId     INTEGER NOT NULL,
      productId  INTEGER NOT NULL,
      amount     REAL NOT NULL,

      FOREIGN KEY(mealId) REFERENCES Meals(id),
      FOREIGN KEY(productId) REFERENCES Products(id)
    )
  `)

  // Relation of meal being in frigde
  await connection.execute(sql`
    CREATE TABLE IF NOT EXISTS MealInFridge (
      mealId     INTEGER NOT NULL,
      amount     REAL NOT NULL,

      FOREIGN KEY(mealId) REFERENCES Meals(id)
    )
  `)

  // Relation of product being in frigde
  await connection.execute(sql`
    CREATE TABLE IF NOT EXISTS MealIncludesProduct (
      productId  INTEGER NOT NULL,
      amount     REAL NOT NULL,

      FOREIGN KEY(productId) REFERENCES Products(id)
    )
  `)
}
