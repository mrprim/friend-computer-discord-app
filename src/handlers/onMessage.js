// import { log } from '../utils/logger'
import * as commands from '../commands'
import { read as readChannels } from '../data/channels'
import { read as readSettings } from '../data/settings'
import { err } from '../utils/logger'

const isThisBot = msg => msg.member.id === msg.client.user.id

export default msg => {
  if (isThisBot(msg)) {
    return
  }

  const settings = readSettings()
  const channelInfo = readChannels(msg.channel.id) || {}

  let valid = false
  const words = msg.content.split(' ')

  if (words[0] && words[0].toLowerCase() === settings.commandPrefix) {
    valid = true
    words.shift()
  }

  if (words[0] === `<@!${msg.client.user.id}>`) {
    valid = true
    words.shift()
  }

  if (channelInfo.isBotOnly) {
    msg.delete()
    valid = true
  }

  if (valid) {
    const command = words[0] && words.shift().toLowerCase()

    if (!settings.active && command !== 'settings') {
      return
    }

    const data = words.join(' ')
    try {
      const handler = commands[command]

      if (!handler) {
        msg.reply(`[${command}] is not a valid command.`)
        err(`[${command}] is not a valid command.`)
        return
      }

      handler(msg, data)
    } catch (e) {
      err('error handling "' + msg.content + '"', e)
    }
  }
}
