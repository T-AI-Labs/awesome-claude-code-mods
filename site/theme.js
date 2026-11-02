export const setupTheme = () => {
  const stored = (() => {
    try {
      return localStorage.getItem('theme')
    } catch {
      return null
    }
  })()

  if (stored !== null) document.documentElement.dataset.theme = stored

  document.getElementById('theme').addEventListener('click', () => {
    const current = document.documentElement.dataset.theme
      ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    const next = current === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next

    try {
      localStorage.setItem('theme', next)
    } catch {}
  })
}
