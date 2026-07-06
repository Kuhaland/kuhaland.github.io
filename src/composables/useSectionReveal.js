import { inject, watch, onBeforeUnmount } from 'vue'
import { gsap } from '../plugins/gsap.js'

export function useSectionReveal(rootRef) {
  const scrollerEl = inject('scrollerEl', null)
  let ctx = null

  function build(scroller) {
    if (!rootRef.value || !scroller) return
    ctx?.revert()
    ctx = gsap.context(() => {
      gsap.from('.reveal', {
        y: 42,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          scroller,
          trigger: rootRef.value,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
      })
    }, rootRef.value)
  }

  watch(
    () => scrollerEl?.value,
    (el) => {
      if (el) build(el)
    },
    { immediate: true }
  )

  onBeforeUnmount(() => ctx?.revert())
}
