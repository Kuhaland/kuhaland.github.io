<template>
  <section ref="root" class="section">
    <CodeTyping class="section__bg" />
    <div class="section__inner">
      <ProfileCard
        class="section__card"
        :profile="item.profile"
        :active="active"
        @contact="emit('contact')"
      >
        <img
          class="section__image"
          :src="aboutImage"
          alt="웹퍼블리셔 이형화를 소개하는 대표 이미지"
        />
        <p class="section__eyebrow">{{ item.headlineEn }}</p>
        <h1 class="section__title">{{ item.headline }}</h1>
        <SentenceText class="section__summary" :text="item.summary" />
      </ProfileCard>
    </div>
  </section>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { gsap } from '../../plugins/gsap.js'
import aboutImage from '@/assets/images/logo.png'
import CodeTyping from './CodeTyping.vue'
import SentenceText from '../SentenceText.vue'
import ProfileCard from '../ProfileCard.vue'
import { useSectionReveal } from '../../composables/useSectionReveal.js'

const props = defineProps({
  item: { type: Object, required: true },
  active: { type: Boolean, default: false },
})

const emit = defineEmits(['contact'])

const root = ref(null)

function cardEl() {
  return root.value?.querySelector('.section__card')
}

function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function enter() {
  const el = cardEl()
  if (!el) return
  gsap.killTweensOf(el)
  gsap.set(el, { clearProps: 'transform,opacity' })
  if (reducedMotion()) return
  gsap.fromTo(
    el,
    { y: () => -window.innerHeight * 0.7, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.75,
      delay: 0.5,
      ease: 'back.out(1.8)',
      immediateRender: true,
    }
  )
}

watch(
  () => props.active,
  (active) => {
    if (active) nextTick(enter)
  },
  { immediate: true }
)

useSectionReveal(root, () => props.active)

function leave() {
  const el = cardEl()
  if (!el || reducedMotion()) {
    return Promise.resolve()
  }
  gsap.killTweensOf(el)
  return new Promise((resolve) => {
    gsap
      .timeline()
      .to(el, { y: 20, duration: 0.16, ease: 'power2.out' })
      .to(el, {
        y: () => -window.innerHeight * 0.7,
        opacity: 0,
        duration: 0.5,
        ease: 'back.in(2)',
      })
      .add(resolve, '-=0.2')
  })
}

defineExpose({ leave })
</script>

<style scoped lang="scss">
@include section-styles;

.section {
  overflow: hidden;
  background: linear-gradient(135deg, #1e1b4b 0%, #7a2a8f 60%, #c13584 100%);

  &::before {
    z-index: 1;
    background: linear-gradient(
      120deg,
      rgba(15, 12, 41, 0.72) 0%,
      rgba(15, 12, 41, 0.45) 45%,
      rgba(15, 12, 41, 0.15) 100%
    );
  }

  &__bg {
    z-index: 0;
  }

  &__inner {
    z-index: 2;
  }

  &__image {
    display: block;
    height: 2.5rem;
    width: auto;
    max-width: 10rem;
    margin-bottom: 1rem;
    object-fit: contain;
  }

  &__eyebrow {
    font-size: 0.9375rem;
    font-weight: 500;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.6);
  }

  &__title {
    margin-top: 0.5rem;
    font-size: 1.625rem;
    line-height: 1.35;
  }

  &__summary {
    margin-top: 0.75rem;
    font-size: 1rem;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.72);
  }

  &__inner {
    @include flex(row, flex-end, center);
    flex: 1;
    padding-left: 38rem;
    text-shadow: none;
  }

  &__card {
    width: 100%;
    min-width: 18rem;
    max-width: 30rem;
  }

  @media (max-width: 1180px) {
    &__bg :deep(.code-typing__list) {
      font-size: 0.8125rem;
    }

    &__inner {
      padding-left: 29rem;
    }
  }

  @media (max-height: 820px) {
    &__image {
      height: 2rem;
      margin-bottom: 0.75rem;
    }

    &__title {
      margin-top: 0.375rem;
      font-size: 1.375rem;
    }

    &__summary {
      margin-top: 0.5rem;
      font-size: 0.9375rem;
    }
  }
}

@include respond-to($bp-md) {
  .section__inner {
    justify-content: center;
    padding-left: 0;
  }

  .section__card {
    width: 100%;
    max-width: 30rem;
  }
}
</style>
