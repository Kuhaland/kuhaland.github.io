<template>
  <aside class="detail">
    <Transition name="slide" mode="out-in">
      <div class="detail-inner" :key="item.id">
        <p class="eyebrow">Detail</p>
        <h2 class="detail-title">{{ item.label }}</h2>
        <div class="divider" />
        <p class="detail-text">{{ item.detail }}</p>
      </div>
    </Transition>
  </aside>
</template>

<script setup>
defineProps({
  item: { type: Object, required: true },
})
</script>

<style scoped lang="scss">
.detail {
  width: 340px;
  flex-shrink: 0;
  padding: 40px 32px;
  overflow-y: auto;
  background: var(--color-panel);
  border-left: 1px solid var(--color-border);
}

.eyebrow {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.detail-title {
  margin-top: 10px;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.divider {
  height: 1px;
  margin: 22px 0;
  background: var(--color-border);
}

.detail-text {
  font-size: 15px;
  line-height: 1.85;
  color: #55555a;
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

@include respond-to($bp-md) {
  .detail {
    width: 100%;
    border-left: none;
    border-top: 1px solid var(--color-border);
    padding: 28px 24px;
  }
}
</style>
