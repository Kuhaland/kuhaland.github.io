<template>
  <div class="code-typing" aria-hidden="true">
    <div class="code-typing__bar">
      <span class="code-typing__dot" />
      <span class="code-typing__dot" />
      <span class="code-typing__dot" />
      <span class="code-typing__file">App.vue</span>
    </div>
    <ol class="code-typing__list">
      <li v-for="(ln, i) in shown" :key="i" class="code-typing__line">
        <code class="code-typing__text">{{ ln
          }}<span v-if="i === shown.length - 1" class="code-typing__caret" /></code>
      </li>
    </ol>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const lines = [
  "import { ref, computed, onMounted } from 'vue'",
  '',
  'export default {',
  '  setup() {',
  '    const count = ref(0)',
  '    const doubled = computed(() => count.value * 2)',
  '',
  '    function increment() {',
  '      count.value++',
  '    }',
  '',
  '    onMounted(() => {',
  '      console.log("ready:", count.value)',
  '    })',
  '',
  '    return { count, doubled, increment }',
  '  },',
  '}',
]

const done = ref([])
const current = ref('')
let li = 0
let ci = 0
let timer = null

const shown = computed(() =>
  li >= lines.length ? done.value : [...done.value, current.value]
)

function tick() {
  if (li >= lines.length) {
    timer = setTimeout(restart, 1800)
    return
  }
  const line = lines[li]
  if (ci < line.length) {
    ci++
    current.value = line.slice(0, ci)
    timer = setTimeout(tick, 24 + Math.random() * 42)
  } else {
    done.value = [...done.value, line]
    current.value = ''
    li++
    ci = 0
    timer = setTimeout(tick, line === '' ? 40 : 130)
  }
}

function restart() {
  done.value = []
  current.value = ''
  li = 0
  ci = 0
  tick()
}

function prefersReduced() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

onMounted(() => {
  if (prefersReduced()) {
    done.value = [...lines]
    li = lines.length
    return
  }
  timer = setTimeout(tick, 300)
})

onBeforeUnmount(() => {
  clearTimeout(timer)
})
</script>

<style scoped lang="scss">
.code-typing {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  background: linear-gradient(
    135deg,
    #1e1b4b 0%,
    #3b0f6f 42%,
    #7a2a8f 72%,
    #c13584 100%
  );
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;

  &__bar {
    @include flex(row, flex-start, center, 8px);
    height: 40px;
    padding: 0 18px;
    background: rgba(255, 255, 255, 0.06);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  &__dot {
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: #30363d;

    &:nth-child(1) {
      background: #ff5f57;
    }
    &:nth-child(2) {
      background: #febc2e;
    }
    &:nth-child(3) {
      background: #28c840;
    }
  }

  &__file {
    margin-left: 10px;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.6);
  }

  &__list {
    margin: 0;
    padding: 22px 26px;
    list-style: none;
    counter-reset: line;
    font-size: 15px;
    line-height: 1.8;
  }

  &__line {
    @include flex(row, flex-start, flex-start, 20px);

    &::before {
      counter-increment: line;
      content: counter(line);
      flex-shrink: 0;
      width: 26px;
      text-align: right;
      color: rgba(255, 255, 255, 0.4);
    }
  }

  &__text {
    white-space: pre;
    color: rgba(255, 255, 255, 0.94);
  }

  &__caret {
    display: inline-block;
    width: 8px;
    height: 1.05em;
    margin-left: 1px;
    background: #c4b5fd;
    vertical-align: text-bottom;
    animation: caret-blink 1s steps(1) infinite;
  }
}

@keyframes caret-blink {
  50% {
    opacity: 0;
  }
}
</style>
