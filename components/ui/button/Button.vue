<script setup lang="ts">
import type { Component, HTMLAttributes } from 'vue'
import { Primitive } from 'reka-ui'
import { type ButtonVariants, buttonVariants } from '.'
import { cn } from '@/lib/utils'

// `as`/`asChild` are declared inline instead of by extending PrimitiveProps.
// Extending it requires a compiler-ignore marker on the `extends` clause, and
// that marker also suppresses runtime prop generation for the whole interface:
// `as` stayed undefined, so every Button rendered as Primitive's fallback
// container element — unfocusable by keyboard, and inert as a submit control.
// Keep that marker's literal name out of this comment; the compiler scans
// comment text for it and will silently drop the props again.
interface Props {
  as?: string | Component
  asChild?: boolean
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
  >
    <slot />
  </Primitive>
</template>
