<template>
  <section ref="root" class="section-block" :style="bg">
    <div class="section-inner">
      <span class="tag reveal">기록</span>
      <h1 class="title reveal">기록</h1>
      <p class="summary reveal">
        배우고 느낀 것을 글과 실험으로 남기고 있습니다.
      </p>
      <div class="sub reveal">
        <h2 class="sub-heading">왜 기록하나</h2>
        <p class="sub-body">
          기억은 흐려지지만 기록은 남습니다. 과정을 적어 두면 같은 실수를 반복하지 않고, 지난 나와 대화할 수
          있습니다.
        </p>
      </div>
      <div class="sub reveal">
        <h2 class="sub-heading">무엇을 남기나</h2>
        <p class="sub-body">
          문제를 만난 상황, 시도한 접근, 그리고 왜 그 선택을 했는지를 적습니다. 결과보다 맥락이 오래 도움이
          된다고 느낍니다.
        </p>
      </div>
      <div class="sub reveal">
        <h2 class="sub-heading">어떻게 나누나</h2>
        <p class="sub-body">
          정리한 글은 공개된 공간에 올려 누군가의 힌트가 되기를 바랍니다. 작은 기록이 모여 궤적이 됩니다.
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
  backgroundImage: 'linear-gradient(150deg, #fbc2eb 0%, #a6c1ee 100%)',
}

useSectionReveal(root)
</script>

<style scoped lang="scss">
@include section-styles;
</style>
