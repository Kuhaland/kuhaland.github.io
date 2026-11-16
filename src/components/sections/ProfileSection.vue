<template>
  <section ref="root" class="section">
    <div class="section__inner">
      <span class="section__tag reveal">{{ item.labelEn }}</span>
      <h1 class="section__title reveal">{{ item.headline }}</h1>
      <SentenceText class="section__summary reveal" :text="item.detail" />

      <ul v-if="item.highlights?.length" class="profile-sec__grid reveal">
        <li v-for="h in item.highlights" :key="h.label" class="profile-sec__card">
          <span class="profile-sec__label">{{ h.label }}</span>
          <span class="profile-sec__value">{{ h.value }}</span>
        </li>
      </ul>

      <SentenceText
        v-if="item.outro"
        class="profile-sec__outro reveal"
        :text="item.outro"
      />

      <div class="profile-sec__groups reveal">
        <div v-if="item.strengths?.length" class="profile-sec__group">
          <h2 class="profile-sec__heading">핵심 역량</h2>
          <ul class="profile-sec__chips">
            <li v-for="s in item.strengths" :key="s" class="profile-sec__chip">
              {{ s }}
            </li>
          </ul>
        </div>
        <div v-if="item.skills?.length" class="profile-sec__group">
          <h2 class="profile-sec__heading">Skills</h2>
          <ul class="profile-sec__chips">
            <li
              v-for="s in item.skills"
              :key="s"
              class="profile-sec__chip profile-sec__chip--line"
            >
              {{ s }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import SentenceText from '../SentenceText.vue'
import { useSectionReveal } from '../../composables/useSectionReveal.js'

const props = defineProps({
  item: { type: Object, required: true },
  active: { type: Boolean, default: false },
})

const root = ref(null)
useSectionReveal(root, () => props.active)
</script>

<style scoped lang="scss">
@include section-styles;

.section {
  justify-content: center;
  height: 100vh;
  background: linear-gradient(160deg, #18181b 0%, #26232f 55%, #3a2348 100%);

  &::before {
    background: none;
  }

  &__summary {
    max-width: 48rem;
    font-size: 1.125rem;
  }
}

.profile-sec {
  &__grid {
    margin: 1.75rem 0 0;
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.75rem;
    max-width: 56rem;
  }

  &__card {
    @include flex(column, flex-start, flex-start, 0.375rem);
    padding: 1rem 1.125rem;
    border-radius: var(--radius-md);
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    text-shadow: none;
  }

  &__label {
    font-size: 0.875rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    color: #c4a8ff;
  }

  &__value {
    font-size: 1rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.88);
  }

  &__outro {
    margin-top: 1.25rem;
    max-width: 48rem;
    font-size: 1rem;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.65);
  }

  &__groups {
    @include flex(column, flex-start, stretch, 1.25rem);
    margin-top: 1.75rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.14);
    max-width: 56rem;
  }

  &__heading {
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.02em;
  }

  &__chips {
    margin: 0.75rem 0 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  &__chip {
    padding: 0.375rem 0.875rem;
    border-radius: 62.4375rem;
    background: rgba(255, 255, 255, 0.12);
    font-size: 0.9375rem;
    font-weight: 600;
    text-shadow: none;

    &--line {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.28);
      color: rgba(255, 255, 255, 0.85);
    }
  }

  @media (max-height: 820px) {
    &__grid {
      margin-top: 1.125rem;
    }

    &__card {
      padding: 0.75rem 1rem;
    }

    &__outro {
      display: none;
    }

    &__groups {
      margin-top: 1.125rem;
      padding-top: 1rem;
    }
  }

  @include respond-to($bp-md) {
    &__grid {
      grid-template-columns: 1fr;
    }
  }
}

@include respond-to($bp-md) {
  .section {
    height: auto;
  }
}
</style>
