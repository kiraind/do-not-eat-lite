export default function toReadableTime (date) {
  return date.getHours().toString().padStart(2, '0') +
    ':' + date.getMinutes().toString().padStart(2, '0')
}
