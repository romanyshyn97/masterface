import { onMounted, onUnmounted, ref } from 'vue'

export function useActiveSection(ids: string[]) {
  const active = ref<string | null>(null)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const elements = ids
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    // rootMargin: -80px from top accounts for the sticky header (~72) + small buffer.
    // -50% from bottom means a section is "active" when its top edge is in the
    // upper half of the viewport.
    observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter(e => e.isIntersecting)
        if (intersecting.length === 0) return
        // Pick the entry whose target is highest in the document (smallest index in `ids`).
        intersecting.sort((a, b) => {
          const ai = elements.indexOf(a.target as HTMLElement)
          const bi = elements.indexOf(b.target as HTMLElement)
          return ai - bi
        })
        active.value = intersecting[0].target.id
      },
      { rootMargin: '-80px 0px -50% 0px', threshold: 0 },
    )

    elements.forEach(el => observer!.observe(el))
  })

  onUnmounted(() => observer?.disconnect())

  return active
}
