const roll = sides => Math.floor(Math.random() * Math.floor(sides)) + 1

export default (x = []) => {
  if (!x || !x.length) {
    return
  }

  const l = x.length
  const i = roll(l)
  return x[i - 1]
}
