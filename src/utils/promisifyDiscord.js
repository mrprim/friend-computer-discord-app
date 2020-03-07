module.exports = (bot, methodName, ...params) => {
  return new Promise((resolve, reject) => {
    const cb = (err, resp) => {
      if (err) {
        reject(err)
      } else {
        resolve(resp)
      }
    }

    bot[methodName](...params, cb)
  })
}
