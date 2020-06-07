import { read as fileread, write as filewrite, remove as fileRemove } from './'

const PREFIX = 'channels.'
const FILE_TYPE = 'json'

export const initialValues = {
  isBotOnly: false,
  type: ''
}

const fileName = channelId => `${PREFIX}${channelId}.${FILE_TYPE}`

export const read = channelId => {
  const data = fileread(fileName(channelId))
  return data && JSON.parse(data)
}

export const write = (channelId, data) => {
  filewrite(fileName(channelId), { ...initialValues, ...data })
}

export const remove = channelId => fileRemove(fileName(channelId))
