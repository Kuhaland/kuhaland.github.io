<template>
  <main ref="mainRef" class="main">
    <div class="content">
      <div
        v-for="(item, i) in items"
        :key="item.id"
        :ref="(el) => setBlock(el, i)"
        class="section-slot"
      >
        <component :is="sectionMap[item.id]" />
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, provide, onMounted, onUnmounted } from 'vue'
import AboutSection from './sections/AboutSection.vue'
import WorkSection from './sections/WorkSection.vue'
import SkillsSection from './sections/SkillsSection.vue'
import JournalSection from './sections/JournalSection.vue'
import ContactSection from './sections/ContactSection.vue'

const props = defineProps({
  items: { type: Array, required: true },
  activeIndex: { type: Number, default: 0 },
})

const emit = defineEmits(['update:activeIndex'])

const sectionMap = {
  about: AboutSection,
  work: WorkSection,
  skills: SkillsSection,
  journal: JournalSection,
  contact: ContactSection,
}

const mainRef = ref(null)
const scrollerEl = ref(null)
const blocks = ref([])
let observer = null

provide('scrollerEl', scrollerEl)

function setBlock(el, i) {
  if (el) blocks.value[i] = el
}

function onIntersect(entries) {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      const index = blocks.value.indexOf(entry.target)
      if (index !== -1 && index !== props.activeIndex) {
        emit('update:activeIndex', index)
      }
    }
  }
}

function scrollToIndex(index) {
  blocks.value[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

defineExpose({ scrollToIndex })

onMounted(() => {
  scrollerEl.value = mainRef.value
  observer = new IntersectionObserver(onIntersect, {
    root: mainRef.value,
    rootMargin: '-45% 0px -45% 0px',
    threshold: 0,
  })
  blocks.value.forEach((el) => el && observer.observe(el))
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<style scoped lang="scss">
.main {
  flex: 1;
  min-width: 0;
  overflow-y: auto;
  background: var(--color-bg);
  scroll-behavior: smooth;
}

.content {
  width: 100%;
}
</style>
