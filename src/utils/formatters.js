const paddingChar = '.'

export const jsonToMessage = obj => {
  if (!obj) return

  const keys = Object.keys(obj)
  keys.sort()

  let msg = ''
  msg += '```\n'
  for (const k of keys) {
    const paddingLength = 30 - k.length
    const value = typeof obj[k] === 'object' ? JSON.stringify(obj[k]) : obj[k]
    msg += `${k}${Array.apply(null, Array(paddingLength)).map(() => paddingChar).join('')}${value}\n`
  }
  msg += '```'

  return msg
}
