<template>
  <aside class="detail" :class="{ 'is-entered': entered }">
    <OverlayScrollbarsComponent class="detail__scroll" :options="osOptions" defer>
      <Transition name="slide" mode="out-in">
        <div class="detail__inner" :key="paneKey">
          <template v-if="project">
            <p class="detail__eyebrow">Work</p>
            <h2 class="detail__title">{{ project.title }}</h2>
            <p class="detail__subtitle-en">{{ project.titleEn }}</p>
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
            <p class="detail__eyebrow">Detail</p>
            <h2 class="detail__title">{{ item.label }}</h2>
            <div class="detail__divider" />
            <p class="detail__text" v-html="item.detail" />

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

            <p v-if="item.outro" class="detail__outro">{{ item.outro }}</p>

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

const props = defineProps({
  item: { type: Object, required: true },
  project: { type: Object, default: null },
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

const paneKey = computed(() =>
  props.project ? `work-${props.project.id}` : props.item.id
)
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
    padding: 40px 32px;
  }

  &__eyebrow {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-accent);
  }

  &__title {
    margin-top: 10px;
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  &__subtitle-en {
    margin-top: 4px;
    font-size: 15px;
    font-weight: 500;
    color: var(--color-text-muted);
  }

  &__divider {
    height: 1px;
    margin: 22px 0;
    background: var(--color-border);
  }

  &__text {
    font-size: 15px;
    line-height: 1.85;
    color: #55555a;
  }

  &__highlights {
    margin: 20px 0 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__highlight {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 13px 16px;
    border-radius: var(--radius-sm);
    background: rgba(79, 124, 255, 0.06);
    border-left: 3px solid var(--color-accent);
    transition: background $transition-base, transform $transition-base;

    &:hover {
      background: rgba(79, 124, 255, 0.12);
      transform: translateX(2px);
    }
  }

  &__highlight-label {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.06em;
    color: var(--color-accent);
  }

  &__highlight-value {
    font-size: 14px;
    line-height: 1.6;
    color: #3a3a40;
  }

  &__outro {
    margin-top: 18px;
    font-size: 14px;
    line-height: 1.8;
    color: var(--color-text-muted);
  }

  &__meta {
    margin: 0;
  }

  &__row {
    padding: 14px 0;

    & + & {
      border-top: 1px solid var(--color-border);
    }
  }

  &__label {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.04em;
    color: var(--color-accent);
  }

  &__value {
    margin: 8px 0 0;
    font-size: 15px;
    line-height: 1.7;
    color: #45454a;
  }

  &__block {
    margin-top: 26px;
    padding-top: 24px;
    border-top: 1px solid var(--color-border);
  }

  &__subtitle {
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.02em;
    color: var(--color-text);
  }

  &__skills {
    margin-top: 14px;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  &__chip {
    padding: 7px 14px;
    border-radius: 999px;
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    font-size: 13px;
    font-weight: 600;
    color: #45454a;
    transition: background $transition-base, color $transition-base,
      border-color $transition-base;

    &:hover {
      border-color: var(--color-accent);
      color: var(--color-accent);
    }

    &--skill {
      background: rgba(79, 124, 255, 0.08);
      border-color: rgba(79, 124, 255, 0.25);
      color: #3a63d8;

      &:hover {
        background: var(--color-accent);
        border-color: var(--color-accent);
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
      padding: 28px 24px;
    }
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(12px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-12px);
}

@media (prefers-reduced-motion: reduce) {
  .detail {
    transform: none;
    opacity: 1;
    transition: none;
  }
}
</style>
