export default function toReadableNumber (number) {
  return (Math.round(number * 100) / 100).toString().replace('.', ',')
}
