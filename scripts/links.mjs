import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'

const [outPath = 'results/links.json'] = process.argv.slice(2)
const mods = JSON.parse(readFileSync('data/mods.json', 'utf8'))

const urlsOf = mod => [
  ...mod.images,
  `https://github.com/${mod.repo}`,
  `https://github.com/${mod.repo}/tree/${mod.commit}${mod.path === '.' ? '' : `/${mod.path}`}`,
  `https://github.com/${mod.repo}/blob/${mod.commit}/${mod.licenseFile ?? 'LICENSE'}`,
]

// Only a clear "gone" counts, so a rate limit or an outage at GitHub never empties the gallery.
const isGone = async url => {
  try {
    const { status } = await fetch(url, { method: 'HEAD', redirect: 'follow' })

    return status === 404 || status === 410
  } catch {
    return false
  }
}

const dead = {}

for (const mod of mods) {
  const urls = urlsOf(mod)
  const flags = await Promise.all(urls.map(isGone))
  const missing = urls.filter((_, index) => flags[index])

  if (missing.length > 0) {
    dead[mod.id] = missing
    console.log(`::warning::${mod.id} leaves the gallery: ${missing.join(', ')}`)
  }
}

mkdirSync(dirname(outPath), { recursive: true })
writeFileSync(outPath, `${JSON.stringify({ checkedAt: new Date().toISOString(), dead }, null, 2)}\n`)
console.log(`${Object.keys(dead).length} of ${mods.length} mods with dead links`)
