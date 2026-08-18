<template>
  <section ref="root" class="section" :style="bg">
    <div class="section__inner">
      <p class="section__eyebrow reveal">{{ item.headlineEn }}</p>
      <h1 class="section__title reveal">{{ item.headline }}</h1>
      <p class="section__summary reveal">{{ item.intro }}</p>

      <ul class="contact__list">
        <li v-for="c in item.contacts" :key="c.type" class="contact__item reveal">
          <component
            :is="c.href ? 'a' : 'span'"
            class="contact__link"
            :class="{ 'contact__link--static': !c.href }"
            :href="c.href"
            :target="c.external ? '_blank' : null"
            :rel="c.external ? 'noopener noreferrer' : null"
          >
            <span class="contact__icon">
              <AppIcon :name="c.icon" :size="22" />
            </span>
            <span class="contact__meta">
              <span class="contact__label">{{ c.label }}</span>
              <span class="contact__value">{{ c.value }}</span>
            </span>
            <AppIcon
              v-if="c.external"
              class="contact__out"
              name="open_in_new"
              :size="18"
            />
          </component>
        </li>
      </ul>

      <div class="contact__socials reveal">
        <a
          v-for="s in item.socials"
          :key="s.type"
          class="contact__social"
          :href="s.href"
          :aria-label="s.label"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AppIcon :name="s.icon" :size="22" />
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import AppIcon from '../AppIcon.vue'
import { useSectionReveal } from '../../composables/useSectionReveal.js'

const props = defineProps({
  item: { type: Object, required: true },
  active: { type: Boolean, default: false },
})

const root = ref(null)
const bg = {
  backgroundImage: 'linear-gradient(150deg, #667eea 0%, #764ba2 100%)',
}

useSectionReveal(root, () => props.active)
</script>

<style scoped lang="scss">
@include section-styles;

.section {
  padding: 72px 64px;

  &__eyebrow {
    font-size: 17px;
    font-weight: 500;
    letter-spacing: 0.04em;
    color: rgba(255, 255, 255, 0.82);
  }

  &__title {
    margin-top: 10px;
  }

  &__summary {
    max-width: 680px;
  }
}

.contact {
  &__list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    max-width: 760px;
    margin: 36px 0 0;
    padding: 0;
    list-style: none;
  }

  &__link {
    @include flex(row, flex-start, center, 14px);
    padding: 14px 18px;
    border-radius: var(--radius-md);
    border: 1px solid rgba(255, 255, 255, 0.22);
    background: rgba(255, 255, 255, 0.09);
    backdrop-filter: blur(6px);
    color: #fff;
    text-decoration: none;
    text-shadow: none;
    transition: background $transition-base, border-color $transition-base,
      transform $transition-base;

    &:hover {
      background: rgba(255, 255, 255, 0.18);
      border-color: rgba(255, 255, 255, 0.5);
      transform: translateY(-2px);
    }

    &:focus-visible {
      outline: 2px solid #fff;
      outline-offset: 3px;
    }

    &--static {
      cursor: default;

      &:hover {
        background: rgba(255, 255, 255, 0.09);
        border-color: rgba(255, 255, 255, 0.22);
        transform: none;
      }
    }
  }

  &__icon {
    @include icon-button(42px, 50%);
    background: rgba(255, 255, 255, 0.18);
  }

  &__meta {
    @include flex(column, flex-start, stretch, 2px);
    min-width: 0;
  }

  &__label {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.68);
  }

  &__value {
    font-size: 17px;
    font-weight: 600;
    @include truncate;
  }

  &__out {
    margin-left: auto;
    flex-shrink: 0;
    color: rgba(255, 255, 255, 0.6);
  }

  &__socials {
    @include flex(row, flex-start, center, 10px);
    margin-top: 26px;
  }

  &__social {
    @include icon-button(48px, 50%);
    border: 1px solid rgba(255, 255, 255, 0.26);
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    text-decoration: none;
    transition: background $transition-base, border-color $transition-base,
      transform $transition-base;

    &:hover {
      background: rgba(255, 255, 255, 0.22);
      border-color: rgba(255, 255, 255, 0.55);
      transform: translateY(-2px);
    }

    &:focus-visible {
      outline: 2px solid #fff;
      outline-offset: 3px;
    }
  }

  @include respond-to($bp-md) {
    &__list {
      grid-template-columns: minmax(0, 1fr);
      margin-top: 28px;
    }
  }

  @media (max-height: 780px) {
    &__list {
      margin-top: 26px;
      gap: 10px;
    }

    &__link {
      padding: 11px 16px;
    }

    &__socials {
      margin-top: 18px;
    }
  }
}
</style>
