<template>
  <section ref="root" class="section-block" :style="bg">
    <div class="section-inner">
      <span class="tag reveal">기술</span>
      <h1 class="title reveal">기술</h1>
      <p class="summary reveal">
        Vue, JavaScript, SCSS를 중심으로 한 프론트엔드 스택을 다룹니다.
      </p>
      <div class="sub reveal">
        <h2 class="sub-heading">프레임워크</h2>
        <p class="sub-body">
          Vue 3의 Composition API를 기반으로 컴포넌트를 설계합니다. Vite로 빠른 개발 환경을 구성하고,
          필요 시 상태 관리와 라우팅을 더합니다.
        </p>
      </div>
      <div class="sub reveal">
        <h2 class="sub-heading">스타일링</h2>
        <p class="sub-body">
          SCSS로 변수와 믹스인을 분리해 유지보수하기 좋은 스타일 구조를 만듭니다. 디자인 토큰을 CSS 변수로
          노출해 테마 전환을 유연하게 처리합니다.
        </p>
      </div>
      <div class="sub reveal">
        <h2 class="sub-heading">모션 & 인터랙션</h2>
        <p class="sub-body">
          GSAP와 ScrollTrigger로 스크롤 기반 애니메이션을 구현합니다. 과하지 않게, 콘텐츠를 돕는 방향으로
          움직임을 설계합니다.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useSectionReveal } from '../../composables/useSectionReveal.js'

const props = defineProps({
  active: { type: Boolean, default: false },
})

const root = ref(null)
const bg = {
  backgroundImage: 'linear-gradient(150deg, #c2e59c 0%, #64b3f4 100%)',
}

useSectionReveal(root, () => props.active)
</script>

<style scoped lang="scss">
@include section-styles;
</style>
