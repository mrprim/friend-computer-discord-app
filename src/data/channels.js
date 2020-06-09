import { read as fileread, write as filewrite, remove as fileRemove } from './'

const TYPE = 'channels'
const EXTENSION = 'json'

export const initialValues = {
  isBotOnly: false,
  type: ''
}

const fileName = id => `${TYPE}.${id}.${EXTENSION}`

export const read = id => {
  const data = fileread(fileName(id))
  return data && JSON.parse(data)
}

export const write = (id, data) => {
  filewrite(fileName(id), { ...initialValues, ...data })
}

export const remove = channelId => fileRemove(fileName(channelId))
