<template>
  <div class="layout">
    <SideNav
      :items="menu"
      :active-index="sectionIndex"
      :collapsed="isCollapsed"
      :entered="pageEntered"
      @select="onSelect"
      @toggle="isCollapsed = !isCollapsed"
    />
    <MainContent
      :items="menu"
      :section-index="sectionIndex"
      :work-index="workIndex"
      :entered="pageEntered"
      @update:section-index="sectionIndex = $event"
      @update:work-index="workIndex = $event"
    />
    <DetailPanel
      :item="activeItem"
      :project="currentProject"
      :entered="pageEntered"
    />
    <IntroOverlay @done="pageEntered = true" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SideNav from './components/SideNav.vue'
import MainContent from './components/MainContent.vue'
import DetailPanel from './components/DetailPanel.vue'
import IntroOverlay from './components/IntroOverlay.vue'
import { projects } from './data/projects.js'

const menu = [
  {
    id: 'about',
    label: '소개',
    icon: 'person',
    headlineEn:
      'A publisher who understands design, a developer who architects structure',
    headline: '디자인을 읽는 퍼블리셔, 구조를 짓는 UX·UI 개발자',
    summary:
      '디자인과 퍼블리싱을 아우르는 17년차 웹퍼블리셔 이형화입니다.어떤 환경에서도 일관된 화면을 만듭니다.',
    detail:
      '디자인과 퍼블리싱을 모두 경험한 17년차 웹퍼블리셔 이형화입니다. 디자인에 대한 이해를 갖춘 퍼블리셔로서, 눈에 보이는 완성도와 눈에 보이지 않는 코드 품질을 함께 책임집니다.',
    highlights: [
      {
        label: '전문 분야',
        value: '반응형 웹 / 웹표준 / 웹접근성 / 크로스브라우징',
      },
      {
        label: '핵심 강점',
        value: '재사용 가능한 공통 컴포넌트 설계, 코드 표준화, 장기 유지보수 관점의 구조 설계',
      },
      {
        label: '협업 역량',
        value: '디자인 의도 해석 및 개발 연계, 팀 리딩 및 퍼블리싱 품질 관리',
      },
    ],
    outro:
      '국내외 ERP 및 자사 서비스의 장기 운영 경험을 통해, 처음 만드는 완성도만큼 오래 관리하는 지속가능성까지 고려한 코드를 지향합니다.',
    strengths: [
      'GUI 설계',
      '반응형 웹',
      '웹표준/웹접근성',
      '컴포넌트 기반 퍼블리싱',
      'UI/UX 기획 이해',
    ],
    skills: [
      'HTML',
      'HTML5',
      'CSS',
      'CSS3',
      'SCSS',
      'SASS',
      'JavaScript',
      'jQuery',
      'Vue.js',
      'Bootstrap',
      'JAVA',
      'PHP',
      'Git',
      'GitLab',
      'GitHub',
      'VSCode',
      'IntelliJ',
      'Jira',
      'AWS',
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
const workIndex = ref(0)
const isCollapsed = ref(false)
const pageEntered = ref(false)

const activeItem = computed(() => menu[sectionIndex.value] ?? menu[0])
const currentProject = computed(() =>
  activeItem.value.id === 'work' ? projects[workIndex.value] : null
)

function onSelect(index) {
  sectionIndex.value = index
  if (menu[index].id === 'work') workIndex.value = 0
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
