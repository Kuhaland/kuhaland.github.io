<template>
  <main ref="stage" class="stage">
    <div class="stage__track" :style="vStyle" @transitionend="onTransitionEnd">
      <div v-for="(item, i) in items" :key="item.id" class="stage__section">
        <IntroSection
          v-if="item.id === 'about'"
          :inner-index="innerIndex"
          :active="i === sectionIndex"
          @select-sample="setInner"
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
import IntroSection from './sections/IntroSection.vue'
import WorkSection from './sections/WorkSection.vue'
import SkillsSection from './sections/SkillsSection.vue'
import ContactSection from './sections/ContactSection.vue'

const props = defineProps({
  items: { type: Array, required: true },
  sectionIndex: { type: Number, default: 0 },
  innerIndex: { type: Number, default: 0 },
})

const emit = defineEmits(['update:sectionIndex', 'update:innerIndex'])

const sectionMap = {
  work: WorkSection,
  skills: SkillsSection,
  contact: ContactSection,
}

const INNER_LAST = 3
const stage = ref(null)
const isAnimating = ref(false)
let touchStartY = 0

const vStyle = computed(() => ({
  transform: `translateY(-${props.sectionIndex * 100}vh)`,
}))

const lastSection = computed(() => props.items.length - 1)
const activeIsIntro = computed(() => props.items[props.sectionIndex]?.id === 'about')

function isNarrow() {
  return window.matchMedia('(max-width: 860px)').matches
}

function setInner(index) {
  if (isAnimating.value || index === props.innerIndex) return
  isAnimating.value = true
  emit('update:innerIndex', index)
}

function goSection(index) {
  const clamped = Math.max(0, Math.min(lastSection.value, index))
  if (clamped === props.sectionIndex) return
  isAnimating.value = true
  emit('update:sectionIndex', clamped)
}

function step(direction) {
  if (isAnimating.value) return
  if (activeIsIntro.value) {
    if (direction > 0) {
      if (props.innerIndex < INNER_LAST) setInner(props.innerIndex + 1)
      else goSection(props.sectionIndex + 1)
    } else {
      if (props.innerIndex > 0) setInner(props.innerIndex - 1)
      else goSection(props.sectionIndex - 1)
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

function onTransitionEnd(e) {
  if (e.propertyName !== 'transform') return
  const t = e.target
  if (
    t.classList.contains('stage__track') ||
    t.classList.contains('intro__track')
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
</style>
