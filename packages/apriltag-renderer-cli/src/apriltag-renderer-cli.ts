import * as program from 'commander'
import { render } from 'apriltag-renderer'
import { omitBy, isUndefined } from 'lodash'

program
  .version('0.0.0')
  .option(
    '-f, --family <n>',
    'Code family name (supported: "tag16h5", "tag26h9", "tag36h10", "tag36h11")'
  )
  .option(
    '--value <n>',
    'The value that the tag should represent',
    parseInt
  )
  .option(
    '-s, --size <n>',
    'Size in pixels (will be rounded down if not dividable with the resolution of the tag',
    parseInt
  )
  .option('-p, --path <n>', 'Output path')
  .option('-b, --black <n>', 'Color of the dark parts')
  .option('-w, --white <n>', 'Color of the bright parts')
  .parse(process.argv)

const options = omitBy(
  {
    family: program.family,
    value: program.value,
    size: program.size,
    file: program.path,
    black: program.black,
    white: program.white,
  },
  isUndefined
)

render(options)
