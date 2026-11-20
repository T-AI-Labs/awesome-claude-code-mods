import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'

const API = 'https://api.github.com'
// The compare API lists at most this many files; at the cap a change in the mod's folder cannot be ruled out.
const FILE_CAP = 300

const [summaryPath = 'results/bump.md'] = process.argv.slice(2)
const mods = JSON.parse(readFileSync('data/mods.json', 'utf8'))
const headers = {
  accept: 'application/vnd.github+json',
  ...(process.env.GITHUB_TOKEN ? { authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
}

const get = async path => {
  const response = await fetch(`${API}/${path}`, { headers })

  return response.ok ? response.json() : null
}

const heads = new Map()

const headOf = async repo => {
  if (!heads.has(repo)) {
    const info = await get(`repos/${repo}`)
    const branch = info === null ? null : await get(`repos/${repo}/commits/${info.default_branch}`)
    heads.set(repo, branch?.sha ?? null)
  }

  return heads.get(repo)
}

const RAW = /^https:\/\/raw\.githubusercontent\.com\/([^/]+\/[^/]+)\/([0-9a-f]{40})\/(.+)$/

// Images on the mod's own repository move with the commit; images elsewhere stay as they are.
const imagePathsOf = mod =>
  mod.images.flatMap(url => {
    const match = RAW.exec(url)

    return match !== null && match[1] === mod.repo ? [match[3]] : []
  })

const repin = (mod, sha) => ({
  ...mod,
  commit: sha,
  images: mod.images.map(url => {
    const match = RAW.exec(url)

    return match !== null && match[1] === mod.repo ? url.replace(match[2], sha) : url
  }),
})

const touches = (mod, files) => {
  const watched = imagePathsOf(mod)
  const folder = mod.path === '.' ? '' : `${mod.path}/`

  return files.some(file => file.startsWith(folder) || watched.includes(file) || file === (mod.licenseFile ?? 'LICENSE'))
}

const isGone = async url => {
  try {
    const { status } = await fetch(url, { method: 'HEAD', redirect: 'follow' })

    return status === 404 || status === 410
  } catch {
    return false
  }
}

const urlsOf = mod => [
  ...mod.images,
  `https://github.com/${mod.repo}/tree/${mod.commit}${mod.path === '.' ? '' : `/${mod.path}`}`,
  `https://github.com/${mod.repo}/blob/${mod.commit}/${mod.licenseFile ?? 'LICENSE'}`,
]

const bumped = []
const held = []
const next = []

for (const mod of mods) {
  const head = await headOf(mod.repo)

  if (head === null || head === mod.commit) {
    next.push(mod)
    continue
  }

  const compare = await get(`repos/${mod.repo}/compare/${mod.commit}...${head}`)

  if (compare === null || compare.status === 'behind' || compare.status === 'diverged') {
    held.push(`**${mod.name}**: the pinned commit \`${mod.commit.slice(0, 7)}\` is not behind \`${head.slice(0, 7)}\` on the default branch (${compare?.status ?? 'no comparison'}).`)
    next.push(mod)
    continue
  }

  const files = (compare.files ?? []).map(file => file.filename)

  if (files.length < FILE_CAP && !touches(mod, files)) {
    next.push(mod)
    continue
  }

  const candidate = repin(mod, head)
  const flags = await Promise.all(urlsOf(candidate).map(isGone))
  const missing = urlsOf(candidate).filter((_, index) => flags[index])

  if (missing.length > 0) {
    held.push(`**${mod.name}**: \`${head.slice(0, 7)}\` lacks ${missing.join(', ')}, so it stays on \`${mod.commit.slice(0, 7)}\`.`)
    next.push(mod)
    continue
  }

  bumped.push(`**${mod.name}** (${mod.repo}): \`${mod.commit.slice(0, 7)}\` → \`${head.slice(0, 7)}\`, [${compare.total_commits} commits](https://github.com/${mod.repo}/compare/${mod.commit}...${head})`)
  next.push(candidate)
}

writeFileSync('data/mods.json', `${JSON.stringify(next, null, 2)}\n`)

const summary = [
  'Moves each mod whose folder, images or license changed on its default branch to that branch\'s newest commit. The check workflow tests the new commits on this branch before anything is merged.',
  '',
  bumped.length === 0 ? 'No mod has a newer commit.' : `### Newer commits\n\n${bumped.map(line => `- ${line}`).join('\n')}`,
  ...(held.length === 0 ? [] : ['', `### Left as they are\n\n${held.map(line => `- ${line}`).join('\n')}`]),
  '',
  'Taglines, benefits and the choice of images stay as they were: check them against the new versions before merging.',
  '',
  'This workflow keeps one pull request open at most: each run replaces this one, and closes it once every mod is current.',
].join('\n')

mkdirSync(dirname(summaryPath), { recursive: true })
writeFileSync(summaryPath, `${summary}\n`)
console.log(`${bumped.length} of ${mods.length} mods moved to a newer commit, ${held.length} held back`)
