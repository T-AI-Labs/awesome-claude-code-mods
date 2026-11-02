import { mkdirSync, readFileSync } from 'node:fs'

import sharp from 'sharp'

const WIDTH = 760

const mods = JSON.parse(readFileSync(new URL('../data/mods.json', import.meta.url), 'utf8'))
const target = new URL('../site/posters/', import.meta.url)

mkdirSync(target, { recursive: true })

for (const mod of mods) {
  const [image] = mod.images

  if (image.endsWith('.svg')) {
    continue
  }

  const response = await fetch(image)

  if (!response.ok) {
    throw new Error(`${mod.id}: ${response.status}`)
  }

  await sharp(Buffer.from(await response.arrayBuffer()))
    .resize({ width: WIDTH, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(new URL(`${mod.id}.webp`, target).pathname.replace(/^\/([A-Za-z]:)/, '$1'))
  console.log(mod.id)
}
