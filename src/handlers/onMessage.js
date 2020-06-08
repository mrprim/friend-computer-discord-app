// import { log } from '../utils/logger'
import * as commands from '../commands'
import { read } from '../data/channels'
import { log } from '../utils/logger'

const COMMAND_PREFIX = 'fc'

const isThisBot = msg => msg.member.id === msg.client.user.id

export default msg => {
  if (isThisBot(msg)) {
    return
  }

  const channelInfo = read(msg.channel.id) || {}

  let valid = false
  const words = msg.content.split(' ')

  if (words[0] && words[0].toLowerCase() === COMMAND_PREFIX) {
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
    const command = words.shift()
    const data = words.join(' ')
    try {
      commands[command.toLowerCase()](msg, data)
    } catch (e) {
      msg.reply(`[${command}] is not a valid command.`)
      log(`[${command}] is not a valid command.`)
    }
  }
}
