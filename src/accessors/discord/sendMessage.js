const promisify = require('../../utils/promisifyDiscord')

module.exports = (bot, to, message, opts) =>
  promisify(bot, 'sendMessage', { ...opts, to, message })
