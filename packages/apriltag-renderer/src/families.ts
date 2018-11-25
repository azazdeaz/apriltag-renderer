import { range } from 'lodash'

export const families = [
  {
    name: 'tag16h5',
    mosaicFile: 'tag16h5.mosaic.png',
    values: range(0, 30),
    cols: 5,
    rows: 6,
    margin: 1,
    size: 6,
  },
  {
    name: 'tag25h9',
    mosaicFile: 'tag25h9.mosaic.png',
    values: range(0, 35),
    cols: 5,
    rows: 7,
    margin: 1,
    size: 7,
  },
  {
    name: 'tag36h10',
    mosaicFile: 'tag36h10.mosaic.png',
    values: range(0, 2320),
    cols: 48,
    rows: 49,
    margin: 1,
    size: 8,
  },
  {
    name: 'tag36h11',
    mosaicFile: 'tag36h11.mosaic.png',
    values: range(0, 587),
    cols: 24,
    rows: 25,
    margin: 1,
    size: 8,
  },
]

export function getSourceInfo(name: string) {
  const info = families.find(family => family.name ===  name)
  if (!info) {
    throw new Error(`Can't find family with the name "${name}"`)
  }
  return info
}
