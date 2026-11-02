# Tested Mods for Claude Code

**[Browse the gallery](https://t-ai-labs.github.io/awesome-claude-code-mods/)**

Hand-picked Claude Code mods you can see before you install: a screenshot, what each one does for you, what it costs and whether its tests pass.

For every mod in the list, CI checks out the exact commit named in [`data/mods.json`](data/mods.json) once a week and runs `claude plugin validate` and the mod's own tests on the latest Claude Code. A mod that stops passing leaves the gallery until it passes again.

This is not a security audit. A passing run means the mod's own tests pass. Tokens, network and commands come from the validator's static list of API calls. Mods run with your user permissions, so read the source of anything you install.

## Suggest a mod

[Open an issue](https://github.com/T-AI-Labs/awesome-claude-code-mods/issues/new?title=Suggest%20a%20mod%3A%20) with a link to the mod. It should:

- solve a clear problem and install with one command from a marketplace
- ship tests that pass under `claude plugin test`
- have an open-source license
- have a real screenshot or recording in its repository

Suggestions get an answer within 7 days.

## Develop

The site is plain HTML, CSS and JavaScript in [`site/`](site/). CI adds `data/mods.json` and the test results when it publishes.

```bash
npm install
npm run posters
npm run check
```

`npm run check` runs third-party code with your user permissions, so run it only in a sandbox. `npm run posters` makes the first-frame previews in `site/posters/` from each mod's first image.

## Credits

Preview images belong to the mods' authors and come from their repositories under the license each mod names. This list is independent and not affiliated with Anthropic. The code in this repository is under the [MIT license](LICENSE).
