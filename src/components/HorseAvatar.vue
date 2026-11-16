<template>
  <svg
    class="horse"
    viewBox="0 0 400 400"
    preserveAspectRatio="xMidYMid slice"
    role="img"
    :aria-label="label"
  >
    <defs>
      <linearGradient :id="`${uid}-bg`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#e3e8ec" />
        <stop offset="1" stop-color="#cfd6dc" />
      </linearGradient>
      <linearGradient :id="`${uid}-fur`" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#a8673a" />
        <stop offset="1" stop-color="#7c4523" />
      </linearGradient>
      <linearGradient :id="`${uid}-knit`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#8b8f94" />
        <stop offset="1" stop-color="#5f6368" />
      </linearGradient>
    </defs>

    <rect width="400" height="400" :fill="`url(#${uid}-bg)`" />
    <path
      d="M70 400 C80 330 130 300 200 300 C270 300 320 330 330 400 Z"
      :fill="`url(#${uid}-knit)`"
    />
    <g stroke="#53575c" stroke-width="3" opacity="0.5">
      <line x1="120" y1="335" x2="115" y2="400" />
      <line x1="150" y1="320" x2="148" y2="400" />
      <line x1="250" y1="320" x2="252" y2="400" />
      <line x1="280" y1="335" x2="285" y2="400" />
    </g>
    <rect x="160" y="250" width="80" height="70" rx="20" :fill="`url(#${uid}-knit)`" />
    <g stroke="#53575c" stroke-width="3" opacity="0.5">
      <line x1="175" y1="258" x2="175" y2="318" />
      <line x1="190" y1="258" x2="190" y2="318" />
      <line x1="205" y1="258" x2="205" y2="318" />
      <line x1="220" y1="258" x2="220" y2="318" />
    </g>
    <g class="horse__ear horse__ear--l">
      <path d="M150 90 L138 40 L178 78 Z" fill="#7c4523" />
      <path d="M146 82 L141 55 L164 76 Z" fill="#e6a77a" />
    </g>
    <g class="horse__ear horse__ear--r">
      <path d="M250 90 L262 40 L222 78 Z" fill="#7c4523" />
      <path d="M254 82 L259 55 L236 76 Z" fill="#e6a77a" />
    </g>
    <path
      d="M140 130 C140 85 170 70 200 70 C230 70 260 85 260 130 L262 200 C266 250 240 275 200 275 C160 275 134 250 138 200 Z"
      :fill="`url(#${uid}-fur)`"
    />
    <path
      d="M175 72 C180 55 195 52 205 58 C220 50 232 62 226 80 C215 92 200 100 185 95 C175 90 170 82 175 72 Z"
      fill="#2b1a10"
    />
    <path d="M200 78 L196 150 L204 150 Z" fill="#f4e9dc" opacity="0.9" />
    <ellipse cx="200" cy="232" rx="56" ry="44" fill="#d9a07a" />
    <ellipse cx="180" cy="220" rx="7" ry="5" fill="#4a2a17" />
    <ellipse cx="220" cy="220" rx="7" ry="5" fill="#4a2a17" />
    <path d="M165 240 Q200 275 235 240 Q200 258 165 240 Z" fill="#5a2a1a" />
    <path d="M175 243 Q200 254 225 243 L222 249 Q200 257 178 249 Z" fill="#fff" />

    <g v-if="watching">
      <ellipse cx="172" cy="158" rx="12" ry="13" fill="#fff" />
      <ellipse cx="228" cy="158" rx="12" ry="13" fill="#fff" />
      <g :transform="`translate(${pupil.x} ${pupil.y})`">
        <circle cx="172" cy="159" r="6.5" fill="#2b1a10" />
        <circle cx="228" cy="159" r="6.5" fill="#2b1a10" />
        <circle cx="170" cy="156" r="2" fill="#fff" />
        <circle cx="226" cy="156" r="2" fill="#fff" />
      </g>
      <path d="M159 152 Q172 140 185 152" stroke="#2b1a10" stroke-width="4" fill="none" stroke-linecap="round" />
      <path d="M215 152 Q228 140 241 152" stroke="#2b1a10" stroke-width="4" fill="none" stroke-linecap="round" />
    </g>
    <g v-else>
      <path d="M160 160 Q172 148 184 160" stroke="#2b1a10" stroke-width="5" fill="none" stroke-linecap="round" />
      <path d="M216 160 Q228 148 240 160" stroke="#2b1a10" stroke-width="5" fill="none" stroke-linecap="round" />
    </g>
    <ellipse cx="160" cy="180" rx="10" ry="6" fill="#e07a6a" opacity="0.45" />
    <ellipse cx="240" cy="180" rx="10" ry="6" fill="#e07a6a" opacity="0.45" />

    <g
      v-if="watching"
      :transform="`translate(${fly.x} ${fly.y}) rotate(${fly.r})`"
    >
      <g class="horse__wing horse__wing--l">
        <path d="M0 0 C-14 -16 -26 -10 -22 2 C-26 12 -12 18 0 4 Z" fill="#f4a63a" />
        <circle cx="-14" cy="-4" r="3" fill="#fff" opacity="0.7" />
      </g>
      <g class="horse__wing horse__wing--r">
        <path d="M0 0 C14 -16 26 -10 22 2 C26 12 12 18 0 4 Z" fill="#f4a63a" />
        <circle cx="14" cy="-4" r="3" fill="#fff" opacity="0.7" />
      </g>
      <rect x="-1.5" y="-6" width="3" height="14" rx="1.5" fill="#3a2414" />
      <path
        d="M-1 -6 Q-5 -13 -8 -14 M1 -6 Q5 -13 8 -14"
        stroke="#3a2414"
        stroke-width="1.2"
        fill="none"
        stroke-linecap="round"
      />
    </g>
  </svg>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, useId } from 'vue'

defineProps({
  label: { type: String, default: '프로필 이미지' },
})

const FIRST_SMILE_MS = 3000
const SMILE_MS = 2000
const FLIGHT_MS = 2200
const EYES = [
  { x: 172, y: 158 },
  { x: 228, y: 158 },
]
const PUPIL_RANGE = 5

const uid = `horse-${useId()}`
const watching = ref(false)
const fly = reactive({ x: -40, y: 80, r: 0 })
const pupil = reactive({ x: 0, y: 0 })

let timer = null
let frame = null

function rand(min, max) {
  return min + Math.random() * (max - min)
}

function randomPath() {
  const fromLeft = Math.random() < 0.5
  const startY = rand(30, 140)
  const endY = rand(30, 140)
  return {
    x0: fromLeft ? -40 : 440,
    x1: fromLeft ? 440 : -40,
    y0: startY,
    y1: endY,
    amp: rand(12, 30),
    waves: rand(1.5, 3),
    phase: rand(0, Math.PI * 2),
  }
}

function pointAt(p, t) {
  const x = p.x0 + (p.x1 - p.x0) * t
  const y =
    p.y0 + (p.y1 - p.y0) * t + Math.sin(t * Math.PI * 2 * p.waves + p.phase) * p.amp
  return { x, y }
}

function lookAt(x, y) {
  const cx = (EYES[0].x + EYES[1].x) / 2
  const cy = EYES[0].y
  const dx = x - cx
  const dy = y - cy
  const len = Math.hypot(dx, dy) || 1
  pupil.x = (dx / len) * PUPIL_RANGE
  pupil.y = (dy / len) * PUPIL_RANGE
}

function startFlight() {
  const path = randomPath()
  const start = performance.now()
  watching.value = true

  const step = (now) => {
    const t = Math.min(1, (now - start) / FLIGHT_MS)
    const p = pointAt(path, t)
    const ahead = pointAt(path, Math.min(1, t + 0.02))
    fly.x = p.x
    fly.y = p.y
    fly.r = Math.max(-25, Math.min(25, (ahead.y - p.y) * 3))
    lookAt(p.x, p.y)
    if (t < 1) {
      frame = requestAnimationFrame(step)
    } else {
      watching.value = false
      timer = setTimeout(startFlight, SMILE_MS)
    }
  }
  frame = requestAnimationFrame(step)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timer = setTimeout(startFlight, FIRST_SMILE_MS)
})

onBeforeUnmount(() => {
  clearTimeout(timer)
  cancelAnimationFrame(frame)
})
</script>

<style scoped lang="scss">
.horse {
  display: block;

  &__ear {
    transform-box: fill-box;
    animation: horse-ear 3s ease-in-out infinite;

    &--l {
      transform-origin: 80% 100%;
    }

    &--r {
      transform-origin: 20% 100%;
      animation-name: horse-ear-r;
    }
  }

  &__wing {
    transform-box: fill-box;
    transform-origin: 100% 50%;
    animation: horse-flap 0.18s ease-in-out infinite alternate;

    &--r {
      transform-origin: 0% 50%;
    }
  }
}

@keyframes horse-ear {
  0%, 82%, 100% { transform: rotate(0deg); }
  86% { transform: rotate(-16deg); }
  90% { transform: rotate(6deg); }
  94% { transform: rotate(-8deg); }
}

@keyframes horse-ear-r {
  0%, 82%, 100% { transform: rotate(0deg); }
  86% { transform: rotate(16deg); }
  90% { transform: rotate(-6deg); }
  94% { transform: rotate(8deg); }
}

@keyframes horse-flap {
  from { transform: scaleX(1); }
  to { transform: scaleX(0.25); }
}

@media (prefers-reduced-motion: reduce) {
  .horse__ear,
  .horse__wing {
    animation: none;
  }
}
</style>
