<template>
  <Transition name="fade">
    <div v-if="showIntro" class="intro-overlay" role="presentation">
      <span class="intro-overlay__circle" aria-hidden="true" />
      <span class="intro-overlay__mouse">
        <span class="intro-overlay__wheel" />
      </span>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['done'])

const showIntro = ref(true)
let timer = null

function lockScroll() {
  document.body.style.overflow = 'hidden'
}

function unlockScroll() {
  document.body.style.overflow = ''
}

onMounted(() => {
  lockScroll()
  timer = setTimeout(() => {
    showIntro.value = false
    unlockScroll()
    emit('done')
  }, 5000)
})

onUnmounted(() => {
  clearTimeout(timer)
  unlockScroll()
})
</script>

<style scoped lang="scss">
.intro-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  @include flex-center;
  overflow: hidden;
  background: linear-gradient(135deg, #1e1b4b 0%, #7a2a8f 60%, #c13584 100%);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 1;
    background: rgba(12, 10, 30, 0.4);
  }

  &__circle {
    position: absolute;
    z-index: 2;
    width: 320px;
    height: 320px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.28) 0%,
      rgba(255, 255, 255, 0.1) 45%,
      rgba(255, 255, 255, 0) 72%
    );
    filter: blur(2px);
    box-shadow: 0 0 80px rgba(255, 255, 255, 0.18);
    animation: pulse 2.8s ease-in-out infinite;
  }

  &__mouse {
    position: relative;
    z-index: 3;
    width: 34px;
    height: 56px;
    display: flex;
    justify-content: center;
    padding-top: 9px;
    border: 2.5px solid #fff;
    border-radius: 18px;
  }

  &__wheel {
    width: 5px;
    height: 10px;
    border-radius: 3px;
    background: #fff;
    animation: scroll-wheel 1.6s ease-in-out infinite;
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.85;
  }
  50% {
    transform: scale(1.12);
    opacity: 1;
  }
}

@keyframes scroll-wheel {
  0% {
    opacity: 0;
    transform: translateY(-5px);
  }
  35% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(12px);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
