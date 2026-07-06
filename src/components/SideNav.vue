<template>
  <aside class="lnb" :class="{ collapsed }">
    <div class="lnb-top">
      <div class="logo">
        <img class="logo-img" src="@/assets/images/logo.png" alt="kuhaland" />
      </div>

      <button
        class="collapse-btn"
        :aria-label="collapsed ? '메뉴 펼치기' : '메뉴 접기'"
        @click="emit('toggle')"
      >
        <AppIcon :name="collapsed ? 'chevron_right' : 'menu_open'" :size="20" />
      </button>
    </div>

    <nav class="nav">
      <button
        v-for="item in items"
        :key="item.id"
        class="nav-item"
        :class="{ active: item.id === activeId }"
        :title="collapsed ? item.label : ''"
        @click="emit('select', item.id)"
      >
        <AppIcon class="nav-icon" :name="item.icon" :size="22" />
        <span v-show="!collapsed" class="nav-label">{{ item.label }}</span>
      </button>
    </nav>
  </aside>
</template>

<script setup>
import AppIcon from './AppIcon.vue'

defineProps({
  items: { type: Array, required: true },
  activeId: { type: String, required: true },
  collapsed: { type: Boolean, default: false },
})

const emit = defineEmits(['select', 'toggle'])
</script>

<style scoped lang="scss">
.lnb {
  width: $lnb-width-expanded;
  flex-shrink: 0;
  @include flex(column);
  padding: 20px 14px;
  background: var(--color-sidebar);
  color: #fff;
  transition: $transition-lnb;
  overflow: hidden;

  &.collapsed {
    width: $lnb-width-collapsed;
  }
}

.lnb-top {
  @include flex(row, space-between, center);
  min-height: 44px;
  margin-bottom: 28px;
}

.logo {
  @include flex(row, flex-start, center);
  min-width: 0;

  &-img {
    display: block;
    height: 30px;
    width: auto;
    max-width: 100%;
    object-fit: contain;
  }
}

.collapsed .logo {
  justify-content: center;
  width: 100%;

  .logo-img {
    height: auto;
    width: 100%;
  }
}

.collapse-btn {
  @include icon-button(36px, 10px);
  color: rgba(255, 255, 255, 0.65);
  transition: $transition-base;

  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.08);
  }
}

.collapsed .lnb-top {
  flex-direction: column;
  gap: 16px;
}

.nav {
  @include flex(column, flex-start, stretch, 6px);
}

.nav-item {
  @include flex(row, flex-start, center, 14px);
  padding: 12px;
  border-radius: var(--radius-md);
  color: rgba(255, 255, 255, 0.6);
  font-size: 15px;
  font-weight: 500;
  transition: $transition-base;

  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.06);
  }

  &.active {
    color: #fff;
    background: rgba(255, 255, 255, 0.14);
  }
}

.nav-icon {
  flex-shrink: 0;
}

.nav-label {
  @include truncate;
}

.collapsed .nav-item {
  justify-content: center;
}

@include respond-to($bp-md) {
  .lnb,
  .lnb.collapsed {
    width: 100%;
  }
  .nav {
    flex-direction: row;
    flex-wrap: wrap;
  }
}
</style>
