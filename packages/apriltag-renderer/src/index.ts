import * as getPixels from "get-pixels"

console.log(getPixels)
import { join } from 'path'
export default async function hello() {
  console.log("hello")
  getPixels(join(__dirname, "../mosaics/tag16h5.mosaic.png"), function(err, pixels) {
    if (err) {
      console.log("Bad image path")
      return;
    }
    const tag = pixels.lo(1,1).hi(6,6).pick(null, null, 0)
    let asci = ''
    for (let x = 0; x < tag.shape[0]; ++x) {
        for (let y = 0; y < tag.shape[1]; ++y) {
            asci += tag.get(y, x) > 255/2 ? ' ' : 'X'
        }
        asci += '\n'
    }
    console.log(asci)
    // console.log(tag)
    console.log("got pixels", tag.shape)
  })
}
hello()
