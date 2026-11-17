<template>
  <div class="profile"
       @mouseenter="startGreeting"
       @mouseleave="stopGreeting"
  >
    <!-- Media -->
    <div class="profile__media">
      <HorseAvatar class="profile__photo"
                   :butterfly="false"
                   view-box="-140 -30 680 425"
      />
      <Transition name="bubble">
        <span v-if="bubbleVisible"
              :key="bubbleText"
              class="profile__bubble"
              aria-hidden="true"
        >
          {{ bubbleText }}
        </span>
      </Transition>
    </div>
    <!-- Body -->
    <div class="profile__body">
      <slot />
    </div>
    <!-- Footer -->
    <div class="profile__foot">
      <ul class="profile__stats">
        <li v-for="s in profile.stats"
            :key="s.label"
            class="profile__stat"
            :title="s.label"
        >
          <AppIcon :name="s.icon"
                   :size="18"
          />
          <span class="profile__stat-value">{{ s.value }}</span>
        </li>
      </ul>
      <button type="button"
              class="profile__action"
              @click="emit('contact')"
      >
        {{ profile.action }}
        <AppIcon name="add"
                 :size="16"
        />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import AppIcon from './AppIcon.vue'
import HorseAvatar from './HorseAvatar.vue'

const props = defineProps({
  profile: { type: Object, required: true },
  active: { type: Boolean, default: true },
})

const emit = defineEmits(['contact'])

const SHOW_MS = 2000
const GAP_MS = 450

const greetings = computed(() =>
  props.profile.greetings?.length ? props.profile.greetings : ['안녕하세요.']
)
const finalGreeting = computed(
  () => props.profile.finalGreeting ?? greetings.value[greetings.value.length - 1]
)
const bubbleText = ref('')
const bubbleVisible = ref(false)
let played = false
let timer = null

function schedule(fn, ms) {
  clearTimeout(timer)
  timer = setTimeout(fn, ms)
}

function showFinal() {
  bubbleText.value = finalGreeting.value
  bubbleVisible.value = true
}

function showAt(index) {
  if (index >= greetings.value.length) {
    showFinal()
    return
  }
  bubbleText.value = greetings.value[index]
  bubbleVisible.value = true
  schedule(() => {
    bubbleVisible.value = false
    schedule(() => showAt(index + 1), GAP_MS)
  }, SHOW_MS)
}

function startGreeting() {
  if (played) {
    showFinal()
    return
  }
  played = true
  showAt(0)
}

function stopGreeting() {
  clearTimeout(timer)
  timer = null
  bubbleVisible.value = false
}

watch(
  () => props.active,
  (active) => {
    if (active) return
    stopGreeting()
    played = false
  }
)

onBeforeUnmount(() => clearTimeout(timer))
</script>

<style scoped lang="scss">
.profile {
  width: 100%;
  padding: 0.625rem;
  border-radius: 2rem;
  background: rgba(30, 30, 34, 0.86); backdrop-filter: blur(0.75rem);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 1.5rem 3rem rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  color: #fff; text-shadow: none;

  &__media {
    position: relative;
  }

  &__bubble {
    position: absolute; top: 9%; left: 60%;
    width: max-content; max-width: 36%;
    padding: 0.5rem 0.875rem;
    border-radius: 1rem 1rem 1rem 0;
    background: #fff; box-shadow: 0 0.5rem 1.25rem rgba(0, 0, 0, 0.18);
    font-size: 0.9375rem; font-weight: 700; color: #1c1c1e; line-height: 1.4; word-break: keep-all;
    pointer-events: none; transform-origin: 0 100%;

    &::after {
      content: '';
      position: absolute; top: calc(100% - 1px); left: 0;
      width: 0.75rem; height: 0.625rem;
      background: inherit; clip-path: polygon(0 0, 100% 0, 0 100%);
    }
  }

  &__photo {
    display: block;
    width: 100%; aspect-ratio: 16 / 10; height: auto;
    border-radius: 1.5rem;
    clip-path: inset(0 round 1.5rem);
  }

  &__body {
    padding: 1.5rem 1.25rem 0;
  }

  &__foot {
    @include flex(row, space-between, center, 0.5rem);
    flex-wrap: wrap;
    min-width: 0;
    margin: 1.5rem 1.25rem 0; padding: 1rem 0 0.75rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  &__stats {
    margin: 0; padding: 0;
    list-style: none;
    @include flex(row, flex-start, center, 1rem);
    min-width: 0;
  }

  &__stat {
    @include flex(row, flex-start, center, 0.375rem);
    color: rgba(255, 255, 255, 0.6);
  }

  &__stat-value {
    font-size: 1rem; font-weight: 600; color: #fff;
  }

  &__action {
    @include flex(row, center, center, 0.25rem);
    flex-shrink: 0;
    max-width: 100%;
    padding: 0.5rem 0.875rem;
    white-space: nowrap;
    border: none; border-radius: 62.4375rem;
    background: #353537;
    box-shadow: 0 0.375rem 0.875rem rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.06);
    font: inherit; font-size: 0.875rem; font-weight: 600; color: #fff;
    cursor: pointer; transition: background $transition-base, transform $transition-base;

    &:hover {
      background: #424245;
      transform: translateY(-0.0625rem);
    }

    &:focus-visible {
      outline: 2px solid var(--color-accent); outline-offset: 2px;
    }
  }

  @media (max-height: 820px) {
    &__photo {
      aspect-ratio: 16 / 8;
    }

    &__body {
      padding-top: 1.125rem;
    }

    &__foot {
      margin-top: 1rem;
    }
  }
}

.bubble-enter-active {
  transition: opacity 0.25s ease,
    transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.bubble-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.bubble-enter-from,
.bubble-leave-to {
  opacity: 0; transform: translateY(0.5rem) scale(0.6);
}

@media (prefers-reduced-motion: reduce) {
  .bubble-enter-active,
  .bubble-leave-active {
    transition: opacity 0.2s ease;
  }

  .bubble-enter-from,
  .bubble-leave-to {
    transform: none;
  }
}
</style>
