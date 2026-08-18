<template>
  <section ref="root" class="career">
    <div class="career__head">
      <p class="career__eyebrow reveal">Career</p>
      <h1 class="career__title reveal">
        화면을 만들어 온 <em class="career__accent">{{ careerTotal }}</em>
      </h1>
      <SentenceText class="career__summary reveal" :text="summary" />
    </div>

    <div class="career__timeline">
      <div class="career__track" :style="trackStyle">
        <svg
          class="career__curve"
          :viewBox="`0 0 ${VB_W} ${VB_H}`"
          :width="VB_W"
          :height="VB_H"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="careerLine" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stop-color="#7de3b6" />
              <stop offset="55%" stop-color="#5ec8e5" />
              <stop offset="100%" stop-color="#8f8bff" />
            </linearGradient>
          </defs>
          <path class="career__curve-base" :d="pathD" />
          <path
            class="career__curve-progress"
            :d="pathD"
            :style="progressStyle"
          />
        </svg>

        <button
          v-for="(c, i) in career"
          :key="c.id"
          class="career__node"
          :class="[
            `career__node--${i % 2 === 0 ? 'down' : 'up'}`,
            { 'career__node--active': i === innerIndex, 'career__node--past': i < innerIndex },
          ]"
          :style="nodeStyle(i)"
          :aria-current="i === innerIndex ? 'true' : undefined"
          :aria-label="`${c.year}년 ${c.company} 경력 보기`"
          @click="emit('select-career', i)"
        >
          <span class="career__pulse" />
          <span class="career__dot" />
          <span class="career__stem" />
          <span class="career__card">
            <span class="career__year">{{ c.year }}</span>
            <span class="career__company">{{ c.company }}</span>
            <span v-if="c.team" class="career__team">{{ c.team }}</span>
            <span class="career__period">{{ c.period }}</span>
            <span class="career__duration">{{ c.duration }}</span>
          </span>
        </button>
      </div>
    </div>

    <div class="career__hud">
      <span class="career__count">
        <b>{{ pad(innerIndex + 1) }}</b> / {{ pad(career.length) }}
      </span>
      <span class="career__hint">스크롤하여 경력 이동</span>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import SentenceText from '../SentenceText.vue'
import { career, careerTotal } from '../../data/career.js'
import { useSectionReveal } from '../../composables/useSectionReveal.js'

const props = defineProps({
  innerIndex: { type: Number, default: 0 },
  active: { type: Boolean, default: false },
})

const emit = defineEmits(['select-career'])

const summary = `디자인에서 퍼블리싱으로, 다시 컴포넌트 설계로. 다섯 곳의 팀에서 쌓아 온 ${careerTotal}의 기록입니다.`

const GAP = 360
const PAD = 240
const EASE = 0.55
const VB_H = 520
const CURVE_Y = [318, 284, 300, 244, 200]

const VB_W = PAD * 2 + (career.length - 1) * GAP
const nodes = career.map((c, i) => ({
  x: PAD + i * GAP,
  y: CURVE_Y[i % CURVE_Y.length],
}))

const segments = nodes.slice(0, -1).map((p1, i) => {
  const p2 = nodes[i + 1]
  const dx = (p2.x - p1.x) * EASE
  return {
    p1,
    p2,
    c1: { x: p1.x + dx, y: p1.y },
    c2: { x: p2.x - dx, y: p2.y },
  }
})

const pathD =
  `M ${nodes[0].x} ${nodes[0].y} ` +
  segments
    .map((s) => `C ${s.c1.x} ${s.c1.y} ${s.c2.x} ${s.c2.y} ${s.p2.x} ${s.p2.y}`)
    .join(' ')

function pointAt(s, t) {
  const u = 1 - t
  const a = u * u * u
  const b = 3 * u * u * t
  const c = 3 * u * t * t
  const d = t * t * t
  return {
    x: a * s.p1.x + b * s.c1.x + c * s.c2.x + d * s.p2.x,
    y: a * s.p1.y + b * s.c1.y + c * s.c2.y + d * s.p2.y,
  }
}

const lengths = segments.map((s) => {
  let len = 0
  let prev = s.p1
  for (let i = 1; i <= 60; i++) {
    const pt = pointAt(s, i / 60)
    len += Math.hypot(pt.x - prev.x, pt.y - prev.y)
    prev = pt
  }
  return len
})

const totalLength = lengths.reduce((a, b) => a + b, 0)
const drawn = nodes.map((_, i) =>
  lengths.slice(0, i).reduce((a, b) => a + b, 0)
)

const clamped = computed(() =>
  Math.max(0, Math.min(career.length - 1, props.innerIndex))
)

const trackStyle = computed(() => ({
  transform: `translate3d(${-nodes[clamped.value].x}px, -50%, 0)`,
}))

const progressStyle = computed(() => ({
  strokeDasharray: `${drawn[clamped.value]} ${totalLength}`,
}))

function nodeStyle(i) {
  return { left: `${nodes[i].x}px`, top: `${nodes[i].y}px` }
}

function pad(n) {
  return String(n).padStart(2, '0')
}

const root = ref(null)

const HEAD_DELAY = 0.35
const HEAD_DURATION = 0.85
const HEAD_STAGGER = 0.18
const HEAD_COUNT = 3
const HEAD_TAIL = 0.15
const HUD_DELAY =
  HEAD_DELAY + HEAD_STAGGER * (HEAD_COUNT - 1) + HEAD_DURATION - HEAD_TAIL

useSectionReveal(root, () => props.active, {
  selector: '.career__head .reveal',
  from: { x: -72, opacity: 0, clipPath: 'inset(0 100% 0 0)' },
  to: { x: 0, opacity: 1, clipPath: 'inset(0 0% 0 0)', clearProps: 'clipPath' },
  duration: HEAD_DURATION,
  stagger: HEAD_STAGGER,
  delay: HEAD_DELAY,
  ease: 'power3.out',
})

useSectionReveal(root, () => props.active, {
  selector: '.career__hud > *',
  from: { x: 72, opacity: 0, clipPath: 'inset(0 0 0 100%)' },
  to: { x: 0, opacity: 1, clipPath: 'inset(0 0 0 0%)', clearProps: 'clipPath' },
  duration: 0.45,
  stagger: 0.08,
  delay: HUD_DELAY,
  ease: 'power3.out',
})
</script>

<style scoped lang="scss">
.career {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  overflow: hidden;
  padding: 96px 64px;
  color: #fff;
  background: radial-gradient(
      120% 90% at 12% 0%,
      rgba(126, 227, 182, 0.18) 0%,
      rgba(126, 227, 182, 0) 60%
    ),
    linear-gradient(150deg, #0f2027 0%, #203a43 55%, #2c5364 100%);

  &__head {
    position: relative;
    z-index: 2;
    max-width: 620px;
    text-shadow: 0 1px 12px rgba(0, 0, 0, 0.35);
  }

  &__eyebrow {
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.7);
  }

  &__title {
    margin-top: 14px;
    font-size: 42px;
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  &__accent {
    font-style: normal;
    background: linear-gradient(90deg, #7de3b6 0%, #5ec8e5 55%, #8f8bff 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  &__summary {
    margin-top: 16px;
    font-size: 19px;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.78);
  }

  &__timeline {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 32%;
    z-index: 1;
  }

  &__track {
    position: absolute;
    left: 50%;
    top: 50%;
    transition: $transition-slide;
    will-change: transform;
  }

  &__curve {
    display: block;
    overflow: visible;
  }

  &__curve-base {
    fill: none;
    stroke: rgba(255, 255, 255, 0.16);
    stroke-width: 2;
    stroke-linecap: round;
  }

  &__curve-progress {
    fill: none;
    stroke: url(#careerLine);
    stroke-width: 3;
    stroke-linecap: round;
    filter: drop-shadow(0 0 10px rgba(94, 200, 229, 0.5));
    transition: stroke-dasharray 0.6s cubic-bezier(0.7, 0, 0.3, 1);
  }

  &__node {
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    padding: 0;
    text-align: left;
  }

  &__dot {
    position: absolute;
    left: 0;
    top: 0;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.4);
    transform: translate(-50%, -50%);
    z-index: 3;
    transition: transform $transition-nav, background $transition-base,
      box-shadow $transition-base;
  }

  &__pulse {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    width: 24px;
    height: 24px;
    margin: -12px 0 0 -12px;
    border-radius: 50%;
    border: 1px solid rgba(158, 232, 246, 0.9);
    opacity: 0;
    pointer-events: none;
  }

  &__stem {
    position: absolute;
    left: 0;
    z-index: 1;
    width: 0;
    height: 46px;
    border-left: 1px dashed rgba(255, 255, 255, 0.28);
    transition: border-color $transition-base;
  }

  &__card {
    position: absolute;
    left: 50%;
    display: flex;
    flex-direction: column;
    gap: 3px;
    width: 224px;
    padding: 13px 15px;
    border-radius: var(--radius-sm);
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(6px);
    opacity: 0.55;
    transform: translateX(-50%);
    transition: opacity $transition-base, background $transition-base,
      border-color $transition-base, transform $transition-nav;
  }

  &__node--down {
    .career__stem {
      top: 0;
    }

    .career__card {
      top: 58px;
    }
  }

  &__node--up {
    .career__stem {
      bottom: 0;
    }

    .career__card {
      bottom: 58px;
    }
  }

  &__node--past {
    .career__dot {
      background: rgba(126, 227, 182, 0.75);
    }

    .career__card {
      opacity: 0.75;
    }
  }

  &__node--active {
    .career__dot {
      background: #fff;
      transform: translate(-50%, -50%) scale(1.9);
      animation: dot-pulse 2.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }

    .career__pulse {
      animation: dot-ripple 2.4s cubic-bezier(0.2, 0.6, 0.3, 1) infinite;
    }

    .career__stem {
      border-left-color: rgba(255, 255, 255, 0.55);
    }

    .career__card {
      opacity: 1;
      background: rgba(255, 255, 255, 0.12);
      border-color: rgba(255, 255, 255, 0.32);
      transform: translateX(-50%) translateY(0) scale(1.04);
    }
  }

  &__node:hover .career__card {
    opacity: 1;
  }

  &__year {
    font-size: 22px;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: #9ff0cd;
  }

  &__company {
    margin-top: 2px;
    font-size: 17px;
    font-weight: 700;
  }

  &__team {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.62);
  }

  &__period {
    margin-top: 6px;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.02em;
    color: rgba(255, 255, 255, 0.8);
  }

  &__duration {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.55);
  }

  &__hud {
    position: absolute;
    right: 64px;
    top: 96px;
    z-index: 3;
    @include flex(column, flex-start, flex-end, 8px);
    text-align: right;
  }

  &__count {
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.08em;
    color: rgba(255, 255, 255, 0.5);

    b {
      font-size: 20px;
      color: #fff;
    }
  }

  &__hint {
    padding-top: 8px;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    font-size: 14px;
    letter-spacing: 0.04em;
    color: rgba(255, 255, 255, 0.45);
  }

  @include respond-to($bp-md) {
    height: auto;
    min-height: auto;
    padding: 64px 28px;

    &__title {
      font-size: 32px;
    }

    &__timeline {
      position: static;
      margin-top: 36px;
      overflow: visible;
    }

    &__track {
      position: static;
      @include flex(column, flex-start, stretch, 14px);
      padding-left: 24px;
      border-left: 2px solid rgba(255, 255, 255, 0.18);
      transform: none !important;
    }

    &__curve {
      display: none;
    }

    &__node {
      position: relative;
      left: auto !important;
      top: auto !important;
      width: 100%;
      height: auto;
    }

    &__dot {
      left: -25px;
      top: 30px;
    }

    &__node--active .career__dot {
      transform: translate(-50%, -50%) scale(1.4);
      box-shadow: 0 0 0 4px rgba(94, 200, 229, 0.25);
    }

    &__stem {
      display: none;
    }

    &__card,
    &__node--down .career__card,
    &__node--up .career__card {
      position: static;
      width: 100%;
      opacity: 1;
      transform: none !important;
    }

    &__hud {
      position: static;
      margin-top: 28px;
      align-items: flex-start;
      text-align: left;
    }

    &__hint {
      display: none;
    }
  }
}

@keyframes dot-pulse {
  0%,
  100% {
    box-shadow: 0 0 0 4px rgba(94, 200, 229, 0.24),
      0 0 18px rgba(94, 200, 229, 0.5);
  }
  50% {
    box-shadow: 0 0 0 7px rgba(94, 200, 229, 0.14),
      0 0 26px rgba(94, 200, 229, 0.72);
  }
}

@keyframes dot-ripple {
  0% {
    opacity: 0.75;
    transform: scale(0.95);
  }
  70% {
    opacity: 0;
    transform: scale(2.9);
  }
  100% {
    opacity: 0;
    transform: scale(2.9);
  }
}

@media (prefers-reduced-motion: reduce) {
  .career__track,
  .career__curve-progress,
  .career__card,
  .career__dot {
    transition: none;
  }

  .career__node--active .career__dot,
  .career__node--active .career__pulse {
    animation: none;
  }
}
</style>
