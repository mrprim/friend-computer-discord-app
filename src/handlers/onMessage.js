// import { log } from '../utils/logger'
import * as commands from '../commands'
import { read as readChannels } from '../data/channels'
import { read as readSettings, write as writeSettings } from '../data/settings'
import { err } from '../utils/logger'

const isThisBot = msg => msg.author.id === msg.client.user.id

const getSettings = msg => {
  const guildId = msg.guild ? msg.guild.id : msg.channel.id
  const settings = readSettings(guildId)
  if (settings) {
    return settings
  }
  writeSettings(guildId)
  return readSettings(guildId)
}

export default msg => {
  const settings = getSettings(msg)

  if (isThisBot(msg)) {
    return
  }

  const channelInfo = readChannels(msg.guild && msg.guild.id, msg.channel.id) || {}

  let valid = false
  const words = msg.content.split(' ')

  if (words[0] && words[0].toLowerCase() === settings.commandPrefix) {
    valid = true
    words.shift()
  }

  if (words[0] === `<@!${msg.client.user.id}>` || words[0] === `<@${msg.client.user.id}>`) {
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
