<template>
  <section ref="root" class="section">
    <CodeTyping class="section__bg" />
    <div class="section__inner">
      <img class="section__image reveal" :src="aboutImage" alt="웹퍼블리셔 이형화를 소개하는 대표 이미지"/>
      <p class="section__eyebrow reveal">{{ item.headlineEn }}</p>
      <h1 class="section__title reveal">{{ item.headline }}</h1>
      <p class="section__summary reveal">{{ item.summary }}</p>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import aboutImage from '@/assets/images/logo.png'
import CodeTyping from './CodeTyping.vue'
import { useSectionReveal } from '../../composables/useSectionReveal.js'

const props = defineProps({
  item: { type: Object, required: true },
  active: { type: Boolean, default: false },
})

const root = ref(null)
useSectionReveal(root, () => props.active)
</script>

<style scoped lang="scss">
@include section-styles;

.section {
  overflow: hidden;
  background: linear-gradient(135deg, #1e1b4b 0%, #7a2a8f 60%, #c13584 100%);

  &::before {
    z-index: 1;
    background: linear-gradient(
      120deg,
      rgba(15, 12, 41, 0.72) 0%,
      rgba(15, 12, 41, 0.45) 45%,
      rgba(15, 12, 41, 0.15) 100%
    );
  }

  &__bg {
    z-index: 0;
  }

  &__inner {
    z-index: 2;
  }

  &__image {
    display: block;
    height: 56px;
    width: auto;
    max-width: 220px;
    margin-bottom: 26px;
    object-fit: contain;
    filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.4));
  }

  &__eyebrow {
    max-width: 560px;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 0.01em;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.82);
    text-shadow: 0 1px 10px rgba(0, 0, 0, 0.4);
  }

  &__title {
    margin-top: 10px;
    max-width: 660px;
  }
}
</style>
