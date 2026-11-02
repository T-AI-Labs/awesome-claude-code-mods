import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'

const API = 'https://api.github.com'

const [outPath = 'results/stats.json'] = process.argv.slice(2)
const mods = JSON.parse(readFileSync('data/mods.json', 'utf8'))
const headers = {
  accept: 'application/vnd.github+json',
  ...(process.env.GITHUB_TOKEN ? { authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
}

const get = async path => {
  const response = await fetch(`${API}/${path}`, { headers })

  return response.ok ? response.json() : null
}

const repos = new Map()

const repoOf = name => {
  if (!repos.has(name)) repos.set(name, get(`repos/${name}`))

  return repos.get(name)
}

// In a repository with many mods the push date says little, so the date is the last commit touching the mod's folder.
const updatedOf = async mod => {
  const query = mod.path === '.' ? '' : `&path=${encodeURIComponent(mod.path)}`
  const commits = await get(`repos/${mod.repo}/commits?per_page=1${query}`)

  return commits?.[0]?.commit?.committer?.date ?? (await repoOf(mod.repo))?.pushed_at ?? null
}

const entries = await Promise.all(
  mods.map(async mod => [
    mod.id,
    { stars: (await repoOf(mod.repo))?.stargazers_count ?? null, updatedAt: await updatedOf(mod) },
  ]),
)

mkdirSync(dirname(outPath), { recursive: true })
writeFileSync(outPath, `${JSON.stringify({ fetchedAt: new Date().toISOString(), mods: Object.fromEntries(entries) }, null, 2)}\n`)
console.log(`${entries.filter(([, one]) => one.stars !== null).length} of ${entries.length} mods with stars`)
