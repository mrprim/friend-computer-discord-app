const PREFIX = '📺 '

const log = msg => console.log(PREFIX, msg)

const request = (user, userID, msg) => log(`Incoming Message from ${user}:${userID} - "${msg}"`)

module.exports = {
  log,
  request
}
