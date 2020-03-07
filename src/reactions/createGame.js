const accessors = require('../accessors/discord')
const constants = require('../constants')

module.exports = async ({ userID, channelID, matches, bot }) => {
  let channelName = matches[1]
  const cleanerRegex = new RegExp(/[^\w]+/, 'g')
  channelName = channelName.replace(cleanerRegex, '_')
  const serverID = bot.channels[channelID].guild_id

  await accessors.sendMessage(bot, channelID, `Attempting to start the new game **#${channelName}**`)

  if (Object.entries(bot.channels).filter(([key, channel]) => channel.name === channelName).length) {
    await accessors.sendMessage(bot, channelID, `I'm sorry, but there is already a game called **${channelName}**`)
    return
  }

  const newChannel = await accessors.createChannel(bot, { name: channelName, parentID: constants.GAMES_CHANNEL_ID, serverID })
  channelName = newChannel.name

  const gmRole = await accessors.createRole(bot, serverID)
  await accessors.editRole(bot, { name: channelName + '-gm', serverID, roleID: gmRole.id })
  const playerRole = await accessors.createRole(bot, serverID)
  await accessors.editRole(bot, { name: channelName + '-player', serverID, roleID: playerRole.id })
  await accessors.assignRole(bot, { userID, serverID, roleID: gmRole.id })

  let message = `The new game <#${newChannel.id}> is now ready.`

  await accessors.sendMessage(bot, channelID, message)
}
