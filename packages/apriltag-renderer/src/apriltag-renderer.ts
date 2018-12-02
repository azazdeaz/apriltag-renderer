import { getTagData } from './getTagData'
import { renderBitmap } from './renderBitmap'

export { families } from './families'

type Options = {
  family?: string
  value?: number
  size?: number
  format?: string
  black?: string
  white?: string
}

export async function render({
  family = 'tag36h11',
  value = 0,
  size = 256,
  black = '#000000',
  white = '#FFFFFF',
}: Options = {}) {

  return await renderBitmap({
    map: await getTagData({ family, value }),
    size,
    black,
    white,
  })
}

export function semmi(valami: string) { return 6 }
