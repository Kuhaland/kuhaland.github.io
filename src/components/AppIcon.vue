<template>
  <span class="app-icon material-symbols-outlined" :style="styles">{{
    symbol
  }}</span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 20 },
  fill: { type: Boolean, default: false },
})

const symbols = {
  search: 'search',
  bookmark: 'bookmark',
  layers: 'layers',
  chat: 'chat_bubble',
  bank: 'account_balance',
  settings: 'settings',
  shield: 'verified_user',
  heart: 'favorite',
  share: 'share',
  gallery: 'gallery_thumbnail',
  map: 'map',
  pool: 'pool',
  ocean: 'waves',
  beach: 'beach_access',
  workspace: 'desktop_windows',
  fitness: 'fitness_center',
  wifi: 'wifi',
}

const symbol = computed(() => symbols[props.name] || props.name)
const styles = computed(() => ({
  'font-size': `${props.size}px`,
  'font-variation-settings': `'FILL' ${props.fill ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' ${props.size}`,
}))
</script>

<style scoped lang="scss">
.app-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1em;
  height: 1em;
  overflow: hidden;
  line-height: 1;
  user-select: none;
  vertical-align: middle;
}
</style>
