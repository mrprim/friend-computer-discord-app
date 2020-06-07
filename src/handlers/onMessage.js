// import { log } from '../utils/logger'
import * as commands from '../commands'
import { read } from '../data/channels'

const COMMAND_PREFIX = 'fc'

const prefixRegex = new RegExp('^' + COMMAND_PREFIX + '\\s*(.*)', '')

const isThisBot = msg => msg.member.id === msg.client.user.id

export default msg => {
  if (isThisBot(msg)) {
    return
  }

  const channelInfo = read(msg.channel.id) || {}

  let valid = false
  let content = msg.content

  const prefixMatch = prefixRegex.exec(content)
  if (prefixMatch) {
    valid = true
    content = prefixMatch[1]
  }

  if (channelInfo.isBotOnly) {
    msg.delete()
    valid = true
  }

  if (valid) {
    const words = content.split(' ')
    const command = words.shift()
    const data = words.join(' ')
    commands[command](msg, data)
  }
}
