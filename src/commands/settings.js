import { read, write } from '../data/settings'
import { log } from '../utils/logger'
import { jsonToMessage } from '../utils/formatters'
import updatePresence from '../utils/updatePresence'

export default (msg, data) => {
  const settings = read()

  if (!settings.admins.includes(msg.member.id)) {
    return
  }

  const args = data.split(' ')

  if (args[0] === 'off') {
    write({ ...settings, active: false })
    updatePresence(msg.client)
    log('Bot is no longer paying attention')
  }

  if (args[0] === 'on') {
    write({ ...settings, active: true })
    updatePresence(msg.client)
    log('Bot is paying attention again')
  }

  if (args[0] === 'list') {
    msg.channel.send(jsonToMessage(settings))
  }
}
