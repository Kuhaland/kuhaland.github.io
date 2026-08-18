<template>
  <Transition name="guide">
    <div v-if="visible" class="intro-overlay" role="dialog" aria-label="화면 이용 안내">
      <button class="intro-overlay__close intro-overlay__close--top" @click="close">
        <AppIcon name="close" :size="18" />
        <span>닫기</span>
      </button>

      <span
        v-for="mark in marks"
        :key="`frame-${mark.key}`"
        class="intro-overlay__frame"
        :class="{
          'intro-overlay__frame--active': hovered === mark.key,
          'intro-overlay__frame--muted': hovered && hovered !== mark.key,
          'intro-overlay__frame--nested': mark.nested,
        }"
        :style="frameStyle(mark)"
      />

      <div
        v-for="mark in marks"
        :key="`callout-${mark.key}`"
        class="intro-overlay__callout"
        :class="[
          `intro-overlay__callout--${mark.place}`,
          {
            'intro-overlay__callout--active': hovered === mark.key,
            'intro-overlay__callout--muted': hovered && hovered !== mark.key,
          },
        ]"
        :style="calloutStyle(mark)"
      >
        <span class="intro-overlay__pointer">
          <AppIcon :name="mark.icon" :size="22" />
        </span>
        <span class="intro-overlay__body">
          <span class="intro-overlay__title">{{ mark.title }}</span>
          <span class="intro-overlay__desc">{{ mark.desc }}</span>
        </span>
      </div>

      <div class="intro-overlay__bottom">
        <div class="intro-overlay__actions">
          <button
            class="intro-overlay__close intro-overlay__close--bottom"
            @click="close"
          >
            안내 닫기
          </button>
          <span
            v-if="autoClose"
            class="intro-overlay__timer"
            :style="timerStyle"
            :aria-label="`${remain}초 후 자동으로 닫힘`"
          >
            {{ remain }}
          </span>
        </div>
        <span v-if="autoClose" class="intro-overlay__hint">
          마우스 · 키보드 조작이 없으면 자동으로 닫힙니다
        </span>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import AppIcon from './AppIcon.vue'

const IDLE = 20000
const DELAY = 700
const EDGE = 82
const NARROW = 860
const EVENTS = ['wheel', 'pointerdown', 'keydown', 'touchstart']
const NAV_KEYS = [
  'ArrowDown',
  'ArrowUp',
  'ArrowLeft',
  'ArrowRight',
  'PageDown',
  'PageUp',
  'Home',
  'End',
  ' ',
]

const GUIDE = [
  {
    key: 'nav',
    selector: '.sidenav',
    place: 'right',
    anchor: 0.46,
    icon: 'arrow_back',
    title: 'LNB 메뉴',
    desc: '소개 · 경력 · 작업 · 기술 · 연락처. 원하는 섹션을 눌러 바로 이동합니다.',
  },
  {
    key: 'collapse',
    selector: '.sidenav__collapse',
    nested: true,
    place: 'right',
    anchor: 0.5,
    icon: 'arrow_back',
    title: '메뉴 접기',
    desc: '버튼을 누르면 메뉴가 아이콘만 남기고 작아집니다.',
  },
  {
    key: 'stage',
    selector: '.stage',
    place: 'center',
    anchor: 0.5,
    icon: 'swap_vert',
    title: '페이지 이동',
    desc: '마우스 휠 · 터치 · 방향키로 위아래 페이지를 넘깁니다. 경력과 작업은 항목을 하나씩 지나간 뒤 다음 페이지로 이어집니다.',
  },
  {
    key: 'detail',
    selector: '.detail',
    place: 'left',
    anchor: 0.28,
    icon: 'arrow_forward',
    title: '상세 패널',
    desc: '지금 보고 있는 섹션과 항목의 상세 내용이 함께 바뀝니다.',
  },
]

const props = defineProps({
  open: { type: Boolean, default: false },
  autoClose: { type: Boolean, default: false },
})

const emit = defineEmits(['close'])

const visible = ref(false)
const rects = ref({})
const hovered = ref(null)
const remain = ref(IDLE / 1000)

let firstOpen = true

const marks = computed(() => GUIDE.filter((m) => rects.value[m.key]))

const timerStyle = computed(() => ({
  '--progress': `${(remain.value / (IDLE / 1000)) * 100}%`,
}))

let showTimer = null
let idleTimer = null
let tickTimer = null
let observer = null
let lastBump = 0
let lastX = -1
let lastY = -1

function isNarrow() {
  return window.matchMedia(`(max-width: ${NARROW}px)`).matches
}

function measure() {
  if (isNarrow()) {
    close()
    return
  }
  const next = {}
  GUIDE.forEach((m) => {
    const el = document.querySelector(m.selector)
    if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    if (width && height) next[m.key] = { left, top, width, height }
  })
  rects.value = next
}

function frameStyle({ key }) {
  const r = rects.value[key]
  return {
    left: `${r.left}px`,
    top: `${r.top}px`,
    width: `${r.width}px`,
    height: `${r.height}px`,
  }
}

function calloutStyle({ key, place, anchor }) {
  const r = rects.value[key]
  const raw = r.top + r.height * anchor
  const top = `${Math.min(Math.max(raw, EDGE), window.innerHeight - EDGE)}px`
  if (place === 'left') {
    return { left: `${r.left - 22}px`, top, transform: 'translate(-100%, -50%)' }
  }
  if (place === 'center') {
    return {
      left: `${r.left + r.width / 2}px`,
      top,
      transform: 'translate(-50%, -50%)',
    }
  }
  return { left: `${r.left + r.width + 22}px`, top, transform: 'translateY(-50%)' }
}

function hitTest(x, y) {
  return (
    marks.value
      .map((m) => ({ key: m.key, r: rects.value[m.key] }))
      .filter(
        ({ r }) =>
          x >= r.left && x <= r.left + r.width && y >= r.top && y <= r.top + r.height
      )
      .sort((a, b) => a.r.width * a.r.height - b.r.width * b.r.height)[0]?.key ??
    null
  )
}

function onMove(e) {
  const key = hitTest(e.clientX, e.clientY)
  if (key !== hovered.value) hovered.value = key

  const moved = e.clientX !== lastX || e.clientY !== lastY
  lastX = e.clientX
  lastY = e.clientY
  if (!moved) return

  const now = performance.now()
  if (now - lastBump < 400) return
  lastBump = now
  resetIdle()
}

function resetIdle() {
  clearTimeout(idleTimer)
  clearInterval(tickTimer)
  idleTimer = null
  tickTimer = null
  remain.value = IDLE / 1000
  if (!props.autoClose) return
  idleTimer = setTimeout(close, IDLE)
  tickTimer = setInterval(() => {
    remain.value = Math.max(0, remain.value - 1)
  }, 1000)
}

function onKeydown(e) {
  if (e.key === 'Escape') close()
}

function blockWheel(e) {
  e.preventDefault()
  e.stopPropagation()
  resetIdle()
}

function blockKeys(e) {
  if (!NAV_KEYS.includes(e.key)) return
  e.preventDefault()
  e.stopPropagation()
  resetIdle()
}

function start() {
  if (isNarrow()) {
    emit('close')
    return
  }
  measure()
  if (!marks.value.length) return
  hovered.value = null
  visible.value = true
  resetIdle()
  EVENTS.forEach((name) =>
    window.addEventListener(name, resetIdle, { passive: true })
  )
  window.addEventListener('resize', measure)
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('mousemove', onMove, { passive: true })
  window.addEventListener('wheel', blockWheel, { passive: false, capture: true })
  window.addEventListener('keydown', blockKeys, { capture: true })
  observer = new ResizeObserver(measure)
  GUIDE.forEach((m) => {
    const el = document.querySelector(m.selector)
    if (el) observer.observe(el)
  })
}

function teardown() {
  visible.value = false
  clearTimeout(showTimer)
  clearTimeout(idleTimer)
  clearInterval(tickTimer)
  tickTimer = null
  observer?.disconnect()
  observer = null
  EVENTS.forEach((name) => window.removeEventListener(name, resetIdle))
  window.removeEventListener('resize', measure)
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('mousemove', onMove)
  window.removeEventListener('wheel', blockWheel, { capture: true })
  window.removeEventListener('keydown', blockKeys, { capture: true })
}

function close() {
  teardown()
  emit('close')
}

watch(
  () => props.open,
  (open) => {
    if (!open) {
      teardown()
      return
    }
    showTimer = setTimeout(start, firstOpen ? DELAY : 0)
    firstOpen = false
  },
  { immediate: true }
)

onBeforeUnmount(teardown)
</script>

<style scoped lang="scss">
.intro-overlay {
  position: fixed;
  inset: 0;
  z-index: 900;
  background: rgba(0, 0, 0, 0.5);
  pointer-events: none;

  &__frame {
    position: absolute;
    z-index: 0;
    box-sizing: border-box;
    border: 1px dashed rgba(79, 124, 255, 0.9);
    border-radius: var(--radius-md);
    box-shadow: 0 0 0 0.0625rem rgba(255, 255, 255, 0.22),
      inset 0 0 1.5rem rgba(79, 124, 255, 0.14);
    animation: frame-breathe 2.6s ease-in-out infinite;
    transition: backdrop-filter $transition-base, box-shadow $transition-base,
      border-color $transition-base, opacity $transition-base;

    &--active {
      border-style: solid;
      border-color: rgba(255, 255, 255, 0.85);
      box-shadow: 0 0 0 0.0625rem rgba(79, 124, 255, 0.6),
        0 0 2.125rem rgba(79, 124, 255, 0.45);
      backdrop-filter: brightness(1.95) saturate(1.08);
      animation: none;
      opacity: 1;
    }

    &--muted {
      border-color: rgba(255, 255, 255, 0.1);
      box-shadow: none;
      animation: none;
      opacity: 1;
      backdrop-filter: brightness(0.5) saturate(0.8);

      &.intro-overlay__frame--nested {
        backdrop-filter: none;
        opacity: 0.22;
      }
    }
  }

  &__callout {
    position: absolute;
    z-index: 1;
    @include flex(row, flex-start, center, 0.75rem);
    width: 16.75rem;
    padding: 0.875rem 1rem;
    border-radius: var(--radius-md);
    border: 1px solid rgba(255, 255, 255, 0.16);
    background: rgba(18, 18, 26, 0.92);
    backdrop-filter: blur(0.5rem);
    box-shadow: 0 0.875rem 2.125rem rgba(0, 0, 0, 0.34);
    color: #fff;
    transition: opacity $transition-base, background $transition-base,
      border-color $transition-base, box-shadow $transition-base;

    &--left {
      flex-direction: row-reverse;
    }

    &--center {
      flex-direction: column;
      width: 18.25rem;
      text-align: center;
    }

    &--active {
      z-index: 2;
      border-color: var(--color-accent);
      background: rgba(28, 30, 48, 0.96);
      box-shadow: 0 0.875rem 2.125rem rgba(0, 0, 0, 0.38),
        0 0 0 0.0625rem rgba(79, 124, 255, 0.55);
    }

    &--muted {
      opacity: 0.5;
    }
  }

  &__pointer {
    flex-shrink: 0;
    @include flex-center;
    width: 2.125rem;
    height: 2.125rem;
    border-radius: 50%;
    background: var(--color-accent);
    color: #fff;

    .intro-overlay__callout--right.intro-overlay__callout--active & {
      animation: nudge-left 1.5s ease-in-out infinite;
    }

    .intro-overlay__callout--left.intro-overlay__callout--active & {
      animation: nudge-right 1.5s ease-in-out infinite;
    }

    .intro-overlay__callout--center.intro-overlay__callout--active & {
      animation: nudge-down 1.5s ease-in-out infinite;
    }
  }

  &__body {
    @include flex(column, flex-start, stretch, 0.3125rem);
    min-width: 0;
  }

  &__title {
    font-size: 0.9375rem;
    font-weight: 700;
    letter-spacing: -0.01em;
  }

  &__desc {
    font-size: 0.8125rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.72);
  }

  &__close {
    pointer-events: auto;
    @include flex(row, center, center, 0.375rem);
    border-radius: 62.4375rem;
    border: 1px solid rgba(255, 255, 255, 0.18);
    background: rgba(18, 18, 26, 0.92);
    backdrop-filter: blur(0.5rem);
    color: #fff;
    font-size: 0.8125rem;
    font-weight: 600;
    box-shadow: 0 0.625rem 1.625rem rgba(0, 0, 0, 0.32);
    transition: background $transition-base, border-color $transition-base;

    &:hover {
      background: var(--color-accent);
      border-color: var(--color-accent);
    }

    &--top {
      position: absolute;
      z-index: 3;
      top: 1.25rem;
      right: 1.25rem;
      padding: 0.5625rem 1rem 0.5625rem 0.75rem;
    }

    &--bottom {
      padding: 0.6875rem 1.625rem;
      font-size: 0.875rem;
    }
  }

  &__bottom {
    position: absolute;
    z-index: 3;
    left: 50%;
    bottom: 1.75rem;
    @include flex(column, center, center, 0.75rem);
    transform: translateX(-50%);
  }

  &__actions {
    @include flex(row, center, center, 0.625rem);
  }

  &__timer {
    position: relative;
    flex-shrink: 0;
    @include flex-center;
    width: 2.625rem;
    height: 2.625rem;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.18);
    background: rgba(18, 18, 26, 0.92);
    backdrop-filter: blur(0.5rem);
    font-size: 0.875rem;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    color: #fff;
    box-shadow: 0 0.625rem 1.625rem rgba(0, 0, 0, 0.32);

    &::before {
      content: '';
      position: absolute;
      inset: -0.25rem;
      border-radius: 50%;
      background: conic-gradient(
        var(--color-accent) var(--progress, 100%),
        rgba(255, 255, 255, 0.16) 0
      );
      -webkit-mask: radial-gradient(
        farthest-side,
        transparent calc(100% - 0.1875rem),
        #000 calc(100% - 0.1875rem)
      );
      mask: radial-gradient(
        farthest-side,
        transparent calc(100% - 0.1875rem),
        #000 calc(100% - 0.1875rem)
      );
    }
  }

  &__hint {
    font-size: 0.75rem;
    letter-spacing: 0.02em;
    color: rgba(255, 255, 255, 0.72);
    text-shadow: 0 0.0625rem 0.5rem rgba(0, 0, 0, 0.6);
  }

  @include respond-to($bp-md) {
    display: none;
  }
}

@keyframes frame-breathe {
  0%,
  100% {
    opacity: 0.55;
  }
  50% {
    opacity: 1;
  }
}

@keyframes nudge-left {
  0%,
  100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-0.3125rem);
  }
}

@keyframes nudge-right {
  0%,
  100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(0.3125rem);
  }
}

@keyframes nudge-down {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(0.3125rem);
  }
}

.guide-enter-active,
.guide-leave-active {
  transition: opacity 0.45s ease;
}

.guide-enter-from,
.guide-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .intro-overlay__frame,
  .intro-overlay__pointer {
    animation: none;
  }
}
</style>
