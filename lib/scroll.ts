const HEADER_OFFSET = 72 // matches sticky header height (px)

export function scrollToHash(hash: string) {
  const id = hash.startsWith('#') ? hash.slice(1) : hash
  if (id === '') {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
    return
  }
  const target = document.getElementById(id)
  if (!target) return
  const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' })
}
