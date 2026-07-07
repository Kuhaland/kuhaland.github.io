<template>
  <div class="work">
    <div class="work__track" :style="hStyle">
      <div v-for="(p, i) in projects" :key="p.id" class="work__panel">
        <ProjectPanel
          :project="p"
          :bg="gradients[i % gradients.length]"
          :active="active && i === innerIndex"
        />
      </div>
    </div>

    <div class="work__dots">
      <button
        v-for="(p, i) in projects"
        :key="p.id"
        class="work__dot"
        :class="{ 'work__dot--active': i === innerIndex }"
        :aria-label="`${p.title} 프로젝트로 이동`"
        @click="emit('select-project', i)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ProjectPanel from './ProjectPanel.vue'
import { projects } from '../../data/projects.js'

const props = defineProps({
  innerIndex: { type: Number, default: 0 },
  active: { type: Boolean, default: false },
})

const emit = defineEmits(['select-project'])

const gradients = [
  'linear-gradient(150deg, #5f8bd6 0%, #3a4f74 100%)',
  'linear-gradient(150deg, #7ac8e0 0%, #4a6fa5 100%)',
  'linear-gradient(150deg, #83b26f 0%, #3f7d6e 100%)',
  'linear-gradient(150deg, #b48ba8 0%, #6d5f97 100%)',
  'linear-gradient(150deg, #d98a86 0%, #8a4f74 100%)',
  'linear-gradient(150deg, #e0a86b 0%, #a05a58 100%)',
]

const hStyle = computed(() => ({
  transform: `translateX(-${props.innerIndex * 100}%)`,
}))
</script>

<style scoped lang="scss">
.work {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &__track {
    display: flex;
    height: 100%;
    transition: $transition-slide;
    will-change: transform;
  }

  &__panel {
    flex: 0 0 100%;
    width: 100%;
    height: 100%;
  }

  &__dots {
    position: absolute;
    left: 64px;
    bottom: 60px;
    z-index: 5;
    @include flex(row, center, center, 8px);
    max-width: 90%;
    flex-wrap: wrap;
  }

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.45);
    transition: $transition-base;

    &--active {
      background: #fff;
      transform: scale(1.4);
    }
  }

  @include respond-to($bp-md) {
    height: auto;

    &__track {
      flex-direction: column;
      transform: none !important;
    }

    &__panel {
      flex: none;
      height: auto;
    }

    &__dots {
      display: none;
    }
  }
}
</style>
