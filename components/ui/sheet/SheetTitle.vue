<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { DialogTitle, type DialogTitleProps, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<DialogTitleProps & { class?: HTMLAttributes['class'] }>()

const forwarded = useForwardProps(
  Object.fromEntries(Object.entries(props).filter(([k]) => k !== 'class')) as DialogTitleProps,
)
</script>

<template>
  <DialogTitle
    v-bind="forwarded"
    :class="cn('text-lg font-semibold tracking-tight', props.class)"
  >
    <slot />
  </DialogTitle>
</template>
