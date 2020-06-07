const PREFIX = '📺 '

export const log = msg => console.log(PREFIX, msg)

export const request = (user, userID, msg) => log(`Incoming Message from ${user}:${userID} - "${msg}"`)
