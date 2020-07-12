const PREFIX = '📺 '
const ERR_PREFIX = '❌ '

export const log = (...msg) => console.log(PREFIX, msg.join(' '))

export const err = (...msg) => console.log(ERR_PREFIX, msg.join(' '))

export const request = (user, userID, msg) => log(`Incoming Message from ${user}:${userID} - "${msg}"`)
