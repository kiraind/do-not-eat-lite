import sql from 'sql-template-strings'

import Connection from './Connection.js'

export const connection = new Connection('do-not-eat-lite.db')

export async function init () {
  // 1 Table of eatings
  await connection.execute(sql`
    CREATE TABLE IF NOT EXISTS Eatings (
      id        INTEGER PRIMARY KEY AUTOINCREMENT,
      date      TEXT NOT NULL,
      latitude  REAL,
      longitude REAL,
      label     INTEGER NOT NULL
    );
  `)
  await connection.execute(sql`
    CREATE INDEX eatings_by_date 
    ON Eatings(date);
  `)

  // 2 Table of of known meals
  await connection.execute(sql`
    CREATE TABLE IF NOT EXISTS Meals (
      id               INTEGER PRIMARY KEY AUTOINCREMENT,

      title            TEXT NOT NULL,
      cookingMethod    INTEGER NOT NULL,
      measureUnit      INTEGER NOT NULL,
      density          REAL NOT NULL,

      specificEnergy   REAL NOT NULL,
      proteinsPct      REAL NOT NULL,
      fatsPct          REAL NOT NULL,
      carbohydratesPct REAL NOT NULL,

      leftAmount       REAL NOT NULL DEFAULT 0
    );
  `)
  await connection.execute(sql`
    CREATE INDEX meals_by_title
    ON Meals(title);
  `)
  await connection.execute(sql`
    CREATE INDEX meals_by_left_amount
    ON Meals(leftAmount);
  `)

  // 3 n-n relation Eatings-Meals
  await connection.execute(sql`
    CREATE TABLE IF NOT EXISTS EatingIncludesMeal (
      eatingId INTEGER NOT NULL,
      mealId   INTEGER NOT NULL,
      amount   REAL NOT NULL,

      FOREIGN KEY(eatingId) REFERENCES Eatings(id),
      FOREIGN KEY(mealId) REFERENCES Meals(id)
    );
  `)
  await connection.execute(sql`
    CREATE INDEX eating_includes_meal_by_eating_id
    ON EatingIncludesMeal(eatingId);
  `)
  await connection.execute(sql`
    CREATE INDEX eating_includes_meal_by_meal_id
    ON EatingIncludesMeal(mealId);
  `)

  // 4 Table of known products
  await connection.execute(sql`
    CREATE TABLE IF NOT EXISTS Products (
      id               INTEGER PRIMARY KEY AUTOINCREMENT,

      title            TEXT NOT NULL,
      barcode          TEXT,
      batchAmount      REAL,
      measureUnit      INTEGER NOT NULL,
      density          REAL NOT NULL,

      specificEnergy   REAL NOT NULL,
      proteinsPct      REAL NOT NULL,
      fatsPct          REAL NOT NULL,
      carbohydratesPct REAL NOT NULL,

      leftAmount       REAL NOT NULL DEFAULT 0
    );
  `)
  await connection.execute(sql`
    CREATE INDEX products_by_title
    ON Products(title);
  `)
  await connection.execute(sql`
    CREATE INDEX products_by_left_amount
    ON Products(leftAmount);
  `)

  // 5 n-n relation Meals-Products
  await connection.execute(sql`
    CREATE TABLE IF NOT EXISTS MealIncludesProduct (
      mealId     INTEGER NOT NULL,
      productId  INTEGER NOT NULL,
      part       REAL NOT NULL,

      FOREIGN KEY(mealId) REFERENCES Meals(id),
      FOREIGN KEY(productId) REFERENCES Products(id)
    );
  `)
  await connection.execute(sql`
    CREATE INDEX meal_includes_product_by_meal_id
    ON MealIncludesProduct(mealId);
  `)
  await connection.execute(sql`
    CREATE INDEX meal_includes_product_by_product_id
    ON MealIncludesProduct(productId);
  `)

  // Trigger for creating meals from raw products
  await connection.execute(sql`
    CREATE TRIGGER auto_meal AFTER INSERT 
    ON Products
    BEGIN
      INSERT INTO Meals (
        title,

        cookingMethod,
        measureUnit,
        density,

        specificEnergy,
        proteinsPct,
        fatsPct,
        carbohydratesPct
      )
      VALUES (
        new.title,

        0, -- RAW
        new.measureUnit,
        new.density,

        new.specificEnergy,
        new.proteinsPct,
        new.fatsPct,
        new.carbohydratesPct
      );

      INSERT INTO MealIncludesProduct (
        mealId,
        productId,
        part
      )
      VALUES (
        last_insert_rowid(),
        new.id,
        1
      );
    END;
  `)

  // Trigger for updating amount of raw-product-meals
  await connection.execute(sql`
    CREATE TRIGGER auto_meal_sync AFTER UPDATE 
    ON Meals
    BEGIN
      UPDATE Products
      SET
        leftAmount = new.leftAmount
      WHERE
        Products.id = (
          SELECT productId FROM MealIncludesProduct WHERE mealId = new.id AND part = 1
        );
    END;
  `)

  // Trigger for updating amount of raw-product-meals
  await connection.execute(sql`
    CREATE TRIGGER auto_product_sync AFTER UPDATE 
    ON Products
    BEGIN
      UPDATE Meals
      SET
        leftAmount = new.leftAmount
      WHERE
        Meals.id = (
          SELECT mealId FROM MealIncludesProduct WHERE productId = new.id AND part = 1
        );
    END;
  `)
}
