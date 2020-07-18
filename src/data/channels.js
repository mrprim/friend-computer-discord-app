import { read as fileread, write as filewrite, remove as fileRemove } from './'

const TYPE = 'channels'
const EXTENSION = 'json'

export const initialValues = {
  isBotOnly: false,
  type: ''
}

const fileName = (serverId, channelId) => `${serverId}.${TYPE}.${channelId}.${EXTENSION}`

export const read = (serverId, channelId) => {
  const data = fileread(fileName(serverId, channelId))
  return data && JSON.parse(data)
}

export const write = (serverId, channelId, data) => {
  filewrite(fileName(serverId, channelId), { ...initialValues, ...data })
}

export const remove = channelId => fileRemove(fileName(channelId))
