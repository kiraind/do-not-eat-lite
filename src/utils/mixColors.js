import parseHexColor from './parseHexColor.js'
import toHexColor from './toHexColor.js'

export default function mixColors (...colors) {
  const parsed = colors.map(color => parseHexColor(color))

  const mixed = [0, 1, 2].map(
    part => parsed.reduce(
      (sum, curr) => sum + curr[part] ** 2,
      0
    ) / colors.length
  ).map(Math.sqrt)

  return toHexColor(...mixed)
}
