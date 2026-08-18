<template>
  <section ref="root" class="project" :style="{ backgroundImage: bg }">
    <div class="project__inner">
      <p class="project__id reveal">{{ project.id }}</p>
      <h2 class="project__title reveal">{{ project.titleEn }}</h2>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useSectionReveal } from '../../composables/useSectionReveal.js'

const props = defineProps({
  project: { type: Object, required: true },
  bg: { type: String, default: '' },
  active: { type: Boolean, default: false },
})

const root = ref(null)
useSectionReveal(root, () => props.active)
</script>

<style scoped lang="scss">
.project {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  @include flex(column, flex-end, flex-start);
  padding: 5.5rem 4rem 8rem;
  background-size: cover;
  background-position: center;
  color: #fff;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0.35) 60%,
      rgba(0, 0, 0, 0.5) 100%
    );
  }

  &__inner {
    position: relative;
    z-index: 1;
    width: 100%;
    text-shadow: 0 0.0625rem 0.875rem rgba(0, 0, 0, 0.35);
  }

  &__id {
    font-size: 1.0625rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.75);
  }

  &__title {
    margin-top: 0.75rem;
    font-size: 4.375rem;
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.05;
  }

  @include respond-to($bp-md) {
    min-height: 60vh;
    padding: 3.5rem 1.75rem 4.5rem;

    &__title {
      font-size: 2.625rem;
    }
  }
}
</style>
