import { spawnSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const TEST_TIMEOUT = 180_000
const OUTPUT_LIMIT = 64 * 1024 * 1024

const TOKEN_CALLS = /^\$\.(model\.|prompt\.submit|agent\.spawn|session\.compact)/
const NETWORK_CALLS = /^\$\.http\./
const COMMAND_CALLS = /^\$\.(process\.|shell\.)/
const FILE_WRITE_CALLS = /^\$\.fs\.(write|append|delete|remove|mkdir|rename|copy)/

const [outPath = 'results.json'] = process.argv.slice(2)
const mods = JSON.parse(readFileSync(new URL('../data/mods.json', import.meta.url), 'utf8'))

const run = (command, args, options = {}) =>
  spawnSync(command, args, { encoding: 'utf8', maxBuffer: OUTPUT_LIMIT, shell: process.platform === 'win32', ...options })

const checkout = (mod, dir) => {
  for (const args of [
    ['init', '-q', dir],
    ['-C', dir, 'remote', 'add', 'origin', `https://github.com/${mod.repo}.git`],
    ['-C', dir, 'fetch', '-q', '--depth', '1', 'origin', mod.commit],
    ['-C', dir, 'checkout', '-q', 'FETCH_HEAD'],
  ]) {
    if (run('git', args).status !== 0) {
      return false
    }
  }

  return true
}

const callsOf = report => {
  const notes = [report.manifest, ...(report.contents ?? [])].flatMap(part => part?.notes ?? [])
  const calls = notes
    .map(note => note.match(/ calls: (.*)$/)?.[1])
    .filter(Boolean)
    .flatMap(list => list.split(', ').map(call => call.split(' ')[0]))

  return [...new Set(calls)].filter(call => call.startsWith('$.')).sort()
}

const validate = dir => {
  const { stdout, status } = run('claude', ['plugin', 'validate', dir, '--json'])

  try {
    return { passed: status === 0, calls: callsOf(JSON.parse(stdout)) }
  } catch {
    return { passed: false, calls: [] }
  }
}

const test = dir => {
  const { stdout, stderr, status } = run('claude', ['plugin', 'test', dir], { timeout: TEST_TIMEOUT })
  const output = `${stdout}\n${stderr}`
  const count = word => Number(output.match(new RegExp(`(\\d+) ${word}\\b`))?.[1] ?? 0)

  return { passed: status === 0 && count('pass') > 0, pass: count('pass'), fail: count('fail') }
}

const check = mod => {
  const dir = mkdtempSync(join(tmpdir(), 'mod-'))

  try {
    if (!checkout(mod, dir)) {
      return { checkedOut: false, validated: false, tested: false, pass: 0, fail: 0, calls: [] }
    }

    const target = mod.path === '.' ? dir : join(dir, mod.path)
    const validated = validate(target)
    const tested = test(target)

    return {
      checkedOut: true,
      validated: validated.passed,
      tested: tested.passed,
      pass: tested.pass,
      fail: tested.fail,
      calls: validated.calls,
      usesTokens: validated.calls.some(call => TOKEN_CALLS.test(call)),
      usesNetwork: validated.calls.some(call => NETWORK_CALLS.test(call)),
      runsCommands: validated.calls.some(call => COMMAND_CALLS.test(call)),
      writesFiles: validated.calls.some(call => FILE_WRITE_CALLS.test(call)),
    }
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

const version = run('claude', ['--version']).stdout.trim().split(' ')[0]
const results = {}

for (const mod of mods) {
  results[mod.id] = check(mod)
  console.log(mod.id, JSON.stringify({ ...results[mod.id], calls: undefined }))
}

mkdirSync(join(outPath, '..'), { recursive: true })
writeFileSync(outPath, `${JSON.stringify({ claudeVersion: version, checkedAt: new Date().toISOString(), mods: results }, null, 2)}\n`)
