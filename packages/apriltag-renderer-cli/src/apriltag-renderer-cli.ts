#!/usr/bin/env node

import * as program from 'commander'
import { render, semmi } from 'apriltag-renderer'
import { omitBy, isUndefined } from 'lodash'

program
  .version('0.0.0')
  .option(
    '-f, --family <n>',
    'Code family name (supported: "tag16h5", "tag26h9", "tag36h10", "tag36h11")',
    'tag36h11'
  )
  .option('--value <n>', 'The value that the tag should represent', parseInt, 0)
  .option(
    '-s, --size <n>',
    'Size in pixels (will be rounded down if not dividable with the resolution of the tag',
    parseInt,
    300
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

if (!options.path) {
  options.path = `${options.family}_${options.value}.png`
}


async function run() {
  const { write } = await render(options)
  await write(options.path)
  console.log(`"${options.path}" was generated successfully`)
}
run()
