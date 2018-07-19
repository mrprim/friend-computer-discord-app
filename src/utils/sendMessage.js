const sendMessage = async (bot, to, message, opts) => bot.sendMessage({ ...opts, to, message })

module.exports = sendMessage
