import sql from 'sql-template-strings'
import { connection as db } from '../database/index.js'

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

    this._meals = null
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
}
