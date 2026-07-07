<template>
  <section ref="root" class="section" :style="{ backgroundImage: data.bg }">
    <div class="section__inner">
      <span class="section__tag reveal">{{ data.tag }}</span>
      <h1 class="section__title reveal">{{ data.title }}</h1>
      <p class="section__summary reveal">{{ data.body }}</p>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useSectionReveal } from '../../composables/useSectionReveal.js'

const props = defineProps({
  data: { type: Object, required: true },
  active: { type: Boolean, default: false },
})

const root = ref(null)
useSectionReveal(root, () => props.active)
</script>

<style scoped lang="scss">
@include section-styles;
</style>
