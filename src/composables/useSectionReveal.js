import { watch, nextTick, onBeforeUnmount } from 'vue'
import { gsap } from '../plugins/gsap.js'

export function useSectionReveal(rootRef, isActive, options = {}) {
  const {
    selector = '.reveal',
    from = { y: 42, opacity: 0 },
    to = null,
    duration = 0.7,
    stagger = 0.12,
    delay = 0,
    ease = 'power3.out',
  } = options

  let ctx = null

  function play() {
    if (!rootRef.value) return
    ctx?.revert()
    ctx = gsap.context(() => {
      const vars = { duration, ease, stagger, delay }
      if (to) gsap.fromTo(selector, from, { ...to, ...vars })
      else gsap.from(selector, { ...from, ...vars })
    }, rootRef.value)
  }

  watch(
    isActive,
    (active) => {
      if (active) nextTick(play)
    },
    { immediate: true }
  )

  onBeforeUnmount(() => ctx?.revert())
}
