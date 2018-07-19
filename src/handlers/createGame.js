const sendMessage = require('../utils/sendMessage')
const constants = require('../constants')

module.exports = async ({ channelID, matches, bot }) => {
  let channelName = matches[1]
  const cleanerRegex = new RegExp(/\s+/, 'g')
  channelName = channelName.replace(cleanerRegex, '_')
  const serverID = bot.channels[channelID].guild_id

  await sendMessage(bot, channelID, `Attempting to start the new game **${channelName}**`)

  if (Object.entries(bot.channels).filter(([key, channel]) => channel.name === channelName).length) {
    await sendMessage(bot, channelID, `I'm sorry, but there is already a game called **${channelName}**`)
    return
  }

  await bot.createChannel({ name: channelName, parentID: constants.GAMES_CHANNEL_ID, serverID }, resp => console.log(resp))
}
