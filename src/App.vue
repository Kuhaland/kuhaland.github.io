<template>
  <div class="layout">
    <SideNav
      :items="menu"
      :active-index="sectionIndex"
      :collapsed="isCollapsed"
      @select="onSelect"
      @toggle="isCollapsed = !isCollapsed"
    />
    <MainContent
      :items="menu"
      :section-index="sectionIndex"
      @update:section-index="sectionIndex = $event"
    />
    <DetailPanel :item="activeItem" />
    <IntroOverlay />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SideNav from './components/SideNav.vue'
import MainContent from './components/MainContent.vue'
import DetailPanel from './components/DetailPanel.vue'
import IntroOverlay from './components/IntroOverlay.vue'

const menu = [
  {
    id: 'about',
    label: '소개',
    icon: 'person',
    headline: '디자인을 이해하는 퍼블리셔, 구조를 설계하는 개발자',
    detail:
      '디자인과 퍼블리싱을 모두 경험한 17년차 웹퍼블리셔 이형화입니다. 반응형 웹, 웹표준, 웹접근성을 기본으로 삼아 어떤 환경에서도 일관된 화면을 구현합니다. 재사용 가능한 공통 컴포넌트 설계와 국내·해외 서비스 유지보수 경험을 통해, 처음 만드는 것만큼 오래 관리하는 것까지 고려한 코드를 작성합니다.',
    skills: [
      'GUI 설계',
      '반응형 웹',
      '웹표준/웹접근성',
      '컴포넌트 기반 퍼블리싱',
      'UI/UX 기획 이해',
    ],
  },
  {
    id: 'work',
    label: '작업',
    icon: 'palette',
    detail:
      '반응형 웹, 디자인 시스템, 인터랙티브 랜딩 페이지 등 폭넓은 프로젝트를 진행했습니다. 컴포넌트 단위의 재사용 가능한 UI 설계와 성능 최적화에 강점이 있으며, 기획부터 배포까지 전 과정을 아우르는 경험을 쌓아왔습니다. 사용자의 목적을 빠르게 달성하도록 돕는 화면을 만드는 데 집중합니다.',
  },
  {
    id: 'skills',
    label: '기술',
    icon: 'code',
    detail:
      '주력 스택은 Vue 3와 Vite, 그리고 SCSS 기반의 스타일 아키텍처입니다. 시맨틱 마크업과 접근성을 고려한 마크업을 지향하고, Git 기반 협업과 CI 워크플로우에 익숙합니다. 필요에 따라 TypeScript, 상태 관리 라이브러리, 애니메이션 도구를 유연하게 조합해 문제를 해결합니다.',
  },
  {
    id: 'contact',
    label: '연락처',
    icon: 'mail',
    detail:
      '새로운 프로젝트, 협업, 혹은 그냥 안부 인사도 환영합니다. 이메일이나 소셜 채널을 통해 편하게 연락 주시면 빠르게 답변드리겠습니다. 좋은 아이디어는 대화에서 시작된다고 믿어요.',
  },
]

const sectionIndex = ref(0)
const isCollapsed = ref(false)

const activeItem = computed(() => menu[sectionIndex.value] ?? menu[0])

function onSelect(index) {
  sectionIndex.value = index
}
</script>

<style scoped lang="scss">
.layout {
  display: flex;
  height: 100vh;
  overflow: hidden;

  @include respond-to($bp-md) {
    height: auto;
    min-height: 100vh;
    flex-direction: column;
    overflow: visible;
  }
}
</style>
