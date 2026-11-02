<h1 align="center">Claude Code Mods Gallery</h1>

<p align="center"><b>See every mod before you install it.</b><br>29 hand-picked mods for Claude Code, each with a screenshot, what it does for you, what it costs and a weekly test run.</p>

<p align="center"><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/"><b>Browse the gallery →</b></a></p>

<p align="center"><a href="https://github.com/T-AI-Labs/awesome-claude-code-mods/stargazers"><img src="https://img.shields.io/github/stars/T-AI-Labs/awesome-claude-code-mods?style=social" alt="Star this list on GitHub"></a></p>

<table>
<tr><td width="33%"><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/flightdeck/"><img src="site/posters/flightdeck.webp" alt="flightdeck: Watch every agent, permission check and turn on one live dashboard."></a></td><td width="33%"><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/skins/"><img src="site/posters/skins.webp" alt="skins: Give Claude Code a whole new look, with cards for code, diffs and tables."></a></td><td width="33%"><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/secret-box/"><img src="site/posters/secret-box.webp" alt="secret-box: Let Claude use your API keys without ever seeing them."></a></td></tr>
<tr><td width="33%"><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/prismantis/"><img src="site/posters/prismantis.webp" alt="prismantis: Turn plain replies into colorful, easy-to-scan answers."></a></td><td width="33%"><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/intermission/"><img src="site/posters/intermission.webp" alt="intermission: Play Doom while Claude works, and get handed back when it is done."></a></td><td width="33%"><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/usage-pane/"><img src="https://raw.githubusercontent.com/T-AI-Labs/claude-code-mods/098dafc072329b331b6b6810c18b4bf115a69884/.docs/usage-pane.svg" alt="usage-pane: See where your tokens went, down to the prompts that cost the most."></a></td></tr>
</table>

## Why this list

- **You see it first.** Every mod has a real screenshot or recording, so you know what you get before you install anything.
- **You know the cost.** Each mod says whether it can spend tokens, reach the network, run commands or write files.
- **It keeps working.** CI runs each mod's tests every week on the latest Claude Code. A mod that fails leaves the gallery until it passes again.

## Install a mod

Every mod installs with two commands. Each mod's page has the exact ones to copy.

```bash
claude plugin marketplace add <owner>/<repo>
claude plugin install <mod>@<marketplace>
```

## Browse by category

[💰 Cost & Usage](#-cost--usage) · [📊 Monitoring](#-monitoring) · [🔒 Security](#-security) · [🎨 Themes & Display](#-themes--display) · [⚡ Productivity](#-productivity) · [🎮 Games & Fun](#-games--fun)

### 💰 Cost & Usage

<table>
<tr>
<td width="280"><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/context-usage/"><img src="https://raw.githubusercontent.com/T-AI-Labs/claude-code-mods/098dafc072329b331b6b6810c18b4bf115a69884/.docs/context-usage.svg" width="260" alt="context-usage"></a></td>
<td><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/context-usage/"><b>Know how full your context is and how much of your limits is left.</b></a><br><code>context-usage</code> by T-AI-Labs (ours)<br><sub>No tokens · No network · 17 tests pass</sub></td>
</tr>
<tr>
<td width="280"><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/usage-pane/"><img src="https://raw.githubusercontent.com/T-AI-Labs/claude-code-mods/098dafc072329b331b6b6810c18b4bf115a69884/.docs/usage-pane.svg" width="260" alt="usage-pane"></a></td>
<td><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/usage-pane/"><b>See where your tokens went, down to the prompts that cost the most.</b></a><br><code>usage-pane</code> by T-AI-Labs (ours)<br><sub>No tokens · No network · 10 tests pass</sub></td>
</tr>
<tr>
<td width="280"><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/cache-meter/"><img src="https://raw.githubusercontent.com/T-AI-Labs/claude-code-mods/098dafc072329b331b6b6810c18b4bf115a69884/.docs/cache-meter.svg" width="260" alt="cache-meter"></a></td>
<td><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/cache-meter/"><b>Stop paying to rebuild a prompt cache that just went cold.</b></a><br><code>cache-meter</code> by T-AI-Labs (ours)<br><sub>Can use tokens · No network · 10 tests pass</sub></td>
</tr>
<tr>
<td width="280"><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/cache-clock/"><img src="site/posters/cache-clock.webp" width="260" alt="cache-clock"></a></td>
<td><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/cache-clock/"><b>Get a countdown before your prompt cache goes cold.</b></a><br><code>cache-clock</code> by ray-amjad<br><sub>Can use tokens · No network · 15 tests pass</sub></td>
</tr>
<tr>
<td width="280"><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/agent-usage-guard/"><img src="site/posters/agent-usage-guard.webp" width="260" alt="agent-usage-guard"></a></td>
<td><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/agent-usage-guard/"><b>Catch runaway subagents before they burn through your usage window.</b></a><br><code>agent-usage-guard</code> by rbartoli<br><sub>Can use tokens · No network · 100 tests pass</sub></td>
</tr>
<tr>
<td width="280"><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/ccswap/"><img src="site/posters/ccswap.webp" width="260" alt="ccswap"></a></td>
<td><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/ccswap/"><b>Switch between Claude accounts without leaving your session.</b></a><br><code>ccswap</code> by errhythm<br><sub>No tokens · No network · 18 tests pass</sub></td>
</tr>
</table>

### 📊 Monitoring

<table>
<tr>
<td width="280"><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/flightdeck/"><img src="site/posters/flightdeck.webp" width="260" alt="flightdeck"></a></td>
<td><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/flightdeck/"><b>Watch every agent, permission check and turn on one live dashboard.</b></a><br><code>flightdeck</code> by scasella<br><sub>No tokens · No network · 50 tests pass</sub></td>
</tr>
<tr>
<td width="280"><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/filetree/"><img src="site/posters/filetree.webp" width="260" alt="filetree"></a></td>
<td><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/filetree/"><b>See which files Claude is working in, in an IDE-style tree.</b></a><br><code>filetree</code> by data-goblin<br><sub>No tokens · No network · 125 tests pass</sub></td>
</tr>
<tr>
<td width="280"><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/catalog-pane/"><img src="https://raw.githubusercontent.com/T-AI-Labs/claude-code-mods/098dafc072329b331b6b6810c18b4bf115a69884/.docs/catalog-pane.svg" width="260" alt="catalog-pane"></a></td>
<td><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/catalog-pane/"><b>Find everything you have installed, and what it costs, in one place.</b></a><br><code>catalog-pane</code> by T-AI-Labs (ours)<br><sub>Can use tokens · Uses network · 18 tests pass</sub></td>
</tr>
</table>

### 🔒 Security

<table>
<tr>
<td width="280"><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/secret-box/"><img src="site/posters/secret-box.webp" width="260" alt="secret-box"></a></td>
<td><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/secret-box/"><b>Let Claude use your API keys without ever seeing them.</b></a><br><code>secret-box</code> by ray-amjad<br><sub>No tokens · No network · 77 tests pass</sub></td>
</tr>
<tr>
<td width="280"><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/transcript-redactor/"><img src="site/posters/transcript-redactor.webp" width="260" alt="transcript-redactor"></a></td>
<td><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/transcript-redactor/"><b>Keep secrets and email addresses out of your session transcript.</b></a><br><code>transcript-redactor</code> by ray-amjad<br><sub>No tokens · No network · 37 tests pass</sub></td>
</tr>
</table>

### 🎨 Themes & Display

<table>
<tr>
<td width="280"><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/prismantis/"><img src="site/posters/prismantis.webp" width="260" alt="prismantis"></a></td>
<td><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/prismantis/"><b>Turn plain replies into colorful, easy-to-scan answers.</b></a><br><code>prismantis</code> by NahumLitvin<br><sub>No tokens · No network · 943 tests pass</sub></td>
</tr>
<tr>
<td width="280"><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/skins/"><img src="site/posters/skins.webp" width="260" alt="skins"></a></td>
<td><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/skins/"><b>Give Claude Code a whole new look, with cards for code, diffs and tables.</b></a><br><code>skins</code> by hellosverre<br><sub>No tokens · Uses network · 253 tests pass</sub></td>
</tr>
<tr>
<td width="280"><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/readable-layout/"><img src="site/posters/readable-layout.webp" width="260" alt="readable-layout"></a></td>
<td><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/readable-layout/"><b>Make the terminal transcript read like a conversation.</b></a><br><code>readable-layout</code> by GarvitNangru<br><sub>No tokens · No network · 15 tests pass</sub></td>
</tr>
<tr>
<td width="280"><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/firelight/"><img src="site/posters/firelight.webp" width="260" alt="firelight"></a></td>
<td><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/firelight/"><b>Work in a warm, low-glare color theme.</b></a><br><code>firelight</code> by GarvitNangru<br><sub>No tokens · No network · 7 tests pass</sub></td>
</tr>
<tr>
<td width="280"><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/image-view/"><img src="site/posters/image-view.webp" width="260" alt="image-view"></a></td>
<td><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/image-view/"><b>See the images you paste, not just [Image #1].</b></a><br><code>image-view</code> by jarrodwatts<br><sub>No tokens · No network · 19 tests pass</sub></td>
</tr>
</table>

### ⚡ Productivity

<table>
<tr>
<td width="280"><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/human-in-the-loop/"><img src="site/posters/human-in-the-loop.webp" width="260" alt="human-in-the-loop"></a></td>
<td><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/human-in-the-loop/"><b>Never lose track of what Claude needs from you.</b></a><br><code>human-in-the-loop</code> by tzafrir<br><sub>Can use tokens · No network · 192 tests pass</sub></td>
</tr>
<tr>
<td width="280"><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/decision-tree/"><img src="site/posters/decision-tree.webp" width="260" alt="decision-tree"></a></td>
<td><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/decision-tree/"><b>Understand the choice Claude is asking you to make, and try each option.</b></a><br><code>decision-tree</code> by ray-amjad<br><sub>Can use tokens · No network · 2 tests pass</sub></td>
</tr>
<tr>
<td width="280"><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/diagram-pane/"><img src="site/posters/diagram-pane.webp" width="260" alt="diagram-pane"></a></td>
<td><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/diagram-pane/"><b>Keep every diagram Claude draws beside your work.</b></a><br><code>diagram-pane</code> by ray-amjad<br><sub>Can use tokens · No network · 32 tests pass</sub></td>
</tr>
<tr>
<td width="280"><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/prompt-bouncer/"><img src="site/posters/prompt-bouncer.webp" width="260" alt="prompt-bouncer"></a></td>
<td><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/prompt-bouncer/"><b>Catch vague prompts before they waste a turn.</b></a><br><code>prompt-bouncer</code> by ray-amjad<br><sub>Can use tokens · No network · 9 tests pass</sub></td>
</tr>
<tr>
<td width="280"><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/dream-pass/"><img src="site/posters/dream-pass.webp" width="260" alt="dream-pass"></a></td>
<td><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/dream-pass/"><b>Clean up Claude's memory, with a backup and undo.</b></a><br><code>dream-pass</code> by ray-amjad<br><sub>Can use tokens · No network · 18 tests pass</sub></td>
</tr>
<tr>
<td width="280"><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/brewmod-reminders/"><img src="site/posters/brewmod-reminders.webp" width="260" alt="brewmod-reminders"></a></td>
<td><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/brewmod-reminders/"><b>Set reminders that survive between sessions.</b></a><br><code>brewmod-reminders</code> by kochetkov-ma<br><sub>Can use tokens · No network · 152 tests pass</sub></td>
</tr>
<tr>
<td width="280"><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/show-your-work/"><img src="site/posters/show-your-work.webp" width="260" alt="show-your-work"></a></td>
<td><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/show-your-work/"><b>Review what Claude built with screenshots and videos in your terminal.</b></a><br><code>show-your-work</code> by iamumeransari<br><sub>No tokens · Uses network · 117 tests pass</sub></td>
</tr>
<tr>
<td width="280"><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/hal-grammar-check/"><img src="site/posters/hal-grammar-check.webp" width="260" alt="hal-grammar-check"></a></td>
<td><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/hal-grammar-check/"><b>Fix your grammar while you type a prompt.</b></a><br><code>hal-grammar-check</code> by vinta<br><sub>Can use tokens · No network · 8 tests pass</sub></td>
</tr>
</table>

### 🎮 Games & Fun

<table>
<tr>
<td width="280"><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/intermission/"><img src="site/posters/intermission.webp" width="260" alt="intermission"></a></td>
<td><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/intermission/"><b>Play Doom while Claude works, and get handed back when it is done.</b></a><br><code>intermission</code> by jarrodwatts<br><sub>No tokens · No network · 16 tests pass</sub></td>
</tr>
<tr>
<td width="280"><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/code-pet/"><img src="site/posters/code-pet.webp" width="260" alt="code-pet"></a></td>
<td><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/code-pet/"><b>Get a pixel pet that reacts to everything Claude does.</b></a><br><code>code-pet</code> by OneWave-AI<br><sub>No tokens · No network · 12 tests pass</sub></td>
</tr>
<tr>
<td width="280"><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/sportscaster/"><img src="site/posters/sportscaster.webp" width="260" alt="sportscaster"></a></td>
<td><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/sportscaster/"><b>Hear your session as live TV play-by-play.</b></a><br><code>sportscaster</code> by OneWave-AI<br><sub>Can use tokens · No network · 15 tests pass</sub></td>
</tr>
<tr>
<td width="280"><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/pixel-pet/"><img src="site/posters/pixel-pet.webp" width="260" alt="pixel-pet"></a></td>
<td><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/pixel-pet/"><b>Keep an animated pixel companion above your prompt.</b></a><br><code>pixel-pet</code> by lakmadev<br><sub>No tokens · No network · 37 tests pass</sub></td>
</tr>
<tr>
<td width="280"><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/claude-pets/"><img src="site/posters/claude-pets.webp" width="260" alt="pets"></a></td>
<td><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/mods/claude-pets/"><b>Raise a pixel pet that grows as you work.</b></a><br><code>pets</code> by uppinote20<br><sub>No tokens · No network · 41 tests pass</sub></td>
</tr>
</table>

## How the testing works

Once a week, CI checks out the exact commit listed in [`data/mods.json`](data/mods.json) and runs `claude plugin validate` and the mod's own tests on the latest Claude Code, in a job without secrets.

It is not a security audit. A passing run means the mod's own tests pass, not that every feature was used by hand. Tokens, network, commands and files come from the validator's static list of API calls. Screenshots come from the mods' authors. Mods run with your user permissions, so read the source of anything you install.

## Suggest a mod

[Open an issue](https://github.com/T-AI-Labs/awesome-claude-code-mods/issues/new?title=Suggest%20a%20mod%3A%20) with a link to the mod, and you get an answer within 7 days. A mod should:

- solve a clear problem and install from a marketplace
- ship tests that pass under `claude plugin test`
- have an open-source license
- have a real screenshot or recording in its repository

**Like the gallery?** [Star this repository](https://github.com/T-AI-Labs/awesome-claude-code-mods/stargazers) so more people find it.

## Develop

The site is plain HTML, CSS and JavaScript in [`site/`](site/). `npm run check` runs third-party code with your user permissions, so run it only in a sandbox.

```bash
npm install
npm run posters
npm run check
npm run assemble
npm run readme
```

## Credits

Preview images belong to the mods' authors and come from their repositories under the license each mod names. This list is independent and not affiliated with Anthropic. The code in this repository is under the [MIT license](LICENSE).
