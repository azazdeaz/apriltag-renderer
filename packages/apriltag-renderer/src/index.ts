import { getTagData } from './getTagData'
import { renderBitmap } from './renderBitmap'

type Options = {
  family?: string
  value?: number
  size?: number
  file?: string
  format?: string
}

async function render({
  family = 'tag36h11',
  value = 0,
  size = 256,
  file,
  format = 'png',
}: Options = {}) {
  if (!file) {
    file = `${family}_${value}.${format}`
  }
  await renderBitmap({
    map: await getTagData({ family, value }),
    size,
    file: 'new_name.png',
    black: '#FF5555',
  })
}

render({ value: 2319, family: 'tag36h10' })
