const promisify = require('../../utils/promisifyDiscord')

module.exports = (bot, { name, parentID, serverID }) =>
  promisify(bot, 'createChannel', { name, parentID, serverID })
