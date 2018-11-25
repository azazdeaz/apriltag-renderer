import * as program from 'commander'
import { render } from 'apriltag-renderer'

program
  .command('render')
  .version('0.0.0')
  .option(
    '-f, --family',
    'Code family name (supported: "tag16h5", "tag26h9", "tag36h10", "tag36h11")',
  )
  .option('--value', 'The value that the tag should represent', parseInt)
  .option(
    '-s, --size',
    'Size in pixels (will be rounded down if not dividable with the resolution of the tag',
    parseInt
  )
  .option('-p, --path', 'Output path')
  .option('-b, --black', 'Color of the dark parts')
  .option('-w, --white', 'Color of the bright parts')
  .action((dir, cmd) => {
    console.log({dir, cmd})
    console.log(dir.value)
  })
  .parse(process.argv)
// console.log(program.options)
// render({
//   family: program.family,
//   value: parseInt(program.value),
//   size: parseInt(program.size),
//   file: program.path,
//   black: program.black,
//   white: program.white,
// })
