import { read as readServerSettings } from '../data/settings'
import { write as writeChannel } from '../data/channels'

// import { log } from '../utils/logger'
// import { jsonToMessage } from '../utils/formatters'

export default async (msg, data) => {
  const settings = readServerSettings()

  if (!settings.admins.includes(msg.member.id)) {
    return
  }

  const args = data.split(' ')

  if (args[0] === 'spoiler') {
    createSpoiler(msg, args[1])
  }
}

const createSpoiler = async (msg, name) => {
  const settings = readServerSettings()

  const spoilerRole = await msg.guild.roles.create({ data: { name: `${name}-spoilers` } })

  const spoilerChannel = await msg.guild.channels.create(name, {
    parent: settings.spoilerParentId,
    permissionOverwrites: [
      { id: msg.guild.id, deny: ['VIEW_CHANNEL'] },
      { id: spoilerRole.id, allow: ['VIEW_CHANNEL'] }
    ]
  })

  writeChannel(spoilerChannel.id, {
    type: 'SPOILER'
  })

  const joinChannel = await msg.guild.channels.create(`join-${name}`, {
    parent: settings.spoilerParentId,
    permissionOverwrites: [
      { id: msg.guild.id, allow: ['VIEW_CHANNEL'] },
      { id: spoilerRole.id, deny: ['VIEW_CHANNEL'] }
    ]
  })

  writeChannel(joinChannel.id, {
    type: 'JOIN',
    isBotOnly: true,
    spoilerChatId: spoilerChannel.id,
    spoilerRoleId: spoilerRole.id
  })

  joinChannel.send(`By sending the message \`join\` in this channel you will gain access to the <#${spoilerChannel.id}> Spoiler chat.`)
}
