<template>
  <section ref="root" class="section" :style="bg">
    <div class="section__inner">
      <p class="section__eyebrow reveal">{{ item.headlineEn }}</p>
      <h1 class="section__title reveal">{{ item.headline }}</h1>
      <SentenceText class="section__summary reveal" :text="item.intro" />

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

      <div v-if="item.socials?.length" class="contact__socials reveal">
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
import SentenceText from '../SentenceText.vue'
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
  padding: 4.5rem 4rem;

  &__eyebrow {
    font-size: 1.0625rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    color: rgba(255, 255, 255, 0.82);
  }

  &__title {
    margin-top: 0.625rem;
  }

  &__summary {
    max-width: 42.5rem;
  }
}

.contact {
  &__list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.75rem;
    max-width: 47.5rem;
    margin: 2.25rem 0 0;
    padding: 0;
    list-style: none;
  }

  &__link {
    @include flex(row, flex-start, center, 0.75rem);
    padding: 0.875rem 1rem;
    border-radius: var(--radius-md);
    border: 1px solid rgba(255, 255, 255, 0.22);
    background: rgba(255, 255, 255, 0.09);
    backdrop-filter: blur(0.375rem);
    color: #fff;
    text-decoration: none;
    text-shadow: none;
    transition: background $transition-base, border-color $transition-base,
      transform $transition-base;

    &:hover {
      background: rgba(255, 255, 255, 0.18);
      border-color: rgba(255, 255, 255, 0.5);
      transform: translateY(-0.125rem);
    }

    &:focus-visible {
      outline: 2px solid #fff;
      outline-offset: 0.1875rem;
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
    @include icon-button(2.5rem, 50%);
    background: rgba(255, 255, 255, 0.18);
  }

  &__meta {
    @include flex(column, flex-start, stretch, 0.125rem);
    min-width: 0;
  }

  &__label {
    font-size: 0.8125rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.68);
  }

  &__value {
    font-size: 1.0625rem;
    font-weight: 600;
    @include truncate;
  }

  &__out {
    margin-left: auto;
    flex-shrink: 0;
    color: rgba(255, 255, 255, 0.6);
  }

  &__socials {
    @include flex(row, flex-start, center, 0.625rem);
    margin-top: 1.625rem;
  }

  &__social {
    @include icon-button(3rem, 50%);
    border: 1px solid rgba(255, 255, 255, 0.26);
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    text-decoration: none;
    transition: background $transition-base, border-color $transition-base,
      transform $transition-base;

    &:hover {
      background: rgba(255, 255, 255, 0.22);
      border-color: rgba(255, 255, 255, 0.55);
      transform: translateY(-0.125rem);
    }

    &:focus-visible {
      outline: 2px solid #fff;
      outline-offset: 0.1875rem;
    }
  }

  @include respond-to($bp-md) {
    &__list {
      grid-template-columns: minmax(0, 1fr);
      margin-top: 1.75rem;
    }
  }

  @media (max-height: 780px) {
    &__list {
      margin-top: 1.625rem;
      gap: 0.625rem;
    }

    &__link {
      padding: 0.6875rem 1rem;
    }

    &__socials {
      margin-top: 1.125rem;
    }
  }
}
</style>
