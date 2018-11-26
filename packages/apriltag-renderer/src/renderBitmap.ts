import * as ndarray from 'ndarray'
// import * as Jimp from 'jimp'
const Jimp = require('jimp')

type Options = {
  map: ndarray
  size: number
  file: string
  black?: string
  white?: string
}

export async function renderBitmap({
  map,
  size,
  file,
  black = '#000000',
  white = '#FFFFFF',
}: Options) {
  const resolution = map.shape[0]
  size -= size % resolution
  const rectSize = Math.floor(size / resolution)
  const image = await new Jimp(size, size, white)
  const rect = await new Jimp(rectSize, rectSize, black)

  for (let y = 0; y < map.shape[0]; ++y) {
    for (let x = 0; x < map.shape[1]; ++x) {
      if (map.get(x, y) === 0) {
        image.blit(rect, x * rectSize, y * rectSize)
      }
    }
  }

  image.write(file)
}
