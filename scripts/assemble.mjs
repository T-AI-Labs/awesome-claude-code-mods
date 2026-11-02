import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const SITE = 'https://t-ai-labs.github.io/awesome-claude-code-mods/'
const NAME = 'Claude Code Mods Gallery'
const REPO = 'https://github.com/T-AI-Labs/awesome-claude-code-mods'

const [resultsPath, statsPath, out = 'public'] = process.argv.slice(2)
const readJson = path => JSON.parse(readFileSync(path, 'utf8'))
const results = readJson(resultsPath)
const stats = readJson(statsPath)
const categories = readJson('data/categories.json')
const mods = readJson('data/mods.json')
  .map(mod => ({ ...mod, result: results.mods[mod.id], stats: stats.mods[mod.id] }))
  .filter(mod => mod.result?.validated && mod.result?.tested)

const esc = text =>
  String(text).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')

const authorOf = mod => mod.repo.split('/')[0]
const installOf = mod => `claude plugin marketplace add ${mod.repo}\nclaude plugin install ${mod.name}@${mod.marketplace}`
const sourceOf = mod => `https://github.com/${mod.repo}/tree/${mod.commit}${mod.path === '.' ? '' : `/${mod.path}`}`
const compact = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 })
const longDate = date => new Date(date).toLocaleDateString('en', { dateStyle: 'medium' })
const statsOf = ({ stats: { stars = null, updatedAt = null } = {} }) =>
  [
    stars === null ? null : `<span title="Stars of the whole repository">★ <b>${compact.format(stars)}</b></span>`,
    updatedAt === null ? null : `<span>Updated ${longDate(updatedAt)}</span>`,
  ]
    .filter(Boolean)
    .join('')
const checked = new Date(results.checkedAt).toLocaleDateString('en', { dateStyle: 'medium' })

const accessRows = mod => [
  ['Tokens', mod.result.usesTokens, 'Can send model requests, which count against your usage', 'Makes no model requests'],
  ['Network', mod.result.usesNetwork, 'Can reach the network', 'Makes no network requests'],
  ['Commands', mod.result.runsCommands, 'Can run local commands', 'Runs no commands'],
  ['Files', mod.result.writesFiles, 'Can write files', 'Writes no files directly'],
]

const CHECK = '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M3 8.5l3.2 3.2L13 4.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'

const modPage = mod => {
  const title = `${mod.name}: ${mod.tagline}`
  const description = `${mod.tagline} ${mod.benefits.join('. ')}.`.slice(0, 300)
  const url = `${SITE}mods/${mod.id}/`
  const related = mods.filter(one => one.category === mod.category && one.id !== mod.id).slice(0, 3)
  const category = categories.find(one => one.id === mod.category).label
  const tests = `${mod.result.pass} ${mod.result.pass === 1 ? 'test passes' : 'tests pass'}`
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: mod.name,
    description: mod.tagline,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Claude Code',
    license: mod.license,
    ...(mod.stats?.updatedAt ? { dateModified: mod.stats.updatedAt } : {}),
    codeRepository: `https://github.com/${mod.repo}`,
    url,
  }

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)} | ${NAME}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${url}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${SITE}og.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="color-scheme" content="light dark">
  <link rel="icon" href="../../favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="../../style.css">
  <script type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>
</head>
<body>
  <header class="top">
    <a class="brand" href="../../">
      <img src="../../favicon.svg" width="26" height="26" alt="">
      <span>${NAME}</span>
    </a>
    <nav class="top-links" aria-label="Main">
      <a href="../../#testing">How we test</a>
      <a href="${REPO}">GitHub</a>
      <button class="theme" id="theme" type="button" aria-label="Switch color theme">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 2v14a7 7 0 0 0 0-14Z" fill="currentColor" fill-rule="evenodd"/></svg>
      </button>
    </nav>
  </header>
  <main class="mod-page">
    <p class="crumb"><a href="../../">All mods</a> / <a href="../../?category=${mod.category}">${esc(category)}</a></p>
    <div class="mod-layout">
      <div class="stage">
        ${mod.images.map((image, index) => `<div class="stage-main"><img src="${esc(image)}" alt="${esc(mod.name)} in use, image ${index + 1}"${index === 0 ? '' : ' loading="lazy"'}></div>`).join('\n        ')}
        <p class="credit">${mod.own ? 'Illustrations by the maintainers of this list.' : `Images from ${esc(authorOf(mod))}'s repository.`}</p>
      </div>
      <div class="panel">
        <div>
          <h1>${esc(mod.tagline)}</h1>
          <div class="byline"><code>${esc(mod.name)}</code><span>by ${esc(authorOf(mod))}</span>${mod.own ? '<span class="ours">Ours</span>' : ''}<span>· ${esc(mod.where)}</span><span class="stats">${statsOf(mod)}</span></div>
        </div>
        <section>
          <h2>What you get</h2>
          <ul class="benefits">${mod.benefits.map(benefit => `<li>${CHECK}<span>${esc(benefit)}</span></li>`).join('')}</ul>
        </section>
        <section>
          <h2>What it costs and can access</h2>
          <dl class="access">${accessRows(mod).map(([label, isUsed, yes, no]) => `<div><dt>${label}</dt><dd><span class="dot${isUsed ? ' note' : ''}" aria-hidden="true"></span>${isUsed ? yes : no}</dd></div>`).join('')}</dl>
        </section>
        <section>
          <h2>Test result</h2>
          <p class="plain">${tests} and validation is clean on Claude Code ${esc(results.claudeVersion)}, checked ${checked}. <span class="quiet">Its own tests, not a security audit.</span></p>
        </section>
        <section>
          <div class="section-head"><h2>Install</h2><button class="copy" type="button" data-copy="${esc(installOf(mod))}">Copy</button></div>
          <pre class="install">${esc(installOf(mod))}</pre>
        </section>
        <div class="links">
          <a href="${sourceOf(mod)}" rel="noopener">Source at the tested commit</a>
          <a href="https://github.com/${mod.repo}" rel="noopener">Repository</a>
          <span>${esc(mod.license)} license</span>
        </div>
      </div>
    </div>
    ${related.length === 0 ? '' : `<section class="related"><h2>More in ${esc(category)}</h2><ul>${related.map(one => `<li><a href="../${one.id}/"><strong>${esc(one.name)}</strong><span>${esc(one.tagline)}</span></a></li>`).join('')}</ul></section>`}
  </main>
  <footer class="bottom"><p>An independent list, not affiliated with Anthropic. Images belong to the mods' authors.</p></footer>
  <script src="../../mod.js" type="module"></script>
</body>
</html>
`
}

rmSync(out, { recursive: true, force: true })
mkdirSync(join(out, 'data'), { recursive: true })
cpSync('site', out, { recursive: true })
cpSync('data/mods.json', join(out, 'data/mods.json'))
cpSync('data/categories.json', join(out, 'data/categories.json'))
cpSync(resultsPath, join(out, 'data/results.json'))
cpSync(statsPath, join(out, 'data/stats.json'))

for (const mod of mods) {
  const dir = join(out, 'mods', mod.id)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), modPage(mod))
}

const index = join(out, 'index.html')
writeFileSync(
  index,
  readFileSync(index, 'utf8').replace(
    '<!--all-mods-->',
    mods.map(mod => `<li><a href="mods/${mod.id}/">${esc(mod.name)}</a></li>`).join(''),
  ),
)

writeFileSync(
  join(out, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[SITE, ...mods.map(mod => `${SITE}mods/${mod.id}/`)].map(url => `  <url><loc>${url}</loc></url>`).join('\n')}\n</urlset>\n`,
)
writeFileSync(join(out, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE}sitemap.xml\n`)
console.log(`${mods.length} mod pages`)
