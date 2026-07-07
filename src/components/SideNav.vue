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
})

const emit = defineEmits(['select', 'toggle'])

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
  padding: 20px 14px;
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
    min-height: 44px;
    margin-bottom: 28px;

    .sidenav--collapsed & {
      flex-direction: column;
      gap: 16px;
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
    height: 30px;
    width: auto;
    max-width: 100%;
    object-fit: contain;

    .sidenav--collapsed & {
      height: auto;
      width: 100%;
    }
  }

  &__collapse {
    @include icon-button(36px, 10px);
    color: rgba(255, 255, 255, 0.65);
    transition: $transition-base;

    &:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.08);
    }
  }

  &__list {
    position: relative;
    @include flex(column, flex-start, stretch, 6px);
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
    @include flex(row, flex-start, center, 14px);
    padding: 12px;
    border-radius: var(--radius-md);
    color: rgba(255, 255, 255, 0.6);
    font-size: 15px;
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
