function hexByte (byte) {
  return Math.round(byte).toString(16).padStart(2, '0')
}

export default function toHexColor (r, g, b) {
  return `#${hexByte(r)}${hexByte(g)}${hexByte(b)}`
}
