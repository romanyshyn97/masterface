<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import {
  DialogClose,
  DialogContent,
  type DialogContentEmits,
  type DialogContentProps,
  DialogOverlay,
  DialogPortal,
  useForwardPropsEmits,
} from 'reka-ui'
import { X } from 'lucide-vue-next'
import { type SheetVariants, sheetVariants } from '.'
import { cn } from '@/lib/utils'

interface Props extends /* @vue-ignore */ DialogContentProps {
  side?: SheetVariants['side']
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), { side: 'right' })
const emits = defineEmits<DialogContentEmits>()

const forwarded = useForwardPropsEmits(
  Object.fromEntries(Object.entries(props).filter(([k]) => k !== 'class' && k !== 'side')) as DialogContentProps,
  emits,
)
</script>

<template>
  <DialogPortal>
    <DialogOverlay
      class="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
    />
    <DialogContent
      v-bind="forwarded"
      :class="cn(sheetVariants({ side }), props.class)"
    >
      <slot />
      <DialogClose
        class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        aria-label="Close"
      >
        <X class="h-4 w-4" />
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
