import { readFileSync } from 'node:fs'

import sharp from 'sharp'

const WIDTH = 1200
const HEIGHT = 630
const SHOTS = ['flightdeck', 'skins', 'secret-box']

const count = JSON.parse(readFileSync('data/mods.json', 'utf8')).length

const text = `<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#111311"/>
  <g font-family="Segoe UI, system-ui, Arial, sans-serif">
    <text x="64" y="150" fill="#edece6" font-size="66" font-weight="700" letter-spacing="-1.5">Claude Code</text>
    <text x="64" y="226" fill="#2dd4bf" font-size="66" font-weight="700" letter-spacing="-1.5">Mods Gallery</text>
    <text x="64" y="302" fill="#a3a59e" font-size="29">See every mod before you install it.</text>
    <text x="64" y="346" fill="#a3a59e" font-size="29">Screenshots, costs and weekly test runs.</text>
  </g>
</svg>`

const shot = async (id, width, height) =>
  sharp(`site/posters/${id}.webp`)
    .resize({ width, height, fit: 'contain', background: '#0a0b0a' })
    .png()
    .toBuffer()

const composites = await Promise.all(
  SHOTS.map(async (id, index) => ({
    input: await shot(id, 340, 212),
    left: 64 + index * 366,
    top: 386,
  })),
)

await sharp(Buffer.from(text)).composite(composites).png({ compressionLevel: 9 }).toFile('site/og.png')
console.log(`og.png for ${count} candidates`)
