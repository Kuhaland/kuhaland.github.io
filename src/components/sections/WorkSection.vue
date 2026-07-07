<template>
  <section ref="root" class="section-block" :style="bg">
    <div class="section-inner">
      <span class="tag reveal">작업</span>
      <h1 class="title reveal">작업</h1>
      <p class="summary reveal">
        다양한 웹 서비스와 인터페이스를 설계하고 구현해 왔습니다.
      </p>
      <div class="sub reveal">
        <h2 class="sub-heading">디자인 시스템</h2>
        <p class="sub-body">
          토큰과 컴포넌트를 기반으로 일관된 UI를 구축했습니다. 라이트·다크 테마, 반응형 규칙, 재사용 컴포넌트를
          하나의 체계로 묶어 팀의 생산성을 높였습니다.
        </p>
      </div>
      <div class="sub reveal">
        <h2 class="sub-heading">인터랙티브 웹</h2>
        <p class="sub-body">
          스크롤 기반 스토리텔링과 모션이 어우러진 랜딩 페이지를 구현했습니다. 성능을 해치지 않는 범위에서
          감각적인 움직임을 더하는 균형을 중요하게 봅니다.
        </p>
      </div>
      <div class="sub reveal">
        <h2 class="sub-heading">프로덕트 UI</h2>
        <p class="sub-body">
          데이터가 많은 대시보드와 관리 화면에서 정보의 위계를 정리하고, 복잡한 흐름을 단순한 단계로
          재구성했습니다.
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
  backgroundImage:
    'linear-gradient(150deg, #a8edea 0%, #7ac8e0 45%, #5f8bd6 100%)',
}

useSectionReveal(root, () => props.active)
</script>

<style scoped lang="scss">
@include section-styles;
</style>
