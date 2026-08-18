<template>
  <component :is="tag">
    <span v-for="(line, i) in lines" :key="i" class="sentence__line">
      {{ line }}
    </span>
  </component>
</template>

<script setup>
import { computed } from 'vue'
import { toSentences } from '../utils/text.js'

const props = defineProps({
  text: { type: String, default: '' },
  tag: { type: String, default: 'p' },
})

const lines = computed(() => toSentences(props.text))
</script>

<style scoped lang="scss">
.sentence__line {
  display: block;
}
</style>
