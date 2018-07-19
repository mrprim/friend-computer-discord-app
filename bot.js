const Discord = require('discord.io')
const auth = require('./auth.json')
const messageHandlers = require('./src/message')

const PREFIX = 'fc'
const messagePrefixMatcher = new RegExp('^' + PREFIX + '\\s*(.*)', '')

const bot = new Discord.Client({
  token: auth.token,
  autorun: true
})

bot.setPresence({
  game: {
    name: 'With Your Lives'
  }
})

const onReady = () => console.log(`${bot.username} - Logged In`)

const onDisconnect = (errorMessage, code) => console.log(`${bot.username} - Disconnected [${'"' + errorMessage + '"' || 'code:' + code}]`)

const onMessage = (user, userID, channelID, message, event) => {
  const match = messagePrefixMatcher.exec(message)

  if (!match) return
  message = match[1]

  if (!message) return messageHandlers.send(bot, userID, 'Do you want to know more about the Computer?')

  let done = false

  messageHandlers.responses.forEach(({ match, pattern, action }) => {
    if (done) return
    if (match && match === message) {
      action({bot, user, userID, channelID, message, event})
      done = true
    } else if (pattern) {
      const matches = pattern.exec(message)
      if (matches) {
        action({bot, user, userID, channelID, message, event, matches})
        done = true
      }
    }
  })
}

bot.on('ready', onReady)
bot.on('disconnect', onDisconnect)
bot.on('message', onMessage)
