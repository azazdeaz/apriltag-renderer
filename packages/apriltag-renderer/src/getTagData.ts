import * as getPixels from 'get-pixels'
import * as ndarray from 'ndarray'
import { getSourceInfo } from './families'

function getPixelsPromised(base64: string): Promise<ndarray> {
  return new Promise((resolve, reject) => {
    getPixels(base64, (err: Error, pixels: ndarray) => {
      if (err) {
        reject(err)
        return
      }
      resolve(pixels)
    })
  })
}

type Options = {
  family: string
  value: number 
}
export async function getTagData({
  family,
  value
}: Options) {
  const info = getSourceInfo(family)
  const pixels = await getPixelsPromised(info.base64Mosaic)
  const index = info.values.indexOf(value)
  if (index < 0) {
    throw new Error(`Can't find the given value "${value}". Accepted values are "${info.values}"`)
  }
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
