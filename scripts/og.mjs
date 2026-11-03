import { readFileSync } from 'node:fs'

import sharp from 'sharp'

const WIDTH = 1200
const HEIGHT = 630

const count = JSON.parse(readFileSync('data/mods.json', 'utf8')).length

const text = `<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#111311"/>
  <g font-family="Segoe UI, system-ui, Arial, sans-serif">
    <text x="64" y="236" fill="#edece6" font-size="76" font-weight="700" letter-spacing="-1.5">Awesome Claude Code</text>
    <text x="64" y="322" fill="#2dd4bf" font-size="76" font-weight="700" letter-spacing="-1.5">Mods</text>
    <text x="64" y="404" fill="#a3a59e" font-size="31">See every mod before you install it.</text>
    <text x="64" y="450" fill="#a3a59e" font-size="31">Screenshots, costs and weekly test runs.</text>
  </g>
</svg>`

await sharp(Buffer.from(text)).png({ compressionLevel: 9 }).toFile('site/og.png')
console.log(`og.png for ${count} candidates`)
