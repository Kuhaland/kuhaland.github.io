<template>
  <div class="layout">
    <SideNav
      :items="menu"
      :active-index="sectionIndex"
      :collapsed="isCollapsed"
      :entered="pageEntered"
      :guide-open="guideOpen"
      @select="onSelect"
      @toggle="isCollapsed = !isCollapsed"
      @guide="onGuide"
    />
    <MainContent
      :items="menu"
      :section-index="sectionIndex"
      :work-index="workIndex"
      :career-index="careerIndex"
      :entered="pageEntered"
      @update:section-index="sectionIndex = $event"
      @update:work-index="workIndex = $event"
      @update:career-index="careerIndex = $event"
    />
    <DetailPanel
      :item="activeItem"
      :project="currentProject"
      :career="currentCareer"
      :entered="pageEntered"
    />
    <IntroOverlay
      :open="guideOpen"
      :auto-close="guideAuto"
      @close="guideOpen = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import SideNav from './components/SideNav.vue'
import MainContent from './components/MainContent.vue'
import DetailPanel from './components/DetailPanel.vue'
import IntroOverlay from './components/IntroOverlay.vue'
import { projects } from './data/projects.js'
import { career } from './data/career.js'
import { menu } from './data/menu.js'

const sectionIndex = ref(0)
const workIndex = ref(0)
const careerIndex = ref(0)
const isCollapsed = ref(false)
const guideOpen = ref(true)
const guideAuto = ref(true)
const pageEntered = ref(false)

const activeItem = computed(() => menu[sectionIndex.value] ?? menu[0])
const currentProject = computed(() =>
  activeItem.value.id === 'work' ? projects[workIndex.value] : null
)
const currentCareer = computed(() =>
  activeItem.value.id === 'career' ? career[careerIndex.value] : null
)

onMounted(() => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      pageEntered.value = true
    })
  })
})

function onGuide() {
  guideAuto.value = false
  guideOpen.value = !guideOpen.value
}

function onSelect(index) {
  sectionIndex.value = index
  if (menu[index].id === 'work') workIndex.value = 0
  if (menu[index].id === 'career') careerIndex.value = 0
}
</script>

<style scoped lang="scss">
.layout {
  display: flex;
  height: 100vh;
  overflow: hidden;

  @include respond-to($bp-md) {
    height: auto;
    min-height: 100vh;
    flex-direction: column;
    overflow: visible;
  }
}
</style>
