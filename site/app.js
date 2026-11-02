import { setupTheme } from './theme.js'

const CHECK = '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M3 8.5l3.2 3.2L13 4.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'

let CATEGORIES = []
const state = { category: 'all', query: '', noTokens: false, noNetwork: false, sort: 'stars', active: null }
const canPlay = !matchMedia('(prefers-reduced-motion: reduce)').matches

const $ = id => document.getElementById(id)

const el = (tag, props = {}, ...children) => {
  const node = document.createElement(tag)

  for (const [key, value] of Object.entries(props)) {
    if (key === 'class') node.className = value
    else if (key.startsWith('on')) node.addEventListener(key.slice(2), value)
    else if (value !== undefined && value !== false) node.setAttribute(key, value === true ? '' : value)
  }

  node.append(...children.flat().filter(child => child !== null && child !== undefined))

  return node
}

const icon = markup => {
  const holder = document.createElement('span')
  holder.innerHTML = markup

  return holder.firstElementChild
}

const isRecording = url => /\.gif($|\?)/i.test(url)
const isVector = url => /\.svg($|\?)/i.test(url)
const posterOf = mod => (isVector(mod.images[0]) ? mod.images[0] : `posters/${mod.id}.webp`)
const authorOf = mod => mod.repo.split('/')[0]
const installOf = mod => `claude plugin marketplace add ${mod.repo}\nclaude plugin install ${mod.name}@${mod.marketplace}`
const sourceOf = mod => `https://github.com/${mod.repo}/tree/${mod.commit}${mod.path === '.' ? '' : `/${mod.path}`}`

const copyButton = (text, label = 'Copy install') => {
  const button = el('button', {
    class: 'copy',
    type: 'button',
    onclick: async event => {
      event.stopPropagation()

      try {
        await navigator.clipboard.writeText(text)
        button.textContent = 'Copied'
        button.classList.add('done')
      } catch {
        button.textContent = 'Press Ctrl+C'
      }

      setTimeout(() => {
        button.textContent = label
        button.classList.remove('done')
      }, 1800)
    },
  }, label)

  return button
}

const factsOf = mod => [
  mod.result?.usesTokens
    ? { text: 'Can use tokens', kind: 'note' }
    : { text: 'No tokens', kind: 'good' },
  mod.result?.usesNetwork
    ? { text: 'Uses network', kind: 'note' }
    : { text: 'No network', kind: 'good' },
]

const compact = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 })
const relative = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
const DAY = 24 * 60 * 60 * 1000

const ageOf = date => {
  const days = Math.round((new Date(date).getTime() - Date.now()) / DAY)

  if (days > -14) return relative.format(days, 'day')
  if (days > -60) return relative.format(Math.round(days / 7), 'week')
  if (days > -365) return relative.format(Math.round(days / 30), 'month')

  return relative.format(Math.round(days / 365), 'year')
}

const statsOf = mod => {
  const { stars = null, updatedAt = null } = mod.stats ?? {}

  if (stars === null && updatedAt === null) return null

  return el('span', { class: 'stats' },
    stars === null ? null : el('span', { title: 'Stars of the whole repository', 'aria-label': `${stars} stars` }, '★ ', el('b', {}, compact.format(stars))),
    updatedAt === null ? null : el('span', { title: new Date(updatedAt).toLocaleDateString('en', { dateStyle: 'long' }) }, `Updated ${ageOf(updatedAt)}`),
  )
}

const testsLabel = mod => `${mod.result.pass} ${mod.result.pass === 1 ? 'test passes' : 'tests pass'}`

const card = mod => {
  const image = el('img', { src: posterOf(mod), alt: '', loading: 'lazy', decoding: 'async' })
  const recording = isRecording(mod.images[0])
  const play = () => { if (canPlay && recording) image.src = mod.images[0] }
  const stop = () => { if (recording) image.src = posterOf(mod) }

  return el('article', { class: 'card', onmouseenter: play, onmouseleave: stop, onfocusin: play, onfocusout: stop },
    el('div', { class: 'media' },
      image,
      el('span', { class: 'where' }, mod.where),
      recording && canPlay ? el('span', { class: 'play', 'aria-hidden': 'true' }, '▶ Plays on hover') : null,
    ),
    el('div', { class: 'body' },
      el('h3', { class: 'tagline' }, el('a', {
        class: 'open',
        href: `mods/${mod.id}/`,
        onclick: event => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
          event.preventDefault()
          location.hash = mod.id
        },
      }, mod.tagline)),
      el('div', { class: 'byline' },
        el('code', {}, mod.name),
        el('span', {}, `by ${authorOf(mod)}`),
        mod.own ? el('span', { class: 'ours' }, 'Ours') : null,
        statsOf(mod),
      ),
      el('ul', { class: 'facts', 'aria-label': 'Cost and access' },
        factsOf(mod).map(fact => el('li', { class: `fact ${fact.kind}` }, fact.text)),
      ),
      el('div', { class: 'card-foot' },
        el('span', { class: 'tests' }, icon(CHECK), testsLabel(mod)),
        copyButton(installOf(mod)),
      ),
    ),
  )
}

const matches = (mod, { category, query, noTokens, noNetwork }) => {
  if (category !== 'all' && mod.category !== category) return false
  if (noTokens && mod.result.usesTokens) return false
  if (noNetwork && mod.result.usesNetwork) return false

  const haystack = [mod.name, mod.tagline, mod.where, authorOf(mod), ...mod.benefits].join(' ').toLowerCase()

  return query.split(/\s+/).filter(Boolean).every(word => haystack.includes(word))
}

const syncUrl = () => {
  const params = new URLSearchParams()

  if (state.category !== 'all') params.set('category', state.category)
  if (state.query) params.set('q', state.query)
  if (state.noTokens) params.set('tokens', 'no')
  if (state.noNetwork) params.set('network', 'no')
  if (state.sort !== 'stars') params.set('sort', state.sort)

  const query = params.toString()
  history.replaceState(null, '', `${location.pathname}${query ? `?${query}` : ''}${location.hash}`)
}

const reset = () => {
  Object.assign(state, { category: 'all', query: '', noTokens: false, noNetwork: false, sort: 'stars' })
  $('sort').value = 'stars'
  $('search').value = ''
  $('no-tokens').checked = false
  $('no-network').checked = false
  render()
}

let mods = []

const renderChips = () => {
  const counted = { ...state, category: 'all' }
  const pool = mods.filter(mod => matches(mod, counted))

  $('chips').replaceChildren(
    ...CATEGORIES.map(({ id, label }) =>
      el('button', {
        class: 'chip',
        type: 'button',
        'aria-pressed': String(state.category === id),
        onclick: () => {
          state.category = id
          render()
        },
      }, label, el('small', {}, String(id === 'all' ? pool.length : pool.filter(mod => mod.category === id).length))),
    ),
  )
}

const SORTS = {
  picks: () => 0,
  name: (a, b) => a.name.localeCompare(b.name),
  stars: (a, b) => (b.stats?.stars ?? -1) - (a.stats?.stars ?? -1),
  updated: (a, b) => new Date(b.stats?.updatedAt ?? 0) - new Date(a.stats?.updatedAt ?? 0),
}

const visible = () => mods.filter(mod => matches(mod, state)).sort(SORTS[state.sort])

const render = () => {
  const list = visible()

  renderChips()
  $('count').textContent = `${list.length} of ${mods.length} mods`
  $('mods').replaceChildren(
    ...(list.length > 0
      ? list.map(card)
      : [el('div', { class: 'empty' },
          el('p', { style: 'margin:0' }, 'No mod matches this. Try fewer words or turn a filter off.'),
          el('button', { type: 'button', onclick: reset }, 'Show all mods'),
        )]),
  )
  syncUrl()
}

const closeIcon = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
const arrow = direction => `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="${direction === 'prev' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`

const creditOf = (mod, url) => {
  if (mod.own) return 'Illustration by the maintainers of this list.'

  return `${isRecording(url) ? 'Recording' : 'Image'} from ${authorOf(mod)}'s repository.`
}

const accessRows = mod => [
  ['Tokens', mod.result.usesTokens, 'Can send model requests, which count against your usage', 'Makes no model requests'],
  ['Network', mod.result.usesNetwork, 'Can reach the network', 'Makes no network requests'],
  ['Commands', mod.result.runsCommands, 'Can run local commands', 'Runs no commands'],
  ['Files', mod.result.writesFiles, 'Can write files', 'Writes no files directly'],
]

const step = delta => {
  const list = visible()
  const index = list.findIndex(mod => mod.id === state.active)
  const next = list[(index + delta + list.length) % list.length]

  if (next !== undefined) location.hash = next.id
}

const stageOf = mod => {
  const main = el('img', { src: mod.images[0], alt: `${mod.name} in use` })
  const credit = el('p', { class: 'credit' }, creditOf(mod, mod.images[0]))
  const thumbs = mod.images.map((url, index) => {
    const thumb = el('button', {
      class: 'thumb',
      type: 'button',
      'aria-label': `Show image ${index + 1} of ${mod.images.length}`,
      'aria-pressed': String(index === 0),
      onclick: () => {
        main.src = url
        credit.textContent = creditOf(mod, url)
        thumbs.forEach(other => other.setAttribute('aria-pressed', String(other === thumb)))
      },
    }, el('img', { src: index === 0 ? posterOf(mod) : url, alt: '', loading: 'lazy' }))

    return thumb
  })

  return el('div', { class: 'stage' },
    el('div', { class: 'stage-main' }, main),
    mod.images.length > 1 ? el('div', { class: 'thumbs' }, thumbs) : null,
    credit,
  )
}

const openDetail = mod => {
  const dialog = $('detail')
  const checked = new Date(results.checkedAt)

  dialog.replaceChildren(
    stageOf(mod),
    el('div', { class: 'panel' },
      el('div', { class: 'nav' },
        el('button', { class: 'icon', type: 'button', 'aria-label': 'Previous mod', onclick: () => step(-1) }, icon(arrow('prev'))),
        el('button', { class: 'icon', type: 'button', 'aria-label': 'Next mod', onclick: () => step(1) }, icon(arrow('next'))),
        el('button', { class: 'icon', type: 'button', 'aria-label': 'Close', onclick: closeDetail }, icon(closeIcon)),
      ),
      el('div', {},
        el('h2', { id: 'detail-title' }, mod.tagline),
        el('div', { class: 'byline' },
          el('code', {}, mod.name),
          el('span', {}, `by ${authorOf(mod)}`),
          mod.own ? el('span', { class: 'ours' }, 'Ours') : null,
          el('span', {}, `· ${mod.where}`),
          statsOf(mod),
        ),
      ),
      el('section', {},
        el('h3', {}, 'What you get'),
        el('ul', { class: 'benefits' }, mod.benefits.map(benefit => el('li', {}, icon(CHECK), el('span', {}, benefit)))),
      ),
      el('section', {},
        el('h3', {}, 'What it costs and can access'),
        el('dl', { class: 'access' },
          accessRows(mod).map(([label, isUsed, yes, no]) =>
            el('div', {},
              el('dt', {}, label),
              el('dd', {}, el('span', { class: `dot${isUsed ? ' note' : ''}`, 'aria-hidden': 'true' }), isUsed ? yes : no),
            ),
          ),
        ),
      ),
      el('section', {},
        el('h3', {}, 'Test result'),
        el('p', { style: 'margin:0;font-size:14.5px' },
          `${testsLabel(mod)}${mod.result.attempts === 2 ? ' on the second try' : ''} and validation is clean on Claude Code ${results.claudeVersion}, checked ${checked.toLocaleDateString('en', { dateStyle: 'medium' })}. `,
          el('span', { style: 'color:var(--muted)' }, 'Its own tests, not a security audit.'),
        ),
      ),
      el('section', {},
        el('div', { class: 'section-head' }, el('h3', {}, 'Install'), copyButton(installOf(mod), 'Copy')),
        el('pre', { class: 'install' }, installOf(mod)),
      ),
      el('div', { class: 'links' },
        el('a', { href: `mods/${mod.id}/` }, 'Full page'),
        el('a', { href: sourceOf(mod), rel: 'noopener', target: '_blank' }, 'Source at the tested commit'),
        el('a', { href: `https://github.com/${mod.repo}`, rel: 'noopener', target: '_blank' }, 'Repository'),
        el('span', {}, `${mod.license} license`),
      ),
    ),
  )

  if (!dialog.open) dialog.showModal()
  dialog.querySelector('.panel').scrollTop = 0
  state.active = mod.id
}

function closeDetail() {
  $('detail').close()
}

const followHash = () => {
  const mod = mods.find(one => one.id === location.hash.slice(1))

  if (mod !== undefined) {
    openDetail(mod)
  } else if ($('detail').open) {
    $('detail').close()
  }
}

const readUrl = () => {
  const params = new URLSearchParams(location.search)

  state.category = CATEGORIES.some(one => one.id === params.get('category')) ? params.get('category') : 'all'
  state.query = params.get('q') ?? ''
  state.noTokens = params.get('tokens') === 'no'
  state.noNetwork = params.get('network') === 'no'
  state.sort = Object.hasOwn(SORTS, params.get('sort')) ? params.get('sort') : 'stars'
  $('sort').value = state.sort
  $('search').value = state.query
  $('no-tokens').checked = state.noTokens
  $('no-network').checked = state.noNetwork
}

setupTheme()

const [catalog, results, categories, stats] = await Promise.all([
  fetch('data/mods.json').then(response => response.json()),
  fetch('data/results.json').then(response => response.json()),
  fetch('data/categories.json').then(response => response.json()),
  fetch('data/stats.json').then(response => response.json()),
])

CATEGORIES = categories
readUrl()

// A mod whose validation or tests fail leaves the gallery until it passes again.
mods = catalog
  .map(mod => ({ ...mod, result: results.mods[mod.id], stats: stats.mods[mod.id] }))
  .filter(mod => mod.result?.validated && mod.result?.tested)

$('checked').textContent = `Last checked ${new Date(results.checkedAt).toLocaleDateString('en', { dateStyle: 'medium' })} on Claude Code ${results.claudeVersion}.`

$('search').addEventListener('input', event => {
  state.query = event.target.value.trim().toLowerCase()
  render()
})
$('no-tokens').addEventListener('change', event => {
  state.noTokens = event.target.checked
  render()
})
$('no-network').addEventListener('change', event => {
  state.noNetwork = event.target.checked
  render()
})
$('sort').addEventListener('change', event => {
  state.sort = event.target.value
  render()
})

addEventListener('keydown', event => {
  if (event.key === '/' && !$('detail').open && document.activeElement !== $('search')) {
    event.preventDefault()
    $('search').focus()
  }

  if ($('detail').open && event.key === 'ArrowRight') step(1)
  if ($('detail').open && event.key === 'ArrowLeft') step(-1)
})

addEventListener('hashchange', followHash)

$('detail').addEventListener('close', () => {
  state.active = null
  if (location.hash) history.replaceState(null, '', `${location.pathname}${location.search}`)
})
$('detail').addEventListener('click', event => {
  if (event.target === $('detail')) closeDetail()
})

render()
followHash()
