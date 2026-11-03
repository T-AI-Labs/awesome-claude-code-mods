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

const wall = WALL.map(id => mods.find(mod => mod.id === id)).filter(Boolean)
const rows = []

for (let start = 0; start < wall.length; start += 3) {
  rows.push(
    `<tr>${wall
      .slice(start, start + 3)
      // The hash opens the mod in the gallery and still lands on the gallery if the mod has dropped out since.
      .map(mod => `<td width="33%"><a href="${SITE}#${mod.id}"><img src="${mod.images[0]}" alt="${mod.name}: ${mod.tagline}"></a></td>`)
      .join('')}</tr>`,
  )
}

const browse = categories
  .filter(category => category.id !== 'all')
  .map(category => `- [${category.label}](${SITE}?category=${category.id}): ${category.description}`)
  .join('\n')

const readme = `<h1 align="center">Claude Code Mods Gallery</h1>

<p align="center"><b>See every mod before you install it.</b><br>Hand-picked mods for Claude Code, each with a screenshot, what it does for you, what it costs and a weekly test run.</p>

<p align="center"><a href="${SITE}"><b>Browse the gallery →</b></a></p>

<p align="center"><a href="${REPO}/stargazers"><img src="https://img.shields.io/github/stars/T-AI-Labs/awesome-claude-code-mods?style=social" alt="Star this list on GitHub"></a></p>

<table>
${rows.join('\n')}
</table>

## Browse by category

${browse}

## Why this list

- **You see it first.** Every mod has a real screenshot or recording, so you know what you get before you install anything.
- **You know the cost.** Each mod says whether it can spend tokens, reach the network, run commands or write files.
- **It keeps working.** CI runs each mod's tests every week on the latest Claude Code. A mod that fails twice in a row leaves the gallery until it passes again.

## How the testing works

Once a week, CI checks out the exact commit listed in [\`data/mods.json\`](data/mods.json) and runs \`claude plugin validate\` and the mod's own tests on the latest Claude Code, in a job without secrets. A failed test run gets one retry. Every night CI also checks each mod's images and links. A mod with a link that no longer exists leaves the gallery until it works again.

It is not a security audit. A passing run means the mod's own tests pass, not that every feature was used by hand. Tokens, network, commands and files come from the validator's static list of API calls. Screenshots come from the mods' authors. The install commands fetch the author's latest version, which can be newer than the tested commit. Mods run with your user permissions, so read the source of anything you install.

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
npm run check
npm run stats
npm run links
npm run assemble
npm run readme
\`\`\`

## Credits

Preview images belong to the mods' authors and load directly from their repositories. This list is independent and not affiliated with Anthropic. The code in this repository is under the [MIT license](LICENSE).
`

writeFileSync('README.md', readme)
console.log(`${wall.length} mods on the wall`)
