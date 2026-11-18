<template>
  <section ref="root"
           class="pf"
  >
    <!-- Header -->
    <header class="pf__head reveal">
      <h1 class="pf__title">{{ item.labelEn }}</h1>
      <SentenceText class="pf__sub"
                    :text="item.headline"
      />
    </header>
    <!-- Content -->
    <div class="pf__grid">
      <!-- User Card -->
      <article class="pf__card pf__card--user reveal">
        <h2 class="pf__name">{{ item.name }}</h2>
        <p class="pf__role">{{ item.role }}</p>
        <div class="pf__avatar">
          <HorseAvatar class="pf__avatar-img"
                       :label="`${item.name} 프로필 이미지`"
          />
        </div>
      </article>
      <!-- Bio Card -->
      <article class="pf__card pf__card--bio reveal">
        <div class="pf__card-head">
          <h2 class="pf__card-title">Bio &amp; other details</h2>
          <span class="pf__dot"
                aria-hidden="true"
          />
        </div>
        <dl class="pf__details">
          <div v-for="h in item.highlights"
               :key="h.label"
               class="pf__field"
          >
            <dt class="pf__label">{{ h.label }}</dt>
            <dd class="pf__value">{{ h.value }}</dd>
          </div>
          <div class="pf__field">
            <dt class="pf__label">Availability</dt>
            <dd class="pf__value pf__value--status">
              <span v-for="a in item.availability"
                    :key="a"
                    class="pf__status"
              >{{ a }}</span>
            </dd>
          </div>
          <div class="pf__field">
            <dt class="pf__label">핵심 역량</dt>
            <dd class="pf__value pf__value--tags">
              {{ item.strengths.map((s) => `#${s.replace(/\s/g, '')}`).join(', ') }}
            </dd>
          </div>
        </dl>
      </article>
      <!-- Skills Card -->
      <article class="pf__card pf__card--skills reveal">
        <h2 class="pf__card-title">Skills</h2>
        <div class="pf__skill-groups">
          <section v-for="g in item.skills"
                   :key="g.group"
                   class="pf__skill-group"
          >
            <h3 class="pf__skill-label">{{ g.group }}</h3>
            <ul class="pf__chips">
              <li v-for="s in g.items"
                  :key="s"
                  class="pf__chip"
              >{{ s }}</li>
            </ul>
          </section>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import HorseAvatar from '../HorseAvatar.vue'
import SentenceText from '../SentenceText.vue'
import { useSectionReveal } from '../../composables/useSectionReveal.js'

const props = defineProps({
  item: { type: Object, required: true },
  active: { type: Boolean, default: false },
})

const root = ref(null)
useSectionReveal(root, () => props.active, { stagger: 0.08 })
</script>

<style scoped lang="scss">
.pf {
  --pf-bg: #1c1c1f; --pf-card: #222226; --pf-line: #34343a; --pf-text: #f4f4f5; --pf-muted: #8e8e96; --pf-green: #7ee26b;

  @include flex(column, flex-start, stretch);
  height: 100vh;
  padding: 2.5rem 3rem; padding-left: calc(var(--nav-space, 0px) + 3rem);
  transition: padding-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: var(--pf-bg);
  color: var(--pf-text);

  &__head {
    padding-bottom: 1.25rem;
    border-bottom: 1px dashed var(--pf-line);
  }

  &__title {
    font-size: 2rem; font-weight: 700; letter-spacing: -0.02em;
  }

  &__sub {
    margin-top: 0.375rem;
    font-size: 0.9375rem; line-height: 1.6; color: var(--pf-muted);
  }

  &__grid {
    flex: 1;
    min-height: 0;
    display: grid; grid-template-columns: minmax(16rem, 1fr) 2fr; grid-template-rows: minmax(0, 1fr) auto; gap: 1.25rem;
    margin-top: 1.5rem;
  }

  &__card {
    min-width: 0; min-height: 0;
    overflow: hidden auto; scrollbar-width: thin; scrollbar-color: var(--pf-line) transparent;
    padding: 1.5rem;
    border-radius: 1rem;
    background: var(--pf-card);
    border: 1px solid var(--pf-line);

    &--user {
      @include flex(column, flex-start, center);
      text-align: center;
    }

    &--bio {
      display: flex; flex-direction: column;
    }

    &--skills {
      grid-column: 1 / -1;
    }
  }

  &__name {
    font-size: 1.5rem; font-weight: 700;
  }

  &__role {
    margin-top: 0.25rem;
    font-size: 0.9375rem; color: var(--pf-green);
  }

  &__avatar {
    flex: 1;
    min-height: 0; width: 100%;
    @include flex-center;
    margin-top: 1.25rem;

  }

  &__avatar-img {
    height: 100%; max-height: 17rem; width: auto; aspect-ratio: 1;
    border-radius: 50%; border: 0.75rem solid #3a3a40;
    clip-path: circle(50%);
  }

  &__avatar {
    filter: drop-shadow(0 1rem 1.5rem rgba(0, 0, 0, 0.35));
  }

  &__card-head {
    @include flex(row, space-between, center);
  }

  &__card-title {
    font-size: 1.0625rem; font-weight: 600;
  }

  &__dot {
    width: 0.625rem; height: 0.625rem;
    border-radius: 50%;
    background: var(--pf-green); box-shadow: 0 0 0 0.25rem rgba(126, 226, 107, 0.15);
  }

  &__details {
    flex: 1;
    display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); grid-auto-rows: minmax(min-content, 1fr); column-gap: 2rem;
    margin: 1rem 0 0; padding: 0 0.75rem;
  }

  &__field {
    display: flex; flex-direction: column; justify-content: center;
    padding: 0.875rem 0;
    border-bottom: 1px solid var(--pf-line);
  }

  &__label {
    font-size: 0.8125rem; color: var(--pf-muted);
  }

  &__value {
    margin: 0.3125rem 0 0;
    font-size: 0.9375rem; line-height: 1.5; color: var(--pf-text);

    &--tags {
      color: #d4d4d8;
    }

    &--status {
      display: flex; flex-wrap: wrap; gap: 0.375rem;
    }
  }

  &__status {
    @include flex(row, flex-start, center, 0.5rem);
    display: inline-flex;
    padding: 0.3125rem 0.875rem;
    border-radius: 62.4375rem;
    background: rgba(126, 226, 107, 0.12);
    font-size: 0.8125rem; font-weight: 600; color: var(--pf-green);

    &::before {
      content: '';
      width: 0.4375rem; height: 0.4375rem;
      border-radius: 50%;
      background: currentColor;
    }
  }

  &__skill-groups {
    display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem 1.5rem;
    margin-top: 1rem;
  }

  &__skill-group {
    min-width: 0;
    padding-left: 0.875rem;
    border-left: 2px solid var(--pf-line);

    &:first-child {
      grid-column: span 2;
    }
  }

  &__skill-label {
    font-size: 0.75rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--pf-green);
  }

  &__chips {
    margin: 0.5rem 0 0; padding: 0;
    list-style: none;
    display: flex; flex-wrap: wrap; gap: 0.5rem;
  }

  &__chip {
    padding: 0.375rem 0.75rem;
    border-radius: 0.5rem;
    background: #2c2c31;
    border: 1px solid var(--pf-line);
    font-size: 0.875rem; font-weight: 500; color: #d4d4d8;
  }

  @media (max-height: 820px) {
    padding: 1.75rem 2.5rem; padding-left: calc(var(--nav-space, 0px) + 2.5rem);

    &__head {
      padding-bottom: 0.875rem;
    }

    &__title {
      font-size: 1.625rem;
    }

    &__grid {
      gap: 1rem;
      margin-top: 1rem;
    }

    &__card {
      padding: 1.125rem 1.25rem;
    }

    &__field {
      padding: 0.5rem 0;
    }

    &__value {
      font-size: 0.875rem;
    }

    &__skill-groups {
      gap: 0.625rem 1.25rem;
      margin-top: 0.75rem;
    }

    &__chips {
      margin-top: 0.375rem;
    }

    &__chip {
      padding: 0.25rem 0.625rem;
      font-size: 0.8125rem;
    }
  }

  @media (max-height: 700px) {
    padding: 1.25rem 2rem; padding-left: calc(var(--nav-space, 0px) + 2rem);

    &__head {
      padding-bottom: 0.625rem;
    }

    &__title {
      font-size: 1.375rem;
    }

    &__sub {
      margin-top: 0.25rem;
      font-size: 0.8125rem; line-height: 1.5;
    }

    &__grid {
      grid-template-columns: minmax(12rem, 0.8fr) 2fr; gap: 0.75rem;
      margin-top: 0.75rem;
    }

    &__card {
      padding: 0.875rem 1rem;
    }

    &__name {
      font-size: 1.125rem;
    }

    &__role {
      font-size: 0.75rem;
    }

    &__avatar {
      margin-top: 0.625rem;
    }

    &__avatar-img {
      border-width: 0.5rem;
    }

    &__card-title {
      font-size: 0.9375rem;
    }

    &__details {
      column-gap: 1.5rem;
      margin-top: 0.5rem; padding: 0;
    }

    &__field {
      padding: 0.625rem 0;
    }

    &__label {
      font-size: 0.6875rem;
    }

    &__value {
      margin-top: 0.3125rem;
      font-size: 0.8125rem; line-height: 1.5;
    }

    &__status {
      padding: 0.1875rem 0.625rem;
      font-size: 0.75rem;
    }

    &__skill-groups {
      display: flex; flex-wrap: wrap; gap: 0.875rem 1.75rem;
      margin-top: 0.75rem;
    }

    &__skill-label {
      font-size: 0.6875rem;
    }

    &__chips {
      margin-top: 0.4375rem;
      gap: 0.375rem;
    }

    &__chip {
      padding: 0.1875rem 0.5rem;
      font-size: 0.75rem;
    }
  }

  @include respond-to($bp-md) {
    height: auto;
    padding: 2.5rem 1.25rem;

    &__grid {
      grid-template-columns: 1fr; grid-template-rows: none;
    }

    &__avatar-img {
      height: auto; width: 70%; max-width: 15rem;
    }

    &__details {
      grid-template-columns: 1fr;
      padding: 0;
    }

    &__skill-groups {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
}
</style>
