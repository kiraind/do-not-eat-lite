export default function toDateArray (date) {
  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),

    equals (other) {
      return typeof other === 'object' && (
        this.day === other.day &&
        this.month === other.month &&
        this.year === other.year
      )
    },

    toString () {
      return `${this.day}-${this.month}-${this.year}-`
    }
  }
}
