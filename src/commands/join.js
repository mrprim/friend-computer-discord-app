import { read } from '../data/channels'
import * as channelTypes from '../constants/channelTypes'

export default async msg => {
  const channel = read(msg.channel.id) || {}

  if (channel.type === channelTypes.JOIN) {
    msg.reply(`You've been added to the <#${channel.spoilerChatId}> chat`)
    msg.member.roles.add(channel.spoilerRoleId)

    const spoilerChannel = await msg.client.channels.fetch(channel.spoilerChatId)
    spoilerChannel.send(`<@!${msg.member.id}> has joined <#${channel.spoilerChatId}>.`)
  }
}
