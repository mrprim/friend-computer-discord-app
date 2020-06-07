import { log } from '../utils/logger'

export default client => {
  log('Friend Computer is Online')

  client.user.setPresence({
    activity: {
      name: 'With Your Lives'
    }
  })

  // const onReady = () => logger.log(`Initialized`)

  // const onDisconnect = (errorMessage, code) => logger.log(`Disconnected [${'"' + errorMessage + '"' || 'code:' + code}]`)

  // const onMessage = (user, userID, channelID, message, event) => {
  //   const match = messagePrefixMatcher.exec(message)

  //   if (!match) return
  //   message = match[1]

  //   logger.request(user, userID, message)

  //   let done = false
  //   stimuli.forEach(({ match, pattern, action }) => {
  //     if (done) return
  //     if (match && match === message) {
  //       action({bot, user, userID, channelID, message, event})
  //       done = true
  //     } else if (pattern) {
  //       const matches = pattern.exec(message)
  //       if (matches) {
  //         action({bot, user, userID, channelID, message, event, matches})
  //         done = true
  //       }
  //     }
  //   })
  // }

  // bot.on('ready', onReady)
  // bot.on('disconnect', onDisconnect)
  // bot.on('message', onMessage)
}
