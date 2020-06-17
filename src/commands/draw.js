import { SpellRPGBag } from '@mrprim/tile-bag'
import * as emojis from '../constants/emojis'
import roll from '../utils/roll'

export default (msg, data) => {
  const args = data.split(' ')

  if (args[1] === 'letters') {
    const bag = new SpellRPGBag()
    const count = roll(args[0])

    msg.channel.send(`Draw ${count} letters = ${bag.draw(count).map(v => emojis[v]).join(' ')}`)
  }
}
