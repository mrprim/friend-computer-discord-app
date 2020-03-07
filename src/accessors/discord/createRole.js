const promisify = require('../../utils/promisifyDiscord')

module.exports = (bot, serverID) =>
  promisify(bot, 'createRole', serverID)
