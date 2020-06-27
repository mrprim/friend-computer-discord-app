import getRandom, { names } from '@mrprim/random-rpg-stuff'
import sample from '../utils/sample'

export default (msg, data) => {
  const args = data.split(' ')
  const name = getName(args)
  const val = getRandom(name, { details: true, format: s => s.toLowerCase() })
  let message = ''
  message += '```ini\n'
  message += `[${val.name.split('.').join(' > ').toLowerCase()}]\n`
  message += '\n'
  message += `${val.value}\n`
  message += '```\n'
  message += ''

  msg.channel.send(message)
}

const getName = args => {
  const scoredNames = namesArray.map(name => ({ name, score: getScore(name, args) }))
    .sort((a, b) => a.score > b.score ? -1 : 1)
    .filter((scoredName, i, arr) => scoredName.score === arr[0].score)

  return sample(scoredNames).name
}

const getScore = (name, data) => {
  const nameParts = name.split('.')

  let score = 0
  data.forEach(d => {
    if (nameParts.includes(d && d.toUpperCase())) {
      score++
    }
  })

  if (score === nameParts.length) {
    score = 999
  }
  return score
}

const getNamesArray = names => Object.values(names).reduce((arr, n) => {
  if (typeof n === 'string') {
    arr.push(n)
  } else {
    arr.push(...getNamesArray(n))
  }
  return arr
}, [])

const namesArray = getNamesArray(names)