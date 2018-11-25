import { getTagData } from './getTagData'
import { renderBitmap } from './renderBitmap'

type Options = {
  family?: string
  value?: number
  size?: number
  file?: string
  format?: string
  black?: string
  white?: string
}

export async function render({
  family = 'tag36h11',
  value = 0,
  size = 256,
  file,
  format = 'png',
  black = '#000000',
  white = '#FFFFFF',
}: Options = {}) {
  if (!file) {
    file = `${family}_${value}.${format}`
  }
  await renderBitmap({
    map: await getTagData({ family, value }),
    size,
    file: 'new_name.png',
    black,
    white,
  })
}
