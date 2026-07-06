<template>
  <Transition name="fade">
    <div v-if="showIntro" class="intro" role="dialog" aria-modal="true">
      <div class="intro-panel">
        <button class="intro-close" type="button" aria-label="안내 닫기" @click="close">
          <AppIcon name="close" :size="20" />
        </button>

        <h2 class="intro-title">스크롤로 둘러보세요</h2>

        <div class="demo" aria-hidden="true">
          <div class="demo-scroll">
            <span class="mouse"><span class="wheel" /></span>
            <AppIcon class="arrow" name="keyboard_arrow_down" :size="26" />
          </div>
          <span class="demo-eq">=</span>
          <div class="demo-menu">
            <span class="demo-hl" />
            <span v-for="n in 4" :key="n" class="demo-item" />
          </div>
        </div>
        <p class="demo-caption">스크롤 ↓ &nbsp;=&nbsp; 메뉴 이동 ↓</p>

        <ol class="intro-points">
          <li>아래로 <b>스크롤</b>하면 컨텐츠가 순서대로 나타납니다.</li>
          <li>컨텐츠가 넘어갈 때마다 <b>왼쪽 메뉴도 자동으로 따라 이동</b>합니다.</li>
          <li><b>위로 스크롤</b>하면 메뉴도 이전 항목으로 되돌아갑니다.</li>
        </ol>

        <div class="intro-notes">
          <p>왼쪽 메뉴를 클릭하면 해당 내용으로 바로 이동합니다.</p>
          <p>오른쪽 영역에서 현재 내용의 상세 설명을 볼 수 있습니다.</p>
        </div>

        <button class="intro-dismiss" type="button" @click="dontShowAgain">
          다시 보지 않기
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import AppIcon from './AppIcon.vue'

const STORAGE_KEY = 'kuhaland-intro-hidden'

function hiddenByPreference() {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

const showIntro = ref(!hiddenByPreference())

function lockScroll() {
  document.body.style.overflow = 'hidden'
}

function unlockScroll() {
  document.body.style.overflow = ''
}

function close() {
  showIntro.value = false
  unlockScroll()
}

function dontShowAgain() {
  try {
    localStorage.setItem(STORAGE_KEY, '1')
  } catch {
    showIntro.value = false
  }
  close()
}

onMounted(() => {
  if (showIntro.value) lockScroll()
})

onUnmounted(() => {
  unlockScroll()
})
</script>

<style scoped lang="scss">
.intro {
  position: fixed;
  inset: 0;
  z-index: 1000;
  @include flex-center;
  padding: 24px;
  background: rgba(20, 20, 24, 0.45);
  backdrop-filter: blur(8px);
}

.intro-panel {
  position: relative;
  width: 100%;
  max-width: 440px;
  padding: 48px 34px 34px;
  border-radius: var(--radius-lg);
  background: var(--color-panel);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.28);
  text-align: center;
}

.intro-close {
  position: absolute;
  top: 16px;
  right: 16px;
  @include icon-button(38px, 50%);
  color: var(--color-text-muted);
  transition: $transition-base;

  &:hover {
    background: var(--color-bg);
    color: var(--color-text);
  }
}

.intro-title {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.demo {
  margin-top: 26px;
  @include flex(row, center, center, 20px);
}

.demo-scroll {
  @include flex(column, flex-start, center, 4px);
}

.mouse {
  width: 26px;
  height: 42px;
  border: 2px solid var(--color-text);
  border-radius: 14px;
  display: flex;
  justify-content: center;
  padding-top: 7px;
}

.wheel {
  width: 4px;
  height: 8px;
  border-radius: 2px;
  background: var(--color-text);
  animation: linkMove 2.4s ease-in-out infinite;
}

.arrow {
  color: var(--color-text);
  animation: bounce 2.4s ease-in-out infinite;
}

.demo-eq {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-text-muted);
}

.demo-menu {
  position: relative;
  width: 96px;
  padding: 8px;
  border-radius: 12px;
  background: var(--color-sidebar);
  @include flex(column, flex-start, stretch, 8px);
}

.demo-item {
  height: 10px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.22);
}

.demo-hl {
  position: absolute;
  left: 8px;
  right: 8px;
  top: 8px;
  height: 10px;
  border-radius: 4px;
  background: var(--color-accent);
  animation: linkHighlight 2.4s ease-in-out infinite;
}

.demo-caption {
  margin-top: 12px;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-muted);
}

.intro-points {
  margin: 24px 0 0;
  padding: 0;
  list-style: none;
  counter-reset: point;
  text-align: left;

  li {
    position: relative;
    counter-increment: point;
    padding: 8px 0 8px 34px;
    font-size: 14px;
    line-height: 1.55;
    color: #45454a;

    &::before {
      content: counter(point);
      position: absolute;
      left: 0;
      top: 7px;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: var(--color-accent);
      color: #fff;
      font-size: 12px;
      font-weight: 700;
      @include flex-center;
    }

    b {
      color: var(--color-text);
      font-weight: 700;
    }
  }
}

.intro-notes {
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid var(--color-border);
  text-align: left;

  p {
    font-size: 13px;
    line-height: 1.6;
    color: var(--color-text-muted);

    & + p {
      margin-top: 6px;
    }
  }
}

.intro-dismiss {
  margin-top: 24px;
  padding: 10px 18px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-muted);
  transition: $transition-base;

  &:hover {
    background: var(--color-bg);
    color: var(--color-text);
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(8px);
  }
}

@keyframes linkMove {
  0% {
    opacity: 0;
    transform: translateY(-4px);
  }
  40% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(10px);
  }
}

@keyframes linkHighlight {
  0%,
  12% {
    transform: translateY(0);
  }
  33%,
  45% {
    transform: translateY(18px);
  }
  66%,
  78% {
    transform: translateY(36px);
  }
  92%,
  100% {
    transform: translateY(54px);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@include respond-to($bp-sm) {
  .intro-panel {
    padding: 44px 22px 30px;
  }
  .intro-title {
    font-size: 21px;
  }
}
</style>
