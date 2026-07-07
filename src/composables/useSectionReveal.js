import { watch, nextTick, onBeforeUnmount } from 'vue'
import { gsap } from '../plugins/gsap.js'

export function useSectionReveal(rootRef, isActive) {
  let ctx = null

  function play() {
    if (!rootRef.value) return
    ctx?.revert()
    ctx = gsap.context(() => {
      gsap.from('.reveal', {
        y: 42,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.12,
      })
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
