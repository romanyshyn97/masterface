<script setup lang="ts">
defineProps<{
  index: string
  label: string
}>()
</script>

<template>
  <div class="flex items-center gap-6 mb-16 max-w-6xl mx-auto px-4">
    <div class="flex items-baseline gap-4 shrink-0">
      <span class="font-sans text-xs tracking-[0.22em] uppercase font-medium text-primary">
        {{ index }}
      </span>
      <span class="font-sans text-xs tracking-[0.22em] uppercase font-medium text-ink/30">
        ⁄
      </span>
      <span class="font-display italic text-3xl md:text-4xl text-ink leading-none">
        {{ label }}
      </span>
    </div>
    <div class="flex-1 h-px bg-ink/20"></div>
  </div>
</template>
