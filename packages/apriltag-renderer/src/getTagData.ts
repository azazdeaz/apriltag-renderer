import * as getPixels from 'get-pixels'
import * as ndarray from 'ndarray'
import { join } from 'path'
import { promisify } from 'util'
import { getSourceInfo } from './families'

type Options = {
  family: string
  value: number 
}
export async function getTagData({
  family,
  value
}) {
  const info = getSourceInfo(family)
  const pixels: ndarray = await promisify(getPixels)(
    join(__dirname, '../mosaics', info.mosaicFile)
  )
  const index = info.values.indexOf(value)
  if (index < 0) {
    throw new Error(`Can't find the given value "${value}". Accepted values are "${info.values}"`)
  }
  console.log(info, family)
  console.log(`value index`, index)
  const row = Math.floor(index / info.cols)
  const col = Math.floor(index % info.cols)
  const x = col * (info.size + info.margin * 2) + info.margin
  const y = row * (info.size + info.margin * 2) + info.margin
  const tag: ndarray = pixels
    .lo(x, y)
    .hi(info.size, info.size)
    .pick(null, null, 0)

  return tag
}
