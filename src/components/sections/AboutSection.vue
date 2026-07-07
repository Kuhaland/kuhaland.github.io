<template>
  <section ref="root" class="section" :style="bg">
    <div class="section__inner">
      <img
        class="section__image reveal"
        :src="aboutImage"
        alt="웹퍼블리셔 이형화를 소개하는 대표 이미지"
      />
      <h1 class="section__title reveal">
        디자인을 이해하는 퍼블리셔,<br>구조를 설계하는 개발자
      </h1>
      <p class="section__summary reveal">
        디자인과 퍼블리싱을 모두 경험한 17년차 웹퍼블리셔 이형화입니다.
        <br>반응형 웹·웹표준·웹접근성을 기본으로 삼아, 어떤 환경에서도 일관된 화면을 구현합니다.
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import aboutImage from '@/assets/images/logo.png'
import { useSectionReveal } from '../../composables/useSectionReveal.js'

const props = defineProps({
  active: { type: Boolean, default: false },
})

const root = ref(null)
const bg = {
  backgroundImage:
    'linear-gradient(150deg, #f6c99f 0%, #e8a3a0 35%, #b48ba8 70%, #6d7fa8 100%)',
}

useSectionReveal(root, () => props.active)
</script>

<style scoped lang="scss">
@include section-styles;

.section {
  &__image {
    display: block;
    height: 60px;
    width: auto;
    max-width: 240px;
    margin-bottom: 30px;
    object-fit: contain;
    filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.28));
  }

  &__title {
    max-width: 640px;
  }
}
</style>
