const promisify = require('../../utils/promisifyDiscord')

module.exports = (bot, role) =>
  promisify(bot, 'editRole', role)
