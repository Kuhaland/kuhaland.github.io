<template>
  <aside class="detail" :class="{ 'is-entered': entered }">
    <OverlayScrollbarsComponent class="detail__scroll" :options="osOptions" defer>
      <Transition name="slide" mode="out-in">
        <div
          class="detail__inner"
          :class="`detail__inner--${item.id}`"
          :key="paneKey"
        >
          <template v-if="career">
            <p class="detail__eyebrow">{{ career.companyEn }}</p>
            <div class="detail__head">
              <h2 class="detail__title">{{ career.company }}</h2>
              <span
                class="detail__ci"
                :class="{ 'detail__ci--image': career.logo }"
              >
                <img
                  v-if="career.logo"
                  class="detail__ci-img"
                  :src="career.logo"
                  :alt="`${career.company} CI`"
                />
                <span v-else class="detail__ci-mark" aria-hidden="true">
                  {{ ciMark }}
                </span>
              </span>
            </div>
            <div class="detail__divider" />

            <dl class="detail__meta">
              <div v-if="career.team" class="detail__row">
                <dt class="detail__label">
                  <AppIcon class="detail__label-icon" name="apartment" :size="18" />
                  소속
                </dt>
                <dd class="detail__value">{{ career.team }}</dd>
              </div>
              <div class="detail__row">
                <dt class="detail__label">
                  <AppIcon
                    class="detail__label-icon"
                    name="calendar_month"
                    :size="18"
                  />
                  재직 기간
                </dt>
                <dd class="detail__value">
                  {{ career.period }}
                  <span class="detail__badge">{{ career.duration }}</span>
                </dd>
              </div>
              <div class="detail__row">
                <dt class="detail__label">
                  <AppIcon class="detail__label-icon" name="badge" :size="18" />
                  직급
                </dt>
                <dd class="detail__value">{{ career.position }}</dd>
              </div>
              <div class="detail__row">
                <dt class="detail__label">
                  <AppIcon class="detail__label-icon" name="checklist" :size="18" />
                  담당 업무
                </dt>
                <dd class="detail__value">
                  <ul class="detail__tasks">
                    <li v-for="t in career.tasks" :key="t" class="detail__task">
                      {{ t }}
                    </li>
                  </ul>
                </dd>
              </div>
              <div class="detail__row">
                <dt class="detail__label">
                  <AppIcon
                    class="detail__label-icon"
                    name="workspace_premium"
                    :size="18"
                  />
                  주요 직무
                </dt>
                <dd class="detail__value">
                  <ul class="detail__skills">
                    <li
                      v-for="f in career.focus"
                      :key="f"
                      class="detail__chip detail__chip--skill"
                    >
                      <AppIcon
                        class="detail__chip-icon"
                        :name="focusIcon(f)"
                        :size="16"
                      />
                      {{ f }}
                    </li>
                  </ul>
                </dd>
              </div>
            </dl>
          </template>

          <template v-else-if="project">
            <p class="detail__eyebrow">{{ project.titleEn }}</p>
            <h2 class="detail__title">{{ project.title }}</h2>
            <div class="detail__divider" />

            <dl class="detail__meta">
              <div class="detail__row">
                <dt class="detail__label">프로젝트</dt>
                <dd class="detail__value">{{ project.project }}</dd>
              </div>
              <div v-if="project.clients" class="detail__row">
                <dt class="detail__label">참여사</dt>
                <dd class="detail__value">{{ project.clients }}</dd>
              </div>
              <div class="detail__row">
                <dt class="detail__label">담당 역할</dt>
                <dd class="detail__value">{{ project.role }}</dd>
              </div>
              <div class="detail__row">
                <dt class="detail__label">담당 업무</dt>
                <dd class="detail__value">
                  <ul class="detail__skills">
                    <li v-for="t in tasks" :key="t" class="detail__chip">
                      {{ t }}
                    </li>
                  </ul>
                </dd>
              </div>
              <div class="detail__row">
                <dt class="detail__label">성과</dt>
                <dd class="detail__value">{{ project.result }}</dd>
              </div>
            </dl>
          </template>

          <template v-else>
            <p class="detail__eyebrow">{{ item.labelEn }}</p>
            <h2 class="detail__title">{{ item.label }}</h2>
            <div class="detail__divider" />
            <SentenceText class="detail__text" :text="item.detail" />

            <ul
              v-if="item.highlights && item.highlights.length"
              class="detail__highlights"
            >
              <li
                v-for="h in item.highlights"
                :key="h.label"
                class="detail__highlight"
              >
                <span class="detail__highlight-label">{{ h.label }}</span>
                <span class="detail__highlight-value">{{ h.value }}</span>
              </li>
            </ul>

            <SentenceText
              v-if="item.outro"
              class="detail__outro"
              :text="item.outro"
            />

            <section
              v-if="item.strengths && item.strengths.length"
              class="detail__block"
            >
              <h3 class="detail__subtitle">핵심 역량</h3>
              <ul class="detail__skills">
                <li
                  v-for="s in item.strengths"
                  :key="s"
                  class="detail__chip"
                >
                  {{ s }}
                </li>
              </ul>
            </section>

            <section
              v-if="item.skills && item.skills.length"
              class="detail__block"
            >
              <h3 class="detail__subtitle">Skills</h3>
              <ul class="detail__skills">
                <li
                  v-for="s in item.skills"
                  :key="s"
                  class="detail__chip detail__chip--skill"
                >
                  {{ s }}
                </li>
              </ul>
            </section>
          </template>
        </div>
      </Transition>
    </OverlayScrollbarsComponent>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import SentenceText from './SentenceText.vue'
import AppIcon from './AppIcon.vue'

const props = defineProps({
  item: { type: Object, required: true },
  project: { type: Object, default: null },
  career: { type: Object, default: null },
  entered: { type: Boolean, default: false },
})

const osOptions = {
  scrollbars: {
    theme: 'os-theme-dark',
    autoHide: 'leave',
    autoHideDelay: 400,
  },
}

const tasks = computed(() =>
  props.project
    ? props.project.task.split('/').map((t) => t.trim()).filter(Boolean)
    : []
)

const FOCUS_ICONS = {
  GUI: 'palette',
  반응형웹: 'devices',
  '웹표준·웹접근성': 'accessibility_new',
  'UI·UX기획': 'design_services',
  모바일디자인: 'smartphone',
}

function focusIcon(name) {
  return FOCUS_ICONS[name] ?? 'bolt'
}

const ciMark = computed(() => {
  const name = props.career?.companyEn ?? ''
  const caps = name.match(/[A-Z]/g) ?? []
  return caps.length > 1 ? caps.slice(0, 2).join('') : name.slice(0, 1).toUpperCase()
})

const paneKey = computed(() => {
  if (props.career) return `career-${props.career.id}`
  if (props.project) return `work-${props.project.id}`
  return props.item.id
})
</script>

<style scoped lang="scss">
.detail {
  width: 30%;
  height: 100%;
  flex-shrink: 0;
  background: var(--color-panel);
  border-left: 1px solid var(--color-border);
  transform: translateX(100%);
  opacity: 0;
  transition: transform $transition-enter, opacity $transition-enter;
  transition-delay: 0.12s;

  &.is-entered {
    transform: translateX(0);
    opacity: 1;
  }

  &__scroll {
    width: 100%;
    height: 100%;
  }

  &__inner {
    --cat-base: #5b6bbf;
    --cat-strong: #35407a;
    --cat-body: #454a63;
    --cat-muted: #6e7288;
    --cat-soft: #{rgba(#5b6bbf, 0.07)};
    --cat-soft-strong: #{rgba(#5b6bbf, 0.13)};
    --cat-line: #{rgba(#5b6bbf, 0.18)};
    --cat-edge: #{rgba(#5b6bbf, 0.32)};

    padding: 2.5rem 2rem;

    &--career {
      --cat-base: #26766f;
      --cat-strong: #1a5651;
      --cat-body: #3b4d4b;
      --cat-muted: #5f7a78;
      --cat-soft: #{rgba(#26766f, 0.07)};
      --cat-soft-strong: #{rgba(#26766f, 0.13)};
      --cat-line: #{rgba(#26766f, 0.18)};
      --cat-edge: #{rgba(#26766f, 0.32)};
    }

    &--work {
      --cat-base: #a1602f;
      --cat-strong: #70431f;
      --cat-body: #554a41;
      --cat-muted: #7d7166;
      --cat-soft: #{rgba(#a1602f, 0.07)};
      --cat-soft-strong: #{rgba(#a1602f, 0.13)};
      --cat-line: #{rgba(#a1602f, 0.18)};
      --cat-edge: #{rgba(#a1602f, 0.32)};
    }

    &--skills {
      --cat-base: #3f7a3c;
      --cat-strong: #2b5529;
      --cat-body: #414d40;
      --cat-muted: #667a63;
      --cat-soft: #{rgba(#3f7a3c, 0.07)};
      --cat-soft-strong: #{rgba(#3f7a3c, 0.13)};
      --cat-line: #{rgba(#3f7a3c, 0.18)};
      --cat-edge: #{rgba(#3f7a3c, 0.32)};
    }

    &--contact {
      --cat-base: #7159a3;
      --cat-strong: #4e3a75;
      --cat-body: #4a4459;
      --cat-muted: #75708a;
      --cat-soft: #{rgba(#7159a3, 0.07)};
      --cat-soft-strong: #{rgba(#7159a3, 0.13)};
      --cat-line: #{rgba(#7159a3, 0.18)};
      --cat-edge: #{rgba(#7159a3, 0.32)};
    }
  }

  &__eyebrow {
    font-size: 0.9375rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--cat-base);
  }

  &__head {
    @include flex(row, space-between, center, 0.75rem);
    margin-top: 0.625rem;
  }

  &__title {
    margin-top: 0.625rem;
    font-size: 1.625rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--cat-strong);

    .detail__head & {
      margin-top: 0;
    }
  }

  &__ci {
    flex-shrink: 0;
    @include flex-center;
    min-width: 3.5rem;
    height: 3.5rem;
    padding: 0 0.625rem;
    border-radius: var(--radius-sm);
    border: 1px solid var(--cat-line);
    background: var(--cat-soft);

    &--image {
      padding: 0.375rem 0.5625rem;
      background: #fff;
      border-color: var(--color-border);
    }
  }

  &__ci-img {
    display: block;
    max-width: 5.625rem;
    max-height: 2.5rem;
    object-fit: contain;
  }

  &__ci-mark {
    font-size: 1.1875rem;
    font-weight: 800;
    letter-spacing: 0.02em;
    color: var(--cat-base);
  }

  &__divider {
    height: 0.0625rem;
    margin: 1.375rem 0;
    background: var(--cat-line);
  }

  &__text {
    font-size: 1.0625rem;
    line-height: 1.85;
    color: var(--cat-body);
  }

  &__highlights {
    margin: 1.25rem 0 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
  }

  &__highlight {
    display: flex;
    flex-direction: column;
    gap: 0.3125rem;
    padding: 0.8125rem 1rem;
    border-radius: var(--radius-sm);
    background: var(--cat-soft);
    border-left: 3px solid var(--cat-base);
    transition: background $transition-base, transform $transition-base;

    &:hover {
      background: var(--cat-soft-strong);
      transform: translateX(0.125rem);
    }
  }

  &__highlight-label {
    font-size: 0.875rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    color: var(--cat-base);
  }

  &__highlight-value {
    font-size: 1rem;
    line-height: 1.6;
    color: var(--cat-body);
  }

  &__outro {
    margin-top: 1.125rem;
    font-size: 1rem;
    line-height: 1.8;
    color: var(--cat-muted);
  }

  &__meta {
    margin: 0;
    @include flex(column, flex-start, stretch, 0.625rem);
  }

  &__row {
    padding: 0.875rem 1rem;
    border-radius: var(--radius-sm);
    border: 1px solid var(--cat-line);
    background: var(--cat-soft);
  }

  &__label {
    @include flex(row, flex-start, center, 0.4375rem);
    font-size: 0.875rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    color: var(--cat-base);
  }

  &__label-icon {
    flex-shrink: 0;
  }

  &__chip-icon {
    flex-shrink: 0;
    opacity: 0.85;
  }

  &__value {
    margin: 0.5rem 0 0;
    font-size: 1.0625rem;
    line-height: 1.7;
    color: var(--cat-body);
  }

  &__badge {
    display: inline-block;
    margin-left: 0.5rem;
    padding: 0.1875rem 0.625rem;
    border-radius: 62.4375rem;
    background: var(--cat-soft-strong);
    font-size: 0.875rem;
    font-weight: 700;
    color: var(--cat-base);
    vertical-align: middle;
  }

  &__tasks {
    margin: 0;
    padding: 0;
    list-style: none;
    @include flex(column, flex-start, stretch, 0.5rem);
  }

  &__task {
    position: relative;
    padding-left: 0.875rem;
    font-size: 1rem;
    line-height: 1.65;
    color: var(--cat-body);

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.6875rem;
      width: 0.3125rem;
      height: 0.3125rem;
      border-radius: 50%;
      background: var(--cat-base);
    }
  }

  &__block {
    margin-top: 1.625rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--cat-line);
  }

  &__subtitle {
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    color: var(--cat-strong);
  }

  &__skills {
    margin-top: 0.875rem;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  &__chip {
    @include flex(row, center, center, 0.375rem);
    padding: 0.4375rem 0.875rem;
    border-radius: 62.4375rem;
    background: var(--cat-soft);
    border: 1px solid var(--cat-line);
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--cat-body);
    transition: background $transition-base, color $transition-base,
      border-color $transition-base;

    &:hover {
      border-color: var(--cat-base);
      color: var(--cat-base);
    }

    &--skill {
      background: var(--color-panel);
      border-color: var(--cat-edge);
      color: var(--cat-base);

      &:hover {
        background: var(--cat-base);
        border-color: var(--cat-base);
        color: #fff;
      }
    }
  }

  @include respond-to($bp-md) {
    width: 100%;
    height: auto;
    border-left: none;
    border-top: 1px solid var(--color-border);

    &__inner {
      padding: 1.75rem 1.5rem;
    }
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(0.75rem);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-0.75rem);
}

@media (prefers-reduced-motion: reduce) {
  .detail {
    transform: none;
    opacity: 1;
    transition: none;
  }
}
</style>
