import { readFileSync, writeFileSync } from 'node:fs'

const SITE = 'https://t-ai-labs.github.io/awesome-claude-code-mods/'
const REPO = 'https://github.com/T-AI-Labs/awesome-claude-code-mods'
const WALL = ['flightdeck', 'skins', 'secret-box', 'prismantis', 'intermission', 'usage-pane']

const [resultsPath] = process.argv.slice(2)
const readJson = path => JSON.parse(readFileSync(path, 'utf8'))
const results = readJson(resultsPath)
const categories = readJson('data/categories.json')
const mods = readJson('data/mods.json')
  .map(mod => ({ ...mod, result: results.mods[mod.id] }))
  .filter(mod => mod.result?.validated && mod.result?.tested)

const pageOf = mod => `${SITE}mods/${mod.id}/`
const imageOf = mod => (mod.images[0].endsWith('.svg') ? mod.images[0] : `site/posters/${mod.id}.webp`)
const authorOf = mod => mod.repo.split('/')[0]

const wall = WALL.map(id => mods.find(mod => mod.id === id)).filter(Boolean)
const rows = []

for (let start = 0; start < wall.length; start += 3) {
  rows.push(
    `<tr>${wall
      .slice(start, start + 3)
      .map(mod => `<td width="33%"><a href="${pageOf(mod)}"><img src="${imageOf(mod)}" alt="${mod.name}: ${mod.tagline}"></a></td>`)
      .join('')}</tr>`,
  )
}

const entry = mod => {
  const facts = [
    mod.result.usesTokens ? 'Can use tokens' : 'No tokens',
    mod.result.usesNetwork ? 'Uses network' : 'No network',
    `${mod.result.pass} ${mod.result.pass === 1 ? 'test passes' : 'tests pass'}`,
  ].join(' · ')

  return `<tr>
<td width="280"><a href="${pageOf(mod)}"><img src="${imageOf(mod)}" width="260" alt="${mod.name}"></a></td>
<td><a href="${pageOf(mod)}"><b>${mod.tagline}</b></a><br><code>${mod.name}</code> by ${authorOf(mod)}${mod.own ? ' (ours)' : ''}<br><sub>${facts}</sub></td>
</tr>`
}

const sections = categories
  .filter(category => category.id !== 'all')
  .map(category => [category, mods.filter(mod => mod.category === category.id)])
  .filter(([, list]) => list.length > 0)
  .map(([category, list]) => `### ${category.label}\n\n<table>\n${list.map(entry).join('\n')}\n</table>`)
  .join('\n\n')

const jump = categories
  .filter(category => category.id !== 'all' && mods.some(mod => mod.category === category.id))
  .map(category => `[${category.label}](#${category.label.toLowerCase().replaceAll(' ', '-')})`)
  .join(' · ')

const readme = `<h1 align="center">Claude Code Mods Gallery</h1>

<p align="center"><b>See every mod before you install it.</b><br>${mods.length} hand-picked mods for Claude Code, each with a screenshot, what it does for you, what it costs and a weekly test run.</p>

<p align="center"><a href="${SITE}"><b>Browse the gallery →</b></a></p>

<p align="center"><a href="${REPO}/stargazers"><img src="https://img.shields.io/github/stars/T-AI-Labs/awesome-claude-code-mods?style=social" alt="Star this list on GitHub"></a></p>

<table>
${rows.join('\n')}
</table>

## Why this list

- **You see it first.** Every mod has a real screenshot or recording, so you know what you get before you install anything.
- **You know the cost.** Each mod says whether it can spend tokens, reach the network, run commands or write files.
- **It keeps working.** CI runs each mod's tests every week on the latest Claude Code. A mod that fails leaves the gallery until it passes again.

## Install a mod

Every mod installs with two commands. Each mod's page has the exact ones to copy.

\`\`\`bash
claude plugin marketplace add <owner>/<repo>
claude plugin install <mod>@<marketplace>
\`\`\`

## Find a mod by goal

${jump}

${sections}

## How the testing works

Once a week, CI checks out the exact commit listed in [\`data/mods.json\`](data/mods.json) and runs \`claude plugin validate\` and the mod's own tests on the latest Claude Code, in a job without secrets.

It is not a security audit. A passing run means the mod's own tests pass, not that every feature was used by hand. Tokens, network, commands and files come from the validator's static list of API calls. Screenshots come from the mods' authors. Mods run with your user permissions, so read the source of anything you install.

## Suggest a mod

[Open an issue](${REPO}/issues/new?title=Suggest%20a%20mod%3A%20) with a link to the mod, and you get an answer within 7 days. A mod should:

- solve a clear problem and install from a marketplace
- ship tests that pass under \`claude plugin test\`
- have an open-source license
- have a real screenshot or recording in its repository

**Like the gallery?** [Star this repository](${REPO}/stargazers) so more people find it.

## Develop

The site is plain HTML, CSS and JavaScript in [\`site/\`](site/). \`npm run check\` runs third-party code with your user permissions, so run it only in a sandbox.

\`\`\`bash
npm install
npm run posters
npm run check
npm run assemble
npm run readme
\`\`\`

## Credits

Preview images belong to the mods' authors and come from their repositories under the license each mod names. This list is independent and not affiliated with Anthropic. The code in this repository is under the [MIT license](LICENSE).
`

writeFileSync('README.md', readme)
console.log(`${mods.length} mods in the README`)
