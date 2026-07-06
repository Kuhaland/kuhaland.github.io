<template>
  <section ref="root" class="section-block" :style="bg">
    <div class="section-inner">
      <span class="tag reveal">소개</span>
      <h1 class="title reveal">소개</h1>
      <p class="summary reveal">
        안녕하세요, kuhaland입니다. 웹과 디자인의 경계에서 즐겁게 만드는 사람이에요.
      </p>
      <div class="sub reveal">
        <h2 class="sub-heading">지향점</h2>
        <p class="sub-body">
          기술은 사람을 위한 도구라고 생각합니다. 화려함보다 명료함을, 복잡함보다 흐름을 우선합니다.
          사용자가 목적을 자연스럽게 달성하도록 돕는 인터페이스를 만들고자 합니다.
        </p>
      </div>
      <div class="sub reveal">
        <h2 class="sub-heading">일하는 방식</h2>
        <p class="sub-body">
          작은 단위로 나누어 빠르게 만들고, 직접 써 보며 다듬습니다. 문제를 정의하는 데 충분한 시간을 쓰고,
          해결은 단순하게 유지합니다. 좋은 결과물은 반복된 개선에서 나온다고 믿습니다.
        </p>
      </div>
      <div class="sub reveal">
        <h2 class="sub-heading">요즘 관심사</h2>
        <p class="sub-body">
          스크롤 인터랙션, 모션 디자인, 그리고 디자인 토큰을 코드로 관리하는 방법에 흥미를 느끼고 있습니다.
          실험한 것들을 기록으로 정리하며 조금씩 나아가는 중입니다.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useSectionReveal } from '../../composables/useSectionReveal.js'

const root = ref(null)
const bg = {
  backgroundImage:
    'linear-gradient(150deg, #f6c99f 0%, #e8a3a0 35%, #b48ba8 70%, #6d7fa8 100%)',
}

useSectionReveal(root)
</script>

<style scoped lang="scss">
@include section-styles;
</style>
