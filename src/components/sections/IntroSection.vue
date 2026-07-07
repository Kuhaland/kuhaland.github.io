<template>
  <div class="intro">
    <div class="intro__track" :style="hStyle">
      <div v-for="(s, i) in samples" :key="i" class="intro__sample">
        <SampleSlide :data="s" :active="active && i === innerIndex" />
      </div>
    </div>

    <div class="intro__dots">
      <button
        v-for="(s, i) in samples"
        :key="i"
        class="intro__dot"
        :class="{ 'intro__dot--active': i === innerIndex }"
        :aria-label="`${i + 1}번째 페이지로 이동`"
        @click="emit('select-sample', i)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import SampleSlide from './SampleSlide.vue'

const props = defineProps({
  innerIndex: { type: Number, default: 0 },
  active: { type: Boolean, default: false },
})

const emit = defineEmits(['select-sample'])

const samples = [
  {
    tag: '소개 · 01',
    title: '안녕하세요, kuhaland입니다',
    body: '웹과 디자인의 경계에서 즐겁게 만드는 사람이에요. 좌우로 넘기며 저를 소개할게요.',
    bg: 'linear-gradient(150deg, #f6c99f 0%, #e8a3a0 40%, #b48ba8 100%)',
  },
  {
    tag: '소개 · 02',
    title: '무엇을 만드나요',
    body: '사용자의 목적을 자연스럽게 달성하도록 돕는 화면을 만듭니다. 명료함과 흐름을 가장 중요하게 봅니다.',
    bg: 'linear-gradient(150deg, #a8edea 0%, #7ac8e0 50%, #5f8bd6 100%)',
  },
  {
    tag: '소개 · 03',
    title: '어떻게 일하나요',
    body: '작게 나누어 빠르게 만들고, 직접 써 보며 다듬습니다. 좋은 결과물은 반복된 개선에서 나온다고 믿어요.',
    bg: 'linear-gradient(150deg, #c2e59c 0%, #64b3f4 100%)',
  },
  {
    tag: '소개 · 04',
    title: '이제 둘러볼까요',
    body: '한 번 더 넘기면 다음 섹션으로 이동합니다. 작업과 기술, 연락처를 이어서 만나보세요.',
    bg: 'linear-gradient(150deg, #fbc2eb 0%, #a6c1ee 100%)',
  },
]

const hStyle = computed(() => ({
  transform: `translateX(-${props.innerIndex * 100}%)`,
}))
</script>

<style scoped lang="scss">
.intro {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &__track {
    display: flex;
    height: 100%;
    transition: $transition-slide;
    will-change: transform;
  }

  &__sample {
    flex: 0 0 100%;
    width: 100%;
    height: 100%;
  }

  &__dots {
    position: absolute;
    left: 50%;
    bottom: 26px;
    transform: translateX(-50%);
    z-index: 5;
    @include flex(row, center, center, 10px);
  }

  &__dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    transition: $transition-base;

    &--active {
      background: #fff;
      transform: scale(1.35);
    }
  }

  @include respond-to($bp-md) {
    height: auto;

    &__track {
      flex-direction: column;
      transform: none !important;
    }

    &__sample {
      flex: none;
      height: auto;
    }

    &__dots {
      display: none;
    }
  }
}
</style>
