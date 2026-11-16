<template>
  <div class="profile">
    <img
      class="profile__photo"
      :src="profilePhoto"
      :alt="`${profile.name} 프로필 이미지`"
    />
    <div class="profile__body">
      <h2 class="profile__name">
        {{ profile.name }}
        <AppIcon class="profile__verified" name="verified" :size="26" fill />
      </h2>
      <p class="profile__desc">{{ profile.description }}</p>
      <div class="profile__foot">
        <ul class="profile__stats">
          <li
            v-for="s in profile.stats"
            :key="s.label"
            class="profile__stat"
            :title="s.label"
          >
            <AppIcon :name="s.icon" :size="18" />
            <span class="profile__stat-value">{{ s.value }}</span>
          </li>
        </ul>
        <button type="button" class="profile__action" @click="emit('contact')">
          {{ profile.action }}
          <AppIcon name="add" :size="20" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppIcon from './AppIcon.vue'
import profilePhoto from '@/assets/images/profile.svg'

defineProps({
  profile: { type: Object, required: true },
})

const emit = defineEmits(['contact'])
</script>

<style scoped lang="scss">
.profile {
  width: 100%;
  max-width: 23rem;
  padding: 0.625rem;
  border-radius: 2rem;
  background: #2a2a2c;
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 1.5rem 3rem rgba(0, 0, 0, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  color: #fff;
  text-shadow: none;

  &__photo {
    display: block;
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 1.5rem;
    object-fit: cover;
  }

  &__body {
    padding: 1.5rem 1rem 1rem;
  }

  &__name {
    @include flex(row, flex-start, center, 0.5rem);
    font-size: 1.625rem;
    font-weight: 600;
    letter-spacing: -0.01em;
  }

  &__verified {
    color: #34c759;
  }

  &__desc {
    margin-top: 0.75rem;
    font-size: 1rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.5);
  }

  &__foot {
    @include flex(row, space-between, center, 0.75rem);
    margin-top: 1.75rem;
  }

  &__stats {
    margin: 0;
    padding: 0;
    list-style: none;
    @include flex(row, flex-start, center, 1rem);
  }

  &__stat {
    @include flex(row, flex-start, center, 0.375rem);
    color: rgba(255, 255, 255, 0.6);
  }

  &__stat-value {
    font-size: 1rem;
    font-weight: 600;
    color: #fff;
  }

  &__action {
    @include flex(row, center, center, 0.375rem);
    padding: 0.875rem 1.375rem;
    border: none;
    border-radius: 62.4375rem;
    background: #353537;
    box-shadow: 0 0.5rem 1.25rem rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.06);
    font: inherit;
    font-size: 1.0625rem;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    transition: background $transition-base, transform $transition-base;

    &:hover {
      background: #424245;
      transform: translateY(-0.0625rem);
    }

    &:focus-visible {
      outline: 2px solid var(--color-accent);
      outline-offset: 2px;
    }
  }
}
</style>
