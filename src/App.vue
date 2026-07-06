<template>
  <div class="layout">
    <SideNav
      :items="menu"
      :active-id="activeId"
      :collapsed="isCollapsed"
      @select="activeId = $event"
      @toggle="isCollapsed = !isCollapsed"
    />
    <MainContent :item="activeItem" />
    <DetailPanel :item="activeItem" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SideNav from './components/SideNav.vue'
import MainContent from './components/MainContent.vue'
import DetailPanel from './components/DetailPanel.vue'

const menu = [
  {
    id: 'about',
    label: '소개',
    icon: 'person',
    image: 'linear-gradient(150deg, #f6c99f 0%, #e8a3a0 35%, #b48ba8 70%, #6d7fa8 100%)',
    summary: '안녕하세요, kuhaland입니다. 웹과 디자인의 경계에서 즐겁게 만드는 사람이에요.',
    detail:
      'kuhaland는 사용자 경험을 최우선으로 생각하는 프론트엔드 개발자이자 디자이너입니다. 작은 인터랙션 하나에도 이야기를 담으려 노력하며, 코드와 디자인이 자연스럽게 어우러지는 결과물을 지향합니다. 새로운 기술을 배우고 실험하는 과정 자체를 즐기며, 그 경험을 기록으로 남깁니다.',
  },
  {
    id: 'work',
    label: '작업',
    icon: 'palette',
    image: 'linear-gradient(150deg, #a8edea 0%, #7ac8e0 45%, #5f8bd6 100%)',
    summary: '다양한 웹 서비스와 인터페이스를 설계하고 구현해 왔습니다.',
    detail:
      '반응형 웹, 디자인 시스템, 인터랙티브 랜딩 페이지 등 폭넓은 프로젝트를 진행했습니다. 컴포넌트 단위의 재사용 가능한 UI 설계와 성능 최적화에 강점이 있으며, 기획부터 배포까지 전 과정을 아우르는 경험을 쌓아왔습니다. 사용자의 목적을 빠르게 달성하도록 돕는 화면을 만드는 데 집중합니다.',
  },
  {
    id: 'skills',
    label: '기술',
    icon: 'code',
    image: 'linear-gradient(150deg, #c2e59c 0%, #64b3f4 100%)',
    summary: 'Vue, JavaScript, SCSS를 중심으로 한 프론트엔드 스택을 다룹니다.',
    detail:
      '주력 스택은 Vue 3와 Vite, 그리고 SCSS 기반의 스타일 아키텍처입니다. 시맨틱 마크업과 접근성을 고려한 마크업을 지향하고, Git 기반 협업과 CI 워크플로우에 익숙합니다. 필요에 따라 TypeScript, 상태 관리 라이브러리, 애니메이션 도구를 유연하게 조합해 문제를 해결합니다.',
  },
  {
    id: 'journal',
    label: '기록',
    icon: 'article',
    image: 'linear-gradient(150deg, #fbc2eb 0%, #a6c1ee 100%)',
    summary: '배우고 느낀 것을 글과 실험으로 남기고 있습니다.',
    detail:
      '새로운 기술을 접하면 직접 만들어 보고, 그 과정을 글로 정리합니다. 실패한 실험도 기록으로 남겨 다음 시도의 밑거름으로 삼습니다. 꾸준한 기록이 곧 성장의 궤적이라 믿으며, 언젠가 누군가에게 도움이 될 작은 힌트를 남기는 것을 좋아합니다.',
  },
  {
    id: 'contact',
    label: '연락처',
    icon: 'mail',
    image: 'linear-gradient(150deg, #667eea 0%, #764ba2 100%)',
    summary: '함께 만들고 싶은 이야기가 있다면 언제든 연락 주세요.',
    detail:
      '새로운 프로젝트, 협업, 혹은 그냥 안부 인사도 환영합니다. 이메일이나 소셜 채널을 통해 편하게 연락 주시면 빠르게 답변드리겠습니다. 좋은 아이디어는 대화에서 시작된다고 믿어요.',
  },
]

const activeId = ref(menu[0].id)
const isCollapsed = ref(false)

const activeItem = computed(
  () => menu.find((m) => m.id === activeId.value) ?? menu[0]
)
</script>

<style scoped lang="scss">
.layout {
  display: flex;
  height: 100vh;
}

@include respond-to($bp-md) {
  .layout {
    height: auto;
    min-height: 100vh;
    flex-direction: column;
  }
}
</style>
