import * as ndarray from 'ndarray'
// import * as Jimp from 'jimp'
import * as Jimp from 'jimp'

type Options = {
  map: ndarray
  size: number
  black?: string
  white?: string
}

export async function renderBitmap({
  map,
  size,
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

  return {
    write: write(image),
    base64: base64(image),
  }
}

const write = (image: Jimp) => async (file: string) => {
  await image.writeAsync(file)
}
const base64 = (image: Jimp) => () => image.getBase64Async(Jimp.MIME_PNG)
