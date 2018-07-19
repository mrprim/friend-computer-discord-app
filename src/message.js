const responses = [
  {
    match: 'disconnect',
    action: ({ bot }) => bot.disconnect()
  },
  {
    match: 'marco',
    action: ({ channelID, bot }) => send(bot, channelID, 'polo!')
  },
  {
    pattern: new RegExp('^create\\s+game\\s+(.*)', 'i'),
    action: ({ channelID, matches, bot }) => {
      let channelName = matches[1]
      const cleanerRegex = new RegExp(/\s+/, 'g')
      channelName = channelName.replace(cleanerRegex, '_')
      const serverID = bot.channels[channelID].guild_id

      send(bot, channelID, 'Creating Channel ' + channelName)
      bot.createChannel({
        name: channelName,
        serverID
      }, resp => console.log(resp))
    }
  }
]

const send = (bot, to, message, opts) => bot.sendMessage({ ...opts, to, message })

module.exports = {
  responses,
  send
}
