const ADMINS = ['259407197358915588']

export default (msg, data) => {
  if (!ADMINS.includes(msg.member.id)) {
    return
  }

  msg.delete()
  msg.channel.send(data)
}
