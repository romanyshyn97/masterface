<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import emblaCarouselVue from 'embla-carousel-vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

interface Props {
  loop?: boolean
  class?: string
  showArrows?: boolean
  showDots?: boolean
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  loop: true,
  showArrows: true,
  showDots: true,
  ariaLabel: 'Карусель',
})

const [emblaRef, emblaApi] = emblaCarouselVue({ loop: props.loop, align: 'center' })

const selectedIndex = ref(0)
const scrollSnaps = ref<number[]>([])

function onInit() {
  if (!emblaApi.value) return
  scrollSnaps.value = emblaApi.value.scrollSnapList()
}
function onSelect() {
  if (!emblaApi.value) return
  selectedIndex.value = emblaApi.value.selectedScrollSnap()
}

watch(emblaApi, (api) => {
  if (!api) return
  onInit()
  onSelect()
  api.on('reInit', onInit)
  api.on('reInit', onSelect)
  api.on('select', onSelect)
})

onUnmounted(() => {
  if (!emblaApi.value) return
  emblaApi.value.off('reInit', onInit)
  emblaApi.value.off('reInit', onSelect)
  emblaApi.value.off('select', onSelect)
})

const canScrollPrev = computed(() => emblaApi.value?.canScrollPrev() ?? false)
const canScrollNext = computed(() => emblaApi.value?.canScrollNext() ?? false)

function scrollPrev() { emblaApi.value?.scrollPrev() }
function scrollNext() { emblaApi.value?.scrollNext() }
function scrollTo(i: number) { emblaApi.value?.scrollTo(i) }
</script>

<template>
  <div
    role="region"
    :aria-label="ariaLabel"
    :class="cn('relative', props.class)"
  >
    <div ref="emblaRef" class="overflow-hidden">
      <div class="flex -ml-4">
        <slot />
      </div>
    </div>

    <template v-if="showArrows">
      <button
        type="button"
        aria-label="Попередній"
        :disabled="!canScrollPrev && !loop"
        class="absolute left-2 top-1/2 -translate-y-1/2 z-10 grid place-items-center w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border shadow-soft hover:bg-background disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        @click="scrollPrev"
      >
        <ChevronLeft class="w-5 h-5" />
      </button>
      <button
        type="button"
        aria-label="Наступний"
        :disabled="!canScrollNext && !loop"
        class="absolute right-2 top-1/2 -translate-y-1/2 z-10 grid place-items-center w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border shadow-soft hover:bg-background disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        @click="scrollNext"
      >
        <ChevronRight class="w-5 h-5" />
      </button>
    </template>

    <div
      v-if="showDots && scrollSnaps.length > 1"
      class="flex justify-center gap-2 mt-4"
      role="tablist"
    >
      <button
        v-for="(_, i) in scrollSnaps"
        :key="i"
        type="button"
        role="tab"
        :aria-label="`Слайд ${i + 1}`"
        :aria-selected="selectedIndex === i"
        :class="[
          'w-2.5 h-2.5 rounded-full transition-all',
          selectedIndex === i ? 'bg-primary w-6' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50',
        ]"
        @click="scrollTo(i)"
      />
    </div>
  </div>
</template>
