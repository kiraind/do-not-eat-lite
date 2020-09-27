export default function parseHexColor (color) {
  return [
    parseInt(color.substr(1, 2), 16), // r
    parseInt(color.substr(3, 2), 16), // g
    parseInt(color.substr(5, 2), 16) // b
  ]
}
