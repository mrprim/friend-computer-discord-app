import { read as fileread, write as filewrite, remove as fileRemove } from '.'

const TYPE = 'server-settings'
const EXTENSION = 'json'

export const initialValues = {
  active: true
}

const fileName = `${TYPE}.${EXTENSION}`

export const read = () => {
  const data = fileread(fileName)
  return data && JSON.parse(data)
}

export const write = data => {
  filewrite(fileName, { ...initialValues, ...data })
}

export const remove = () => fileRemove(fileName)
