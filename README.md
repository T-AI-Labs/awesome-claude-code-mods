<h1 align="center">Claude Code Mods Gallery</h1>

<p align="center"><b>See every mod before you install it.</b><br>Hand-picked mods for Claude Code, each with a screenshot, what it does for you, what it costs and a weekly test run.</p>

<p align="center"><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/"><b>Browse the gallery →</b></a></p>

<p align="center"><a href="https://github.com/T-AI-Labs/awesome-claude-code-mods/stargazers"><img src="https://img.shields.io/github/stars/T-AI-Labs/awesome-claude-code-mods?style=social" alt="Star this list on GitHub"></a></p>

<table>
<tr><td width="33%"><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/#flightdeck"><img src="https://raw.githubusercontent.com/scasella/claude-flightdeck/f9c3c5230775109de4bd08c5c7a42112a6a2a885/docs/media/demo.gif" alt="flightdeck: Watch every agent, permission check and turn on one live dashboard."></a></td><td width="33%"><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/#skins"><img src="https://raw.githubusercontent.com/hellosverre/claude-skins/985ad63fdb3483bbb98f61cf57955cac3f56a449/docs/demo.gif" alt="skins: Give Claude Code a whole new look, with cards for code, diffs and tables."></a></td><td width="33%"><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/#secret-box"><img src="https://raw.githubusercontent.com/ray-amjad/claude-code-mods/4ee4b4c1be3fa71ac2d0f12dd0fc887ea8d561df/plugins/secret-box/screenshot.png" alt="secret-box: Let Claude use your API keys without ever seeing them."></a></td></tr>
<tr><td width="33%"><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/#prismantis"><img src="https://raw.githubusercontent.com/NahumLitvin/prismantis/e08bebe191e8f14334a17a1c684520dcf95bbeb4/docs/tour.gif" alt="prismantis: Turn plain replies into colorful, easy-to-scan answers."></a></td><td width="33%"><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/#intermission"><img src="https://raw.githubusercontent.com/jarrodwatts/intermission/8978f61efc890c13dcbed2d78ced224a6715feb8/intermission-preview.png" alt="intermission: Play Doom while Claude works, and get handed back when it is done."></a></td><td width="33%"><a href="https://t-ai-labs.github.io/awesome-claude-code-mods/#usage-pane"><img src="https://raw.githubusercontent.com/T-AI-Labs/claude-code-mods/098dafc072329b331b6b6810c18b4bf115a69884/.docs/usage-pane.svg" alt="usage-pane: See where your tokens went, down to the prompts that cost the most."></a></td></tr>
</table>

## Browse by category

- [💰 Cost & Usage](https://t-ai-labs.github.io/awesome-claude-code-mods/?category=cost): see your tokens, limits and prompt cache, and spend less
- [📊 Monitoring](https://t-ai-labs.github.io/awesome-claude-code-mods/?category=overview): watch agents, files and everything you have installed
- [🔒 Security](https://t-ai-labs.github.io/awesome-claude-code-mods/?category=safety): keep API keys and secrets out of Claude's reach
- [🎨 Themes & Display](https://t-ai-labs.github.io/awesome-claude-code-mods/?category=read): better-looking answers, themes and pasted images
- [⚡ Productivity](https://t-ai-labs.github.io/awesome-claude-code-mods/?category=flow): tasks, diagrams, memory and clearer prompts
- [🎮 Games & Fun](https://t-ai-labs.github.io/awesome-claude-code-mods/?category=fun): games and pixel pets while Claude works

## Why this list

- **You see it first.** Every mod has a real screenshot or recording, so you know what you get before you install anything.
- **You know the cost.** Each mod says whether it can spend tokens, reach the network, run commands or write files.
- **It keeps working.** CI runs each mod's tests every week on the latest Claude Code. A mod that fails twice in a row leaves the gallery until it passes again.

## How the testing works

Once a week, CI checks out the exact commit listed in [`data/mods.json`](data/mods.json) and runs `claude plugin validate` and the mod's own tests on the latest Claude Code, in a job without secrets. A failed test run gets one retry.

It is not a security audit. A passing run means the mod's own tests pass, not that every feature was used by hand. Tokens, network, commands and files come from the validator's static list of API calls. Screenshots come from the mods' authors. The install commands fetch the author's latest version, which can be newer than the tested commit. Mods run with your user permissions, so read the source of anything you install.

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
npm run check
npm run stats
npm run assemble
npm run readme
```

## Credits

Preview images belong to the mods' authors and load directly from their repositories. This list is independent and not affiliated with Anthropic. The code in this repository is under the [MIT license](LICENSE).
