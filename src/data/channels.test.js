import { initialValues, read, write, remove } from './channels'

describe('channels', () => {
  it('should write and retrieve a channel file', () => {
    const data = { test: 'A' }
    write('tmp', data)
    expect(read('tmp')).toEqual({ ...initialValues, test: 'A' })
    remove('tmp')
    expect(read('tmp')).toBeFalsy()
  })

  xit('integration:save channel', () => {
    const data = {
      isBotOnly: true,
      type: 'JOIN',
      spoilerChatId: '718161350026592307',
      spoilerRoleId: '718160995109044255'
    }
    write('718161508923736066', data)
  })
})
