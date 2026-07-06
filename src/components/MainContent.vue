<template>
  <main class="main">
    <Transition name="fade" mode="out-in">
      <div class="content" :key="item.id">
        <div class="hero" :style="{ backgroundImage: item.image }">
          <span class="hero-tag">{{ item.label }}</span>
        </div>
        <div class="body">
          <h1 class="title">{{ item.label }}</h1>
          <p class="summary">{{ item.summary }}</p>
        </div>
      </div>
    </Transition>
  </main>
</template>

<script setup>
defineProps({
  item: { type: Object, required: true },
})
</script>

<style scoped lang="scss">
.main {
  flex: 1;
  min-width: 0;
  overflow-y: auto;
  background: var(--color-bg);
}

.content {
  padding: 40px;
  max-width: 720px;
  margin: 0 auto;
}

.hero {
  width: 100%;
  height: 340px;
  border-radius: var(--radius-lg);
  background-size: cover;
  background-position: center;
  position: relative;
  @include flex(column, flex-end, flex-start);
  padding: 28px;
}

.hero-tag {
  padding: 8px 16px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(6px);
  color: $color-text;
  font-size: 14px;
  font-weight: 600;
}

.body {
  margin-top: 32px;
}

.title {
  font-size: 34px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.summary {
  margin-top: 16px;
  font-size: 18px;
  line-height: 1.7;
  color: #55555a;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@include respond-to($bp-md) {
  .content {
    padding: 24px;
  }
  .hero {
    height: 220px;
  }
  .title {
    font-size: 28px;
  }
}
</style>
