const promisify = require('../../utils/promisifyDiscord')

module.exports = (bot, { serverID, userID, roleID }) =>
  promisify(bot, 'addToRole', { serverID, userID, roleID })
