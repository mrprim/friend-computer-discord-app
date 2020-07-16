import { names } from '@mrprim/random-rpg-stuff'
import Fuse from 'fuse.js'

const getNamesArray = names => Object.values(names).reduce((arr, n) => {
  if (typeof n === 'string') {
    arr.push({ name: n })
  } else {
    arr.push(...getNamesArray(n))
  }
  return arr
}, [])

const namesArray = getNamesArray(names)

const options = {
  includeScore: true,
  keys: ['name']
}

const fuse = new Fuse(namesArray, options)

export default message => {
  return fuse.search(message).map(({ item, score }) => ({ name: item.name, score }))
}