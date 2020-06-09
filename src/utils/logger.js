const PREFIX = '📺 '
const ERR_PREFIX = '❌ '

export const log = msg => console.log(PREFIX, msg)

export const err = msg => console.log(ERR_PREFIX, msg)

export const request = (user, userID, msg) => log(`Incoming Message from ${user}:${userID} - "${msg}"`)
