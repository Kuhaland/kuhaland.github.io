<template>
  <aside
    class="sidenav"
    :class="{ 'sidenav--collapsed': collapsed, 'is-entered': entered }"
  >
    <div class="sidenav__top">
      <div class="sidenav__logo">
        <img
          class="sidenav__logo-img"
          src="@/assets/images/logo.png"
          alt="kuhaland"
        />
      </div>

      <button
        class="sidenav__collapse"
        :aria-label="collapsed ? '메뉴 펼치기' : '메뉴 접기'"
        @click="emit('toggle')"
      >
        <AppIcon :name="collapsed ? 'chevron_right' : 'menu_open'" :size="20" />
      </button>
    </div>

    <nav class="sidenav__nav">
      <div class="sidenav__list">
        <span class="sidenav__indicator" :style="indicatorStyle" />
        <button
          v-for="(item, i) in items"
          :key="item.id"
          :ref="(el) => setItem(el, i)"
          class="sidenav__item"
          :class="{ 'sidenav__item--active': i === activeIndex }"
          :title="collapsed ? item.label : ''"
          @click="emit('select', i)"
        >
          <AppIcon class="sidenav__icon" :name="item.icon" :size="22" />
          <span v-show="!collapsed" class="sidenav__label">
            {{ item.label }}
          </span>
        </button>
      </div>
    </nav>

    <div class="sidenav__foot">
      <button
        class="sidenav__guide"
        :class="{ 'sidenav__guide--on': guideOpen }"
        :title="collapsed ? '이용 안내' : ''"
        @click="emit('guide')"
      >
        <AppIcon class="sidenav__icon" name="help" :size="20" />
        <span v-show="!collapsed" class="sidenav__label">이용안내</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import AppIcon from './AppIcon.vue'

const props = defineProps({
  items: { type: Array, required: true },
  activeIndex: { type: Number, default: 0 },
  collapsed: { type: Boolean, default: false },
  entered: { type: Boolean, default: false },
  guideOpen: { type: Boolean, default: false },
})

const emit = defineEmits(['select', 'toggle', 'guide'])

const itemEls = ref([])
const indicatorStyle = ref({ opacity: 0 })

function setItem(el, i) {
  if (el) itemEls.value[i] = el
}

function updateIndicator() {
  const el = itemEls.value[props.activeIndex]
  if (!el) {
    indicatorStyle.value = { opacity: 0 }
    return
  }
  indicatorStyle.value = {
    transform: `translateY(${el.offsetTop}px)`,
    height: `${el.offsetHeight}px`,
    opacity: 1,
  }
}

watch(
  () => [props.activeIndex, props.collapsed],
  () => nextTick(updateIndicator)
)

onMounted(() => {
  nextTick(updateIndicator)
  window.addEventListener('resize', updateIndicator)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateIndicator)
})
</script>

<style scoped lang="scss">
.sidenav {
  width: $lnb-width-expanded;
  min-width: 132px;
  flex-shrink: 0;
  @include flex(column);
  padding: 1.25rem 0.875rem;
  background: var(--color-sidebar);
  color: #fff;
  overflow: hidden;
  transform: translateX(-100%);
  opacity: 0;
  transition: $transition-lnb, transform $transition-enter,
    opacity $transition-enter;

  &.is-entered {
    transform: translateX(0);
    opacity: 1;
  }

  &--collapsed {
    width: $lnb-width-collapsed;
    min-width: $lnb-width-collapsed;
  }

  &__top {
    @include flex(row, space-between, center);
    min-height: 2.75rem;
    margin-bottom: 1.75rem;

    .sidenav--collapsed & {
      flex-direction: column;
      gap: 1rem;
    }
  }

  &__logo {
    @include flex(row, flex-start, center);
    min-width: 0;

    .sidenav--collapsed & {
      justify-content: center;
      width: 100%;
    }
  }

  &__logo-img {
    display: block;
    height: 1.875rem;
    width: auto;
    max-width: 100%;
    object-fit: contain;

    .sidenav--collapsed & {
      height: auto;
      width: 100%;
    }
  }

  &__collapse {
    @include icon-button(2.25rem, 0.625rem);
    color: rgba(255, 255, 255, 0.65);
    transition: $transition-base;

    &:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.08);
    }
  }

  &__list {
    position: relative;
    @include flex(column, flex-start, stretch, 0.375rem);
  }

  &__indicator {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    border-radius: var(--radius-md);
    background: rgba(255, 255, 255, 0.14);
    transition: transform $transition-nav, height $transition-nav,
      opacity $transition-base;
    pointer-events: none;
    z-index: 0;
  }

  &__item {
    position: relative;
    z-index: 1;
    @include flex(row, flex-start, center, 0.875rem);
    padding: 0.75rem;
    border-radius: var(--radius-md);
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.9375rem;
    font-weight: 500;
    transition: color $transition-base;

    &:hover {
      color: rgba(255, 255, 255, 0.9);
    }

    &--active {
      color: #fff;
    }

    .sidenav--collapsed & {
      justify-content: center;
    }
  }

  &__icon {
    flex-shrink: 0;
  }

  &__label {
    @include truncate;
  }

  &__foot {
    margin-top: auto;
    padding-top: 1.125rem;
  }

  &__guide {
    width: 100%;
    @include flex(row, flex-start, center, 0.625rem);
    padding: 0.6875rem 0.75rem;
    border-radius: var(--radius-md);
    border: 1px solid rgba(255, 255, 255, 0.14);
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.875rem;
    font-weight: 500;
    transition: color $transition-base, background $transition-base,
      border-color $transition-base;

    &:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.28);
    }

    &--on,
    &--on:hover {
      color: #fff;
      background: rgba(79, 124, 255, 0.9);
      border-color: transparent;
    }

    &--on:hover {
      background: var(--color-accent);
    }

    .sidenav--collapsed & {
      justify-content: center;
    }
  }

  @include respond-to($bp-md) {
    &,
    &--collapsed {
      width: 100%;
    }

    &__list {
      flex-direction: row;
      flex-wrap: wrap;
    }

    &__indicator {
      display: none;
    }

    &__item--active {
      background: rgba(255, 255, 255, 0.14);
    }

    &__foot {
      display: none;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .sidenav {
    transform: none;
    opacity: 1;
    transition: $transition-lnb;
  }
}
</style>
