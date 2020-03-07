const sendMessage = require('./accessors/discord/sendMessage')
const createGame = require('./reactions/createGame')

const stimuli = [
  {
    match: 'disconnect',
    action: ({ bot }) => bot.disconnect()
  },
  {
    match: 'marco',
    action: ({ userID, channelID, bot }) => sendMessage(bot, channelID, `polo! <#${channelID}>`)
  },
  {
    pattern: new RegExp('^create\\s+game\\s+(.*)', 'i'),
    action: createGame
  }
]

module.exports = stimuli
