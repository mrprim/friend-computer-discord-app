const sendMessage = require('./utils/sendMessage')
const createGame = require('./handlers/createGame')

const intents = [
  {
    match: 'disconnect',
    action: ({ bot }) => bot.disconnect()
  },
  {
    match: 'marco',
    action: ({ channelID, bot }) => sendMessage(bot, channelID, 'polo!')
  },
  {
    pattern: new RegExp('^create\\s+game\\s+(.*)', 'i'),
    action: createGame
  }
]

module.exports = intents
