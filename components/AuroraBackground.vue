<script setup lang="ts">
import { useReducedMotion } from 'motion-v'

const reduced = useReducedMotion()
</script>

<template>
  <div
    aria-hidden="true"
    class="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
  >
    <div
      class="absolute -inset-[20%]"
      :class="reduced ? '' : 'aurora-drift'"
      :style="{
        background: `
          radial-gradient(60% 50% at 15% 20%, var(--aurora-pink) 0%, transparent 60%),
          radial-gradient(50% 50% at 85% 30%, var(--aurora-lavender) 0%, transparent 55%),
          radial-gradient(60% 60% at 60% 95%, var(--aurora-peach) 0%, transparent 55%),
          var(--canvas)
        `,
      }"
    />
  </div>
</template>

<style scoped>
.aurora-drift {
  animation: aurora-orbit 18s var(--ease-aurora) infinite alternate;
  will-change: transform;
}
@keyframes aurora-orbit {
  0%   { transform: translate(0, 0) rotate(0deg); }
  100% { transform: translate(2%, -2%) rotate(2deg); }
}
</style>
