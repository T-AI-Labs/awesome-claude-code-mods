import { setupTheme } from './theme.js'

setupTheme()

for (const button of document.querySelectorAll('[data-copy]')) {
  const label = button.textContent

  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy)
      button.textContent = 'Copied'
      button.classList.add('done')
    } catch {
      button.textContent = 'Press Ctrl+C'
    }

    setTimeout(() => {
      button.textContent = label
      button.classList.remove('done')
    }, 1800)
  })
}
