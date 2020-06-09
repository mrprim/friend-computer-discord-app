import { log } from '../utils/logger'
import { read, write } from '../data/settings'
import updatePresence from '../utils/updatePresence'

export default client => {
  if (!read()) {
    write()
  }

  updatePresence(client)
  log('Friend Computer is Online')
}
