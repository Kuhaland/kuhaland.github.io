<template>
  <section ref="root" class="section" :style="bg">
    <div class="section__inner">
      <span class="section__tag reveal">연락처</span>
      <h1 class="section__title reveal">연락처</h1>
      <p class="section__summary reveal">
        함께 만들고 싶은 이야기가 있다면 언제든 연락 주세요.
      </p>
      <div class="section__sub reveal">
        <h2 class="section__sub-heading">함께하고 싶다면</h2>
        <p class="section__sub-body">
          아이디어 단계여도 좋습니다. 무엇을 만들고 싶은지, 어떤 문제를 풀고 싶은지 편하게 들려주세요.
        </p>
      </div>
      <div class="section__sub reveal">
        <h2 class="section__sub-heading">채널</h2>
        <p class="section__sub-body">
          이메일과 소셜 채널로 연락을 받습니다. 시간대가 달라도 확인하는 대로 빠르게 답변드리겠습니다.
        </p>
      </div>
      <div class="section__sub reveal">
        <h2 class="section__sub-heading">한마디</h2>
        <p class="section__sub-body">
          좋은 결과물은 좋은 대화에서 시작된다고 믿습니다. 부담 없이 인사 주세요.
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
  backgroundImage: 'linear-gradient(150deg, #667eea 0%, #764ba2 100%)',
}

useSectionReveal(root, () => props.active)
</script>

<style scoped lang="scss">
@include section-styles;
</style>
