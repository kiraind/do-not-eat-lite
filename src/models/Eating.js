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
}
