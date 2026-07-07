<template>
  <main
    ref="stage"
    class="stage"
    :class="{ 'is-entered': entered }"
    tabindex="0"
    @keydown="onKeydown"
  >
    <div class="stage__track" :style="vStyle" @transitionend="onTransitionEnd">
      <div v-for="(item, i) in items" :key="item.id" class="stage__section">
        <AboutSection
          v-if="item.id === 'about'"
          :item="item"
          :active="i === sectionIndex"
        />
        <WorkSection
          v-else-if="item.id === 'work'"
          :inner-index="workIndex"
          :active="i === sectionIndex"
          @select-project="setWork"
        />
        <component
          :is="sectionMap[item.id]"
          v-else
          :active="i === sectionIndex"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import AboutSection from './sections/AboutSection.vue'
import WorkSection from './sections/WorkSection.vue'
import SkillsSection from './sections/SkillsSection.vue'
import ContactSection from './sections/ContactSection.vue'
import { projects } from '../data/projects.js'

const props = defineProps({
  items: { type: Array, required: true },
  sectionIndex: { type: Number, default: 0 },
  workIndex: { type: Number, default: 0 },
  entered: { type: Boolean, default: false },
})

const emit = defineEmits(['update:sectionIndex', 'update:workIndex'])

const sectionMap = {
  skills: SkillsSection,
  contact: ContactSection,
}

const WORK_LAST = projects.length - 1
const stage = ref(null)
const isAnimating = ref(false)
let touchStartY = 0

const vStyle = computed(() => ({
  transform: `translateY(-${props.sectionIndex * 100}vh)`,
}))

const lastSection = computed(() => props.items.length - 1)
const activeId = computed(() => props.items[props.sectionIndex]?.id)

function isNarrow() {
  return window.matchMedia('(max-width: 860px)').matches
}

function setWork(index) {
  if (isAnimating.value || index === props.workIndex) return
  isAnimating.value = true
  emit('update:workIndex', index)
}

function goSection(index) {
  const clamped = Math.max(0, Math.min(lastSection.value, index))
  if (clamped === props.sectionIndex) return
  isAnimating.value = true
  emit('update:sectionIndex', clamped)
}

function step(direction) {
  if (isAnimating.value) return
  if (activeId.value === 'work') {
    if (direction > 0) {
      if (props.workIndex < WORK_LAST) setWork(props.workIndex + 1)
      else goSection(props.sectionIndex + 1)
    } else if (props.workIndex > 0) {
      setWork(props.workIndex - 1)
    } else {
      goSection(props.sectionIndex - 1)
    }
  } else {
    goSection(props.sectionIndex + (direction > 0 ? 1 : -1))
  }
}

function onWheel(e) {
  if (isNarrow()) return
  e.preventDefault()
  if (Math.abs(e.deltaY) < 8) return
  step(e.deltaY > 0 ? 1 : -1)
}

function onTouchStart(e) {
  touchStartY = e.touches[0].clientY
}

function onTouchEnd(e) {
  if (isNarrow()) return
  const delta = touchStartY - e.changedTouches[0].clientY
  if (Math.abs(delta) < 40) return
  step(delta > 0 ? 1 : -1)
}

function onKeydown(e) {
  if (isNarrow()) return
  if (['ArrowDown', 'ArrowRight', 'PageDown'].includes(e.key)) {
    e.preventDefault()
    step(1)
  } else if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.key)) {
    e.preventDefault()
    step(-1)
  }
}

function onTransitionEnd(e) {
  if (e.propertyName !== 'transform') return
  const t = e.target
  if (
    t.classList.contains('stage__track') ||
    t.classList.contains('work__track')
  ) {
    isAnimating.value = false
  }
}

onMounted(() => {
  const el = stage.value
  el.addEventListener('wheel', onWheel, { passive: false })
  el.addEventListener('touchstart', onTouchStart, { passive: true })
  el.addEventListener('touchend', onTouchEnd, { passive: true })
})

onBeforeUnmount(() => {
  const el = stage.value
  el.removeEventListener('wheel', onWheel)
  el.removeEventListener('touchstart', onTouchStart)
  el.removeEventListener('touchend', onTouchEnd)
})
</script>

<style scoped lang="scss">
.stage {
  flex: 1;
  min-width: 0;
  height: 100%;
  overflow: hidden;
  background: var(--color-bg);
  outline: none;
  opacity: 0;
  transform: translateY(24px);
  transition: opacity $transition-enter, transform $transition-enter;
  transition-delay: 0.06s;

  &.is-entered {
    opacity: 1;
    transform: translateY(0);
  }

  &__track {
    transition: $transition-slide;
    will-change: transform;
  }

  &__section {
    height: 100vh;
  }

  @include respond-to($bp-md) {
    height: auto;
    overflow: visible;

    &__track {
      transform: none !important;
    }

    &__section {
      height: auto;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .stage {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
