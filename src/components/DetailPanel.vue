<template>
  <aside class="detail">
    <OverlayScrollbarsComponent class="detail__scroll" :options="osOptions" defer>
      <Transition name="slide" mode="out-in">
        <div class="detail__inner" :key="item.id">
          <p class="detail__eyebrow">Detail</p>
          <h2 class="detail__title">{{ item.label }}</h2>
          <div class="detail__divider" />
          <p class="detail__text">{{ item.detail }}</p>
        </div>
      </Transition>
    </OverlayScrollbarsComponent>
  </aside>
</template>

<script setup>
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'

defineProps({
  item: { type: Object, required: true },
})

const osOptions = {
  scrollbars: {
    theme: 'os-theme-dark',
    autoHide: 'leave',
    autoHideDelay: 400,
  },
}
</script>

<style scoped lang="scss">
.detail {
  width: 30%;
  height: 100%;
  flex-shrink: 0;
  background: var(--color-panel);
  border-left: 1px solid var(--color-border);

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
</style>
